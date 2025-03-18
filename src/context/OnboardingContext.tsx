'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type CatProfile = {
  name: string;
  birth_date: string;
  breed: string;
  gender: string;
  color: string;
  microchip_id: string;
  notes: string;
  profile_image_url: string;
  profile_image_file?: File;
};

type OnboardingContextType = {
  currentStep: number;
  totalSteps: number;
  catProfile: CatProfile;
  updateCatProfile: (data: Partial<CatProfile>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetOnboarding: () => void;
  isCompleted: boolean;
  setIsCompleted: (value: boolean) => void;
};

const defaultCatProfile: CatProfile = {
  name: '',
  birth_date: '',
  breed: '',
  gender: '',
  color: '',
  microchip_id: '',
  notes: '',
  profile_image_url: '',
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [catProfile, setCatProfile] = useState<CatProfile>(defaultCatProfile);
  const [isCompleted, setIsCompleted] = useState(false);
  const totalSteps = 4; // Welcome, Basic Info, Additional Info, Photo Upload

  const updateCatProfile = (data: Partial<CatProfile>) => {
    setCatProfile(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const resetOnboarding = () => {
    setCurrentStep(1);
    setCatProfile(defaultCatProfile);
    setIsCompleted(false);
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        totalSteps,
        catProfile,
        updateCatProfile,
        nextStep,
        prevStep,
        goToStep,
        resetOnboarding,
        isCompleted,
        setIsCompleted,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}