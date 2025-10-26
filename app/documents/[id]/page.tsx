'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, Brain, Users } from 'lucide-react'
import { io, Socket } from 'socket.io-client'

interface User {
  id: string
  email: string
  name?: string
}

interface Document {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function DocumentEditor() {
  const [user, setUser] = useState<User | null>(null)
  const [document, setDocument] = useState<Document | null>(null)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [summary, setSummary] = useState('')
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set())
  const [connectedUsers, setConnectedUsers] = useState<Set<string>>(new Set())
  
  const socketRef = useRef<Socket | null>(null)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const router = useRouter()
  const params = useParams()
  const documentId = params.id as string

  useEffect(() => {
    checkAuth()
    loadDocument()
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
      }
    }
  }, [documentId])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', { method: 'POST' })
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/')
    }
  }

  const loadDocument = async () => {
    try {
      const response = await fetch(`/api/documents/${documentId}`)
      if (response.ok) {
        const data = await response.json()
        setDocument(data.document)
        setContent(data.document.content)
        setTitle(data.document.title)
        initializeSocket(data.document)
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Failed to load document:', error)
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const initializeSocket = (doc: Document) => {
    if (!user) return

    // Get session token from cookies
    const sessionToken = typeof window !== 'undefined' ? 
      document.cookie.split(';').find(c => c.trim().startsWith('session='))?.split('=')[1] : 
      null

    socketRef.current = io({
      path: '/api/socketio',
      auth: {
        sessionToken
      }
    })

    socketRef.current.on('connect', () => {
      console.log('Connected to socket')
      socketRef.current?.emit('join-document', documentId)
    })

    socketRef.current.on('document-updated', (data: { content: string; userId: string; timestamp: string }) => {
      if (data.userId !== user.id) {
        setContent(data.content)
      }
    })

    socketRef.current.on('user-joined', (data: { userId: string; userName: string }) => {
      setConnectedUsers(prev => new Set([...prev, data.userName]))
    })

    socketRef.current.on('user-typing', (data: { userId: string; userName: string }) => {
      if (data.userId !== user.id) {
        setTypingUsers(prev => new Set([...prev, data.userName]))
      }
    })

    socketRef.current.on('user-stopped-typing', (data: { userId: string }) => {
      if (data.userId !== user.id) {
        setTypingUsers(prev => {
          const newSet = new Set(prev)
          newSet.delete(data.userId)
          return newSet
        })
      }
    })

    socketRef.current.on('error', (error: string) => {
      console.error('Socket error:', error)
    })
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    
    // Clear existing save timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    
    // Save after 1 second of no changes
    saveTimeoutRef.current = setTimeout(() => {
      saveDocument(newContent)
    }, 1000)

    // Emit typing status
    if (socketRef.current && user) {
      socketRef.current.emit('user-typing', {
        documentId,
        userId: user.id,
        userName: user.name || user.email
      })

      // Clear existing typing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }

      // Stop typing after 2 seconds
      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current?.emit('user-stopped-typing', {
          documentId,
          userId: user.id
        })
      }, 2000)
    }

    // Emit document change
    if (socketRef.current && user) {
      socketRef.current.emit('document-change', {
        documentId,
        content: newContent,
        userId: user.id
      })
    }
  }

  const saveDocument = async (contentToSave?: string) => {
    const content = contentToSave || content
    setSaving(true)
    
    try {
      await fetch(`/api/documents/${documentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      })
    } catch (error) {
      console.error('Failed to save document:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleTitleChange = async (newTitle: string) => {
    setTitle(newTitle)
    
    try {
      await fetch(`/api/documents/${documentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle })
      })
    } catch (error) {
      console.error('Failed to update title:', error)
    }
  }

  const generateSummary = async () => {
    setSummaryLoading(true)
    setShowSummary(true)
    
    try {
      const response = await fetch(`/api/documents/${documentId}/summary`, {
        method: 'POST'
      })
      
      if (response.ok) {
        const data = await response.json()
        setSummary(data.summary)
      } else {
        setSummary('Unable to generate summary at this time.')
      }
    } catch (error) {
      console.error('Failed to generate summary:', error)
      setSummary('Unable to generate summary at this time.')
    } finally {
      setSummaryLoading(false)
    }
  }

  const renderCodeBlocks = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```)/g)
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3).trim()
        return (
          <div key={index} className="bg-gray-900 text-gray-100 rounded-2xl p-4 my-4 border border-gray-700">
            <pre className="whitespace-pre-wrap font-mono text-sm overflow-x-auto">{code}</pre>
          </div>
        )
      }
      return part
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading document...</div>
      </div>
    )
  }

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Document not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              {connectedUsers.size > 0 && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{connectedUsers.size} user{connectedUsers.size > 1 ? 's' : ''} online</span>
                </div>
              )}
              
              {saving && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Save className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </div>
              )}
              
              <button
                onClick={generateSummary}
                className="btn-primary flex items-center space-x-2"
              >
                <Brain className="h-4 w-4" />
                <span>AI Summary</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Editor */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="text-3xl font-bold text-gray-900 w-full border-none outline-none bg-transparent"
                  placeholder="Untitled Document"
                />
              </div>
              
              <div className="min-h-[500px]">
                <textarea
                  value={content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="w-full h-96 border-none outline-none resize-none text-gray-900 leading-relaxed bg-transparent"
                  placeholder="Start writing your document...

Use triple backticks for code blocks:
```javascript
function hello() {
  console.log('Hello World!');
}
```"
                />
                
                {/* Typing indicators */}
                {typingUsers.size > 0 && (
                  <div className="mt-4 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                    {Array.from(typingUsers).join(', ')} {typingUsers.size === 1 ? 'is' : 'are'} typing...
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Document Info</h3>
                
                <div className="space-y-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Created:</span>
                    <br />
                    {new Date(document.createdAt).toLocaleDateString()}
                  </div>
                  
                  <div>
                    <span className="font-medium">Last Updated:</span>
                    <br />
                    {new Date(document.updatedAt).toLocaleDateString()}
                  </div>
                  
                  <div>
                    <span className="font-medium">Characters:</span>
                    <br />
                    {content.length.toLocaleString()}
                  </div>
                  
                  <div>
                    <span className="font-medium">Words:</span>
                    <br />
                    {content.split(/\s+/).filter(word => word.length > 0).length.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-96 overflow-hidden shadow-2xl">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">AI Summary</h3>
                <button
                  onClick={() => setShowSummary(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-64">
              {summaryLoading ? (
                <div className="text-center py-8">
                  <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2 animate-pulse" />
                  <p className="text-gray-600">Generating summary...</p>
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed">{summary}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
