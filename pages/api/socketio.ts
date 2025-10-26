import { Server as NetServer } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { Server as ServerIO } from 'socket.io'
import { prisma } from '@/lib/prisma'

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: ServerIO
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new ServerIO(res.socket.server, {
      path: '/api/socketio',
      addTrailingSlash: false,
      cors: {
        origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:3000'],
        methods: ['GET', 'POST'],
      },
    })

    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log('New client connected:', socket.id)

      socket.on('join-document', async (documentId: string) => {
        try {
          // Verify user has access to document
          const sessionToken = socket.handshake.auth?.sessionToken
          if (!sessionToken) {
            socket.emit('error', 'Unauthorized')
            return
          }

          const session = await prisma.session.findUnique({
            where: { token: sessionToken },
            include: { user: true }
          })

          if (!session || session.expiresAt < new Date()) {
            socket.emit('error', 'Invalid session')
            return
          }

          socket.join(documentId)
          socket.emit('joined-document', documentId)
          
          // Notify others that user joined
          socket.to(documentId).emit('user-joined', {
            userId: session.user.id,
            userName: session.user.name || session.user.email
          })

          console.log(`User ${session.user.email} joined document ${documentId}`)
        } catch (error) {
          console.error('Join document error:', error)
          socket.emit('error', 'Failed to join document')
        }
      })

      socket.on('document-change', async (data: { documentId: string; content: string; userId: string }) => {
        try {
          // Broadcast change to other users in the same document
          socket.to(data.documentId).emit('document-updated', {
            content: data.content,
            userId: data.userId,
            timestamp: new Date().toISOString()
          })

          // Update document in database
          await prisma.document.update({
            where: { id: data.documentId },
            data: { content: data.content }
          })
        } catch (error) {
          console.error('Document change error:', error)
        }
      })

      socket.on('user-typing', (data: { documentId: string; userId: string; userName: string }) => {
        socket.to(data.documentId).emit('user-typing', {
          userId: data.userId,
          userName: data.userName
        })
      })

      socket.on('user-stopped-typing', (data: { documentId: string; userId: string }) => {
        socket.to(data.documentId).emit('user-stopped-typing', {
          userId: data.userId
        })
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
      })
    })
  }
  res.end()
}

export default SocketHandler
