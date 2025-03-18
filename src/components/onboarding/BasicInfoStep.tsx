import { useOnboarding } from '@/context/OnboardingContext';
import { useState } from 'react';

export default function BasicInfoStep() {
  const { catProfile, updateCatProfile, nextStep, prevStep } = useOnboarding();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!catProfile.name.trim()) {
      newErrors.name = "Cat's name is required";
    }
    
    if (!catProfile.birth_date) {
      newErrors.birth_date = "Birth date is required";
    }
    
    if (!catProfile.gender) {
      newErrors.gender = "Gender is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
        Basic Information
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Cat's Name*
          </label>
          <input
            id="name"
            type="text"
            value={catProfile.name}
            onChange={(e) => updateCatProfile({ name: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="birth_date" className="block text-gray-700 mb-2">
            Birth Date (approximate is fine)*
          </label>
          <input
            id="birth_date"
            type="date"
            value={catProfile.birth_date}
            onChange={(e) => updateCatProfile({ birth_date: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] ${
              errors.birth_date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.birth_date && <p className="text-red-500 text-sm mt-1">{errors.birth_date}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-700 mb-2">
            Gender*
          </label>
          <select
            id="gender"
            value={catProfile.gender}
            onChange={(e) => updateCatProfile({ gender: e.target.value })}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] ${
              errors.gender ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="breed" className="block text-gray-700 mb-2">
            Breed (optional)
          </label>
          <input
            id="breed"
            type="text"
            value={catProfile.breed}
            onChange={(e) => updateCatProfile({ breed: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
          />
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[var(--accent-blue)] text-white rounded-full hover:bg-[#6EB7D4] transition-colors"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}