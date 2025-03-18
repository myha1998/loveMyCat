// Types for weight records
export interface WeightRecord {
  id: string;
  cat_id: string;
  weight: number;
  recorded_at: string;
  notes?: string;
}

// Types for vaccination records
export interface VaccinationRecord {
  id: string;
  cat_id: string;
  vaccine_name: string;
  administered_date: string;
  expiry_date: string;
  vet_name?: string;
  notes?: string;
  reminder_set: boolean;
}

// Types for cat data
export interface Cat {
  id: string;
  name: string;
  profile_image_url?: string;
}

// Types for the quick stats component
export interface QuickStatsProps {
  cats: Cat[];
  weightRecords: WeightRecord[];
  vaccinationRecords: VaccinationRecord[];
}