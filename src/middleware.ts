import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Skip middleware for callback routes to prevent redirect loops
  if (req.nextUrl.pathname.includes('/auth/callback')) {
    return NextResponse.next();
  }

  // Create a Supabase client configured to use cookies
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there's no session and the user is trying to access a protected route
  if (!session && req.nextUrl.pathname.startsWith('/dashboard')) {
    // Redirect to the signin page
    const redirectUrl = new URL('/auth/signin', req.url);
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (session && req.nextUrl.pathname.startsWith('/auth/signin')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/auth/signin',
    '/auth/callback',
    '/onboarding/:path*'
  ],
};