// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const warungId = request.cookies.get('warungId')?.value
  const { pathname } = request.nextUrl

  // 1. Logic Redirect
  if (warungId && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const response = NextResponse.next()

  // 2. KUNCI: Matikan Cache untuk navigasi PWA agar selalu fresh
  response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')

  return response
}

export const config = {
  // Masukkan dashboard dan profil ke matcher agar selalu dicek
  matcher: ['/', '/login', '/register', '/profil'],
}