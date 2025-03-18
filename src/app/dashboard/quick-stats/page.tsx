import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import QuickStats from '@/components/dashboard/QuickStats';
import { Cat, WeightRecord, VaccinationRecord } from '@/types/health';

export default async function QuickStatsPage() {
  const supabase = createServerComponentClient({ cookies });
  
  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/auth/signin');
  }
  
  // Fetch cats for the current user
  const { data: cats, error: catsError } = await supabase
    .from('cats')
    .select('id, name, profile_image_url')
    .eq('user_id', session.user.id);
  
  if (catsError) {
    console.error('Error fetching cats:', catsError);
    return <div>Error loading cats data</div>;
  }
  
  // If no cats, redirect to onboarding
  if (!cats || cats.length === 0) {
    redirect('/onboarding');
  }
  
  // Get all cat IDs
  const catIds = cats.map(cat => cat.id);
  
  // Fetch weight records for all cats
  const { data: weightRecords, error: weightError } = await supabase
    .from('weight_records')
    .select('*')
    .in('cat_id', catIds)
    .order('recorded_at', { ascending: false });
  
  if (weightError) {
    console.error('Error fetching weight records:', weightError);
    return <div>Error loading weight data</div>;
  }
  
  // Fetch vaccination records for all cats
  const { data: vaccinationRecords, error: vaccinationError } = await supabase
    .from('vaccinations')
    .select('*')
    .in('cat_id', catIds)
    .order('expiry_date', { ascending: true });
  
  if (vaccinationError) {
    console.error('Error fetching vaccination records:', vaccinationError);
    return <div>Error loading vaccination data</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">Health Metrics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickStats 
          cats={cats as Cat[]} 
          weightRecords={weightRecords as WeightRecord[]} 
          vaccinationRecords={vaccinationRecords as VaccinationRecord[]} 
        />
        
        {/* You can add more components here later, like a detailed weight chart */}
      </div>
    </div>
  );
}