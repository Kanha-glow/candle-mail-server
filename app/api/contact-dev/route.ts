import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  // Universal CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  try {
    const body = await request.json()
    const { name, email, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400, headers }
      )
    }

    // Log the contact message
    console.log('Contact form submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    })

    // TODO: Add email sending functionality here
    // For now, just log the message
    
    return NextResponse.json(
      { success: true, message: 'Message received successfully' },
      { status: 200, headers }
    )

  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500, headers }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  })
}
