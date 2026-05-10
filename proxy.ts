// proxy.ts (Pengganti middleware di Next.js 16)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const warungId = request.cookies.get('warungId')?.value
  const { pathname } = request.nextUrl

  // Redirect logic
  if (warungId && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const response = NextResponse.next()

  // Paksa header anti-cache agar iOS tidak menyimpan snapshot lama
  response.headers.set('Cache-Control', 'no-store, must-revalidate')
  return response
}

// Konfigurasi matcher tetap sama
export const config = {
  matcher: ['/', '/login', '/register', '/profil'],
}