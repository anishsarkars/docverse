import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session')?.value

    if (!sessionToken) {
      return NextResponse.json({ error: 'No session found' }, { status: 401 })
    }

    // Delete session
    await prisma.session.deleteMany({
      where: { token: sessionToken }
    })

    const response = NextResponse.json({ success: true })
    response.cookies.delete('session')
    
    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
