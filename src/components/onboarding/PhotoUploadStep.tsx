'use client';

import { useOnboarding } from '@/context/OnboardingContext';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PhotoUploadStep() {
  const { catProfile, updateCatProfile, prevStep, setIsCompleted } = useOnboarding();
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Only image files are allowed');
      return;
    }

    setError(null);
    updateCatProfile({ profile_image_file: file });
    
    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      let profile_image_url = '';
      
      // Upload image if available
      if (catProfile.profile_image_file) {
        setIsUploading(true);
        const fileExt = catProfile.profile_image_file.name.split('.').pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const filePath = `cat-profiles/${fileName}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('cat-images')
          .upload(filePath, catProfile.profile_image_file);
          
        if (uploadError) {
          throw new Error(`Error uploading image: ${uploadError.message}`);
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('cat-images')
          .getPublicUrl(filePath);
          
        profile_image_url = publicUrl;
        setIsUploading(false);
      }
      
      // Save cat profile to database
      const { error: insertError } = await supabase
        .from('cats')
        .insert({
          user_id: user.id,
          name: catProfile.name,
          birth_date: catProfile.birth_date,
          breed: catProfile.breed,
          gender: catProfile.gender,
          color: catProfile.color,
          microchip_id: catProfile.microchip_id,
          notes: catProfile.notes,
          profile_image_url,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
        
      if (insertError) {
        throw new Error(`Error saving cat profile: ${insertError.message}`);
      }
      
      // Mark onboarding as completed and redirect to dashboard
      setIsCompleted(true);
      router.push('/dashboard');
      
    } catch (err) {
      console.error('Error during cat profile creation:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
        Add a Photo
      </h2>
      <p className="text-gray-600 mb-6">
        Upload a photo of your cat to personalize their profile. This step is optional but recommended.
      </p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex justify-center items-center">
            <div className="w-40 h-40 border-2 border-dashed border-gray-300 rounded-full flex flex-col justify-center items-center bg-gray-50 relative overflow-hidden">
              {previewUrl ? (
                <Image 
                  src={previewUrl} 
                  alt="Cat preview" 
                  fill
                  className="object-cover"
                />
              ) : (
                <>
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span className="text-sm text-gray-500 mt-2">Upload photo</span>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <span>{previewUrl ? 'Change Photo' : 'Select Photo'}</span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
            disabled={isSubmitting}
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting || isUploading}
            className="px-6 py-2 bg-[var(--accent-blue)] text-white rounded-full hover:bg-[#6EB7D4] transition-colors disabled:opacity-50"
          >
            {isSubmitting || isUploading ? 'Saving...' : 'Complete Setup'}
          </button>
        </div>
      </form>
    </div>
  );
}