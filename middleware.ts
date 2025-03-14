
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is a protected route (dashboard or other protected routes)
  const isProtectedRoute = pathname.startsWith('/dashboard');
  
  // Public paths that don't require authentication
  const isPublicPath = pathname.startsWith('/sign-in') || 
                       pathname.startsWith('/sign-up') ||
                       pathname === '/';
  
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Redirect unauthenticated users from protected routes to the sign-in page
  if (isProtectedRoute && !token) {
    const signInUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect authenticated users from auth pages to the dashboard
  if (isPublicPath && token) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
