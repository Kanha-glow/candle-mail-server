import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

// Simple in-memory rate limiter (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const sessionRateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Default rate limit configuration (can be overridden by admin settings)
const DEFAULT_IP_RATE_LIMIT = 5;
const DEFAULT_SESSION_RATE_LIMIT = 3;
const DEFAULT_RATE_LIMIT_WINDOW_MINUTES = 60;

// Load rate limit settings from settings.json
function getRateLimitSettings(): { ipLimit: number; sessionLimit: number; windowMs: number } {
  try {
    const settingsPath = path.join(process.cwd(), 'data', 'settings.json');
    if (fs.existsSync(settingsPath)) {
      const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
      return {
        ipLimit: settings.ipRateLimit || DEFAULT_IP_RATE_LIMIT,
        sessionLimit: settings.sessionRateLimit || DEFAULT_SESSION_RATE_LIMIT,
        windowMs: (settings.rateLimitWindowMinutes || DEFAULT_RATE_LIMIT_WINDOW_MINUTES) * 60 * 1000
      };
    }
  } catch (error) {
    console.error('Error loading rate limit settings:', error);
  }
  return {
    ipLimit: DEFAULT_IP_RATE_LIMIT,
    sessionLimit: DEFAULT_SESSION_RATE_LIMIT,
    windowMs: DEFAULT_RATE_LIMIT_WINDOW_MINUTES * 60 * 1000
  };
}

function checkRateLimit(key: string, map: Map<string, { count: number; resetTime: number }>, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = map.get(key);
  
  if (!record || now > record.resetTime) {
    map.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
}

function checkIpRateLimit(ip: string): boolean {
  const settings = getRateLimitSettings();
  return checkRateLimit(ip, rateLimitMap, settings.ipLimit, settings.windowMs);
}

function checkSessionRateLimit(sessionKey: string): boolean {
  const settings = getRateLimitSettings();
  return checkRateLimit(sessionKey, sessionRateLimitMap, settings.sessionLimit, settings.windowMs);
}

// Security function to prevent credential exposure
function validateServerSideOnly() {
  // This ensures the function only runs on server-side
  if (typeof window !== 'undefined') {
    throw new Error('Security violation: Client-side access attempt detected');
  }
  return true;
}

export async function POST(request: NextRequest) {
  // Universal CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  try {
    // Security validation - server-side only
    validateServerSideOnly();

    // Rate limiting by IP (first layer)
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    if (!checkIpRateLimit(ip)) {
      console.warn(`IP rate limit exceeded for: ${ip}`);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers }
      )
    }
    
    const body = await request.json()
    const { name, email, message, identifier } = body

    // Validate backend identifier to prevent unauthorized access
    const validIdentifier = process.env.BACKEND_IDENTIFIER;
    if (!identifier || identifier !== validIdentifier) {
      console.warn('Unauthorized contact attempt - invalid identifier');
      return NextResponse.json(
        { error: 'Unauthorized request' },
        { status: 401, headers }
      )
    }

    // Rate limiting by session (second layer - uses email as session key)
    const sessionKey = `${email}-${ip}`;
    if (!checkSessionRateLimit(sessionKey)) {
      console.warn(`Session rate limit exceeded for: ${sessionKey}`);
      return NextResponse.json(
        { error: 'Too many requests from this session. Please try again later.' },
        { status: 429, headers }
      )
    }

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

    // Send email using Gmail SMTP
    try {
      // Security validation - server-side only
      validateServerSideOnly();
      
      // Get credentials from environment variables (server-side only)
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const adminEmail = process.env.ADMIN_EMAIL;

      // Security check - ensure credentials are available and not exposed
      if (!smtpUser || !smtpPass || !adminEmail) {
        console.error('Missing SMTP credentials in environment variables');
        return NextResponse.json(
          { success: false, message: 'Server configuration error - contact administrator' },
          { status: 500, headers }
        );
      }

      // Additional security: Never log actual credentials
      console.log('SMTP configuration validated (credentials hidden for security)');

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      })

      const mailOptions = {
        from: smtpUser,
        to: adminEmail, // Send to admin email from env
        subject: `Contact Form: ${name}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `
      }

      await transporter.sendMail(mailOptions)
      console.log(`Email sent successfully to admin (email hidden for security)`)
      
      return NextResponse.json(
        { success: true, message: 'Message sent successfully!' },
        { status: 200, headers }
      )

    } catch (emailError) {
      console.error('Email sending failed:', emailError instanceof Error ? emailError.message : 'Unknown error')
      // Still return success but mention it was logged
      return NextResponse.json(
        { success: true, message: 'Message received and logged (email delivery failed)' },
        { status: 200, headers }
      )
    }

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
