import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPage = path === '/login' || path === '/register';
  const isVerificationPages = path === '/verifyemail' || path === '/resetpassword';
  const token = request.cookies.get('token')?.value || '';

  //if path is public and token is present, redirect to homepage

  if ((isPublicPage && !!token.length) && !isVerificationPages) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  //if path is private && there is not token redirect to login page
  if ((!isPublicPage && !token) && !isVerificationPages) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile', '/login', '/register', '/verifyemail', '/resetpassword']
}