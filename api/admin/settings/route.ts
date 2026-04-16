import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json')

interface Settings {
  allowedOriginsEnabled: boolean
  allowedOrigins: string[]
  encryptedEmail: string
  encryptedAppPassword: string
  // Rate limiting settings
  ipRateLimit: number
  sessionRateLimit: number
  rateLimitWindowMinutes: number
  updatedAt: string
}

const defaultSettings: Settings = {
  allowedOriginsEnabled: false,
  allowedOrigins: [],
  encryptedEmail: '',
  encryptedAppPassword: '',
  ipRateLimit: 5,
  sessionRateLimit: 3,
  rateLimitWindowMinutes: 60,
  updatedAt: new Date().toISOString()
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

function loadSettings(): Settings {
  ensureDataDir()
  if (!fs.existsSync(SETTINGS_FILE)) {
    return defaultSettings
  }
  try {
    const data = fs.readFileSync(SETTINGS_FILE, 'utf-8')
    return { ...defaultSettings, ...JSON.parse(data) }
  } catch {
    return defaultSettings
  }
}

function saveSettings(settings: Settings) {
  ensureDataDir()
  const dataToSave = {
    ...settings,
    updatedAt: new Date().toISOString()
  }
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(dataToSave, null, 2))
}

async function checkAdmin() {
  const session = await getServerSession()
  const adminEmail = process.env.ADMIN_EMAIL
  
  if (!session?.user?.email || session.user.email !== adminEmail) {
    return false
  }
  return true
}

export async function GET() {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const settings = loadSettings()
  return NextResponse.json(settings)
}

export async function POST(request: NextRequest) {
  if (!(await checkAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const settings: Settings = {
      allowedOriginsEnabled: Boolean(body.allowedOriginsEnabled),
      allowedOrigins: Array.isArray(body.allowedOrigins) ? body.allowedOrigins : [],
      encryptedEmail: String(body.encryptedEmail || ''),
      encryptedAppPassword: String(body.encryptedAppPassword || ''),
      ipRateLimit: Math.max(1, parseInt(body.ipRateLimit) || 5),
      sessionRateLimit: Math.max(1, parseInt(body.sessionRateLimit) || 3),
      rateLimitWindowMinutes: Math.max(1, parseInt(body.rateLimitWindowMinutes) || 60),
      updatedAt: new Date().toISOString()
    }

    saveSettings(settings)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving settings:', error)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }
}
