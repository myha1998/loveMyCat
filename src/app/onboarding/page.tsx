'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/context/OnboardingContext';
import { useAuth } from '@/context/AuthContext';
import WelcomeStep from '@/components/onboarding/WelcomeStep';
import BasicInfoStep from '@/components/onboarding/BasicInfoStep';
import AdditionalInfoStep from '@/components/onboarding/AdditionalInfoStep';
import PhotoUploadStep from '@/components/onboarding/PhotoUploadStep';
import ProgressBar from '@/components/onboarding/ProgressBar';

export default function Onboarding() {
  const { currentStep, totalSteps, isCompleted } = useOnboarding();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if onboarding is completed
    if (isCompleted) {
      router.push('/dashboard');
    }

    // Redirect to sign in if not authenticated
    if (!user) {
      router.push('/auth/signin');
    }
  }, [isCompleted, user, router]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep />;
      case 2:
        return <BasicInfoStep />;
      case 3:
        return <AdditionalInfoStep />;
      case 4:
        return <PhotoUploadStep />;
      default:
        return <WelcomeStep />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background-primary)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent-blue)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-primary)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <div className="mt-8">
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  );
}