import { useOnboarding } from '@/context/OnboardingContext';

export default function AdditionalInfoStep() {
  const { catProfile, updateCatProfile, nextStep, prevStep } = useOnboarding();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
        Additional Information
      </h2>
      <p className="text-gray-600 mb-6">
        These details help us provide more personalized care recommendations for your cat.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="color" className="block text-gray-700 mb-2">
            Color
          </label>
          <input
            id="color"
            type="text"
            value={catProfile.color}
            onChange={(e) => updateCatProfile({ color: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
            placeholder="e.g., Orange tabby, Black & white"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="microchip_id" className="block text-gray-700 mb-2">
            Microchip ID (if available)
          </label>
          <input
            id="microchip_id"
            type="text"
            value={catProfile.microchip_id}
            onChange={(e) => updateCatProfile({ microchip_id: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="notes" className="block text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            id="notes"
            value={catProfile.notes}
            onChange={(e) => updateCatProfile({ notes: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
            rows={4}
            placeholder="Any special information about your cat (allergies, preferences, etc.)"
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