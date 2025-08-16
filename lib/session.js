// Simple session management for demo purposes
// In production, use proper authentication

export function createSession(userData) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('resumeSession', JSON.stringify({
      user: userData,
      timestamp: Date.now()
    }))
  }
}

export function getSession() {
  if (typeof window === 'undefined') return null
  
  try {
    const session = localStorage.getItem('resumeSession')
    if (!session) return null
    
    const parsed = JSON.parse(session)
    // Session expires after 24 hours
    if (Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('resumeSession')
      return null
    }
    
    return parsed.user
  } catch {
    return null
  }
}

export function destroySession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('resumeSession')
  }
}