import React from 'react';

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-[var(--accent-blue)]">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-[var(--accent-blue)]">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-[var(--accent-blue)] h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}