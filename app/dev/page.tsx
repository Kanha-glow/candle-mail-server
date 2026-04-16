'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'

interface Settings {
  allowedOriginsEnabled: boolean
  allowedOrigins: string[]
  encryptedEmail: string
  encryptedAppPassword: string
  ipRateLimit: number
  sessionRateLimit: number
  rateLimitWindowMinutes: number
}

export default function HomePage() {
  const { data: session, status } = useSession()
  const [settings, setSettings] = useState<Settings>({
    allowedOriginsEnabled: false,
    allowedOrigins: [],
    encryptedEmail: '',
    encryptedAppPassword: '',
    ipRateLimit: 5,
    sessionRateLimit: 3,
    rateLimitWindowMinutes: 60
  })
  const [newOrigin, setNewOrigin] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  // Load current settings on mount
  useEffect(() => {
    if (session) {
      loadSettings()
    }
  }, [session])

  const loadSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings')
      if (res.ok) {
        const data = await res.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    setMessage('')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      const result = await res.json()
      if (res.ok) {
        setMessage('Settings saved successfully!')
      } else {
        setMessage(`Error: ${result.error}`)
      }
    } catch (error) {
      setMessage('Failed to save settings')
    }
    setSaving(false)
  }

  const addOrigin = () => {
    if (newOrigin.trim() && !settings.allowedOrigins.includes(newOrigin.trim())) {
      setSettings(prev => ({
        ...prev,
        allowedOrigins: [...prev.allowedOrigins, newOrigin.trim()]
      }))
      setNewOrigin('')
    }
  }

  const removeOrigin = (origin: string) => {
    setSettings(prev => ({
      ...prev,
      allowedOrigins: prev.allowedOrigins.filter(o => o !== origin)
    }))
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
          <h1 className="text-2xl font-bold text-center mb-6">Backend Admin</h1>
          <p className="text-gray-600 text-center mb-6">
            Sign in with your Google account to access the admin panel
          </p>
          <button
            onClick={() => signIn('google')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Backend Admin Panel</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {session.user?.email}
            </span>
            <button
              onClick={() => signOut()}
              className="text-sm bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Origin Access Control</h2>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.allowedOriginsEnabled}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  allowedOriginsEnabled: e.target.checked
                }))}
                className="mr-2"
              />
              <span>Enable allowed origins check</span>
            </label>
            <p className="text-sm text-gray-600 mt-1">
              When enabled, API requests will only be accepted from specified origins
            </p>
          </div>

          {settings.allowedOriginsEnabled && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Allowed Origins
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={newOrigin}
                  onChange={(e) => setNewOrigin(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 border rounded px-3 py-2"
                />
                <button
                  onClick={addOrigin}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {settings.allowedOrigins.map((origin, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                    <span className="text-sm">{origin}</span>
                    <button
                      onClick={() => removeOrigin(origin)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Encrypted Credentials</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Encrypted Email (hex)
            </label>
            <textarea
              value={settings.encryptedEmail}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                encryptedEmail: e.target.value
              }))}
              className="w-full border rounded px-3 py-2 h-20 font-mono text-sm"
              placeholder="Enter AES-encrypted email as hex string"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Encrypted App Password (hex)
            </label>
            <textarea
              value={settings.encryptedAppPassword}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                encryptedAppPassword: e.target.value
              }))}
              className="w-full border rounded px-3 py-2 h-20 font-mono text-sm"
              placeholder="Enter AES-encrypted app password as hex string"
            />
          </div>
        </div>

        {/* Rate Limit Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border-l-4 border-blue-500">
          <h2 className="text-lg font-semibold mb-4">🛡️ Rate Limit Settings</h2>
          <p className="text-sm text-gray-500 mb-4">Configure how many requests are allowed per time window</p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium mb-2">IP Limit</label>
              <input
                type="number"
                min="1"
                value={settings.ipRateLimit}
                onChange={(e) => setSettings(prev => ({ ...prev, ipRateLimit: parseInt(e.target.value) || 1 }))}
                className="w-full border rounded px-3 py-2"
              />
              <p className="text-xs text-gray-500 mt-1">Per IP address</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Session Limit</label>
              <input
                type="number"
                min="1"
                value={settings.sessionRateLimit}
                onChange={(e) => setSettings(prev => ({ ...prev, sessionRateLimit: parseInt(e.target.value) || 1 }))}
                className="w-full border rounded px-3 py-2"
              />
              <p className="text-xs text-gray-500 mt-1">Per email+IP combo</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Window (min)</label>
              <input
                type="number"
                min="1"
                value={settings.rateLimitWindowMinutes}
                onChange={(e) => setSettings(prev => ({ ...prev, rateLimitWindowMinutes: parseInt(e.target.value) || 1 }))}
                className="w-full border rounded px-3 py-2"
              />
              <p className="text-xs text-gray-500 mt-1">Time window</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          
          {message && (
            <div className={`px-4 py-2 rounded ${
              message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
