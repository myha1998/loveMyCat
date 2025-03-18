import { AuthProvider } from '@/context/AuthContext';
import { OnboardingProvider } from '@/context/OnboardingContext';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cat Health Tracker',
  description: 'Track and manage your cat\'s health effectively',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <OnboardingProvider>
            {children}
          </OnboardingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
