import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  // We need to make sure we're getting the redirectedFrom parameter correctly
  const redirectTo = requestUrl.searchParams.get('redirectedFrom') || '/dashboard';

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code);
    
    // Check if the user has any cats already
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: cats, error } = await supabase
        .from('cats')
        .select('id')
        .eq('user_id', user.id)
        .limit(1);
        
      if (error) {
        console.error('Error checking for existing cats:', error);
      }
      
      // If no cats exist, redirect to onboarding
      if (!cats || cats.length === 0) {
        return NextResponse.redirect(new URL('/onboarding', requestUrl.origin));
      }
    }
  }

  // Use the origin from the request URL to create an absolute URL
  return NextResponse.redirect(new URL(redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`, requestUrl.origin));
}