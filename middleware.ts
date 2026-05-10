import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server' // Perbaikan disini

export function middleware(request: NextRequest) {
  const warungId = request.cookies.get('warungId')?.value
  const { pathname } = request.nextUrl

  // Jika sudah login tapi coba buka login/register, lempar ke Dashboard
  if (warungId && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/register'],
}