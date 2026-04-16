import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // This endpoint demonstrates that environment variables are secure
  // and cannot be accessed from client side
  
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  try {
    // Check if environment variables exist (without exposing them)
    const hasSmtpUser = !!process.env.SMTP_USER;
    const hasSmtpPass = !!process.env.SMTP_PASS;
    const hasAdminEmail = !!process.env.ADMIN_EMAIL;

    // NEVER expose actual values - only check existence
    const securityInfo = {
      environmentStatus: {
        smtpUser: hasSmtpUser ? 'CONFIGURED' : 'MISSING',
        smtpPass: hasSmtpPass ? 'CONFIGURED' : 'MISSING',
        adminEmail: hasAdminEmail ? 'CONFIGURED' : 'MISSING'
      },
      securityNote: 'Environment variables are server-side only and cannot be accessed by client',
      actualValues: 'NEVER_EXPOSED_FOR_SECURITY',
      warning: 'Any attempt to access actual credentials will fail by design'
    };

    return NextResponse.json(securityInfo, { status: 200, headers });

  } catch (error) {
    return NextResponse.json(
      { error: 'Security validation failed' },
      { status: 500, headers }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  })
}
