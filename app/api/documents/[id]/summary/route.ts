import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import axios from 'axios'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sessionToken = request.cookies.get('session')?.value

    if (!sessionToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Find user session
    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: true }
    })

    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    // Get document
    const document = await prisma.document.findFirst({
      where: { 
        id: params.id,
        userId: session.user.id 
      }
    })

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // Generate AI summary using Hugging Face API
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        {
          inputs: document.content,
          parameters: {
            max_length: 150,
            min_length: 30,
            do_sample: false
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY || 'demo'}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      )

      const summary = response.data[0]?.summary_text || 'Unable to generate summary at this time.'

      return NextResponse.json({ summary })
    } catch (aiError) {
      console.error('AI summary error:', aiError)
      // Fallback to a simple summary
      const words = document.content.split(' ').length
      const summary = `This document contains ${words} words and covers topics related to ${document.title}. The content appears to be ${document.content.length > 500 ? 'comprehensive' : 'brief'} documentation.`
      
      return NextResponse.json({ summary })
    }
  } catch (error) {
    console.error('Summary generation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
