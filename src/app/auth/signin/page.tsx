'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc'; // Import Google icon

export default function SignIn() {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await signInWithGoogle();
      // Note: The actual redirect happens in the callback route
    } catch (error) {
      console.error('Error during sign in:', error);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--background-primary)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-sm">
        <div>
          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-[var(--text-primary)]">
            Sign in to Cat Health Tracker
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Track your cat&apos;s health and well-being
          </p>
        </div>
        
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}
        
        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="cursor-pointer group relative flex w-full justify-center items-center rounded-full border border-transparent bg-[var(--accent-blue)] py-3 px-4 text-sm font-medium text-white hover:bg-[#6EB7D4] focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FcGoogle className="mr-2 h-5 w-5 rounded-full" />
            {isLoading ? 'Signing in...' : 'Sign in with Google'}
          </button>
            
          <div className="text-sm text-center">
            <Link href="/" className="font-medium text-[var(--accent-pink)] hover:text-[#E29DAA] transition-colors">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}