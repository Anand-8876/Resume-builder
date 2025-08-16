import { NextResponse } from 'next/server'

export function middleware(request) {
  // Simple middleware for demonstration
  // In production, implement proper authentication checks
  
  const { pathname } = request.nextUrl
  
  // Allow public paths
  const publicPaths = ['/login', '/']
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }
  
  // For protected paths, we'll let the client-side handle authentication
  // since this is a demo app with localStorage-based session management
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}