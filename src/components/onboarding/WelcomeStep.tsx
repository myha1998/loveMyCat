import { useOnboarding } from '@/context/OnboardingContext';
import Image from 'next/image';

export default function WelcomeStep() {
  const { nextStep } = useOnboarding();

  return (
    <div className="text-center">
      <div className="mx-auto w-24 h-24 relative mb-6">
        <Image 
          src="/images/cat-welcome.png" 
          alt="Welcome Cat" 
          fill
          className="object-contain"
          priority
        />
      </div>
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
        Welcome to Cat Health Tracker!
      </h2>
      <p className="text-gray-600 mb-8">
        Let's set up your cat's profile to get started. This will help us provide personalized health tracking and reminders for your furry friend.
      </p>
      <p className="text-gray-600 mb-8">
        We'll guide you through a few simple steps to collect some basic information about your cat.
      </p>
      <button
        onClick={nextStep}
        className="w-full md:w-auto bg-[var(--accent-blue)] text-white px-6 py-3 rounded-full hover:bg-[#6EB7D4] transition-colors"
      >
        Let's Get Started
      </button>
    </div>
  );
}