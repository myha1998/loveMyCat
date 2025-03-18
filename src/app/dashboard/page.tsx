'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import CatCard from '@/components/dashboard/CatCard';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
// Add this import at the top of the file
import Link from 'next/link';

// Define a proper interface for the Cat type
interface Cat {
  id: string;
  name: string;
  breed: string;
  gender: string;
  birth_date: string;
  color: string;
  microchip_id: string;
  notes: string;
  profile_image_url: string; // Database field name
  user_id: string;
  created_at: string;
  updated_at: string;
  // UI-specific fields that might not be in the database
  healthStatus?: string;
  age?: number;
  lastCheckup?: string;
  upcomingVaccination?: string;
  weight?: number;
  // Add an alias for profileImageUrl to handle both naming conventions
  profileImageUrl?: string;
}

// Type for database responses to ensure proper mapping
type DatabaseCat = Omit<Cat, 'healthStatus' | 'age' | 'lastCheckup' | 'upcomingVaccination' | 'weight' | 'profileImageUrl'>;

// Temporary mock data with proper typing
const mockCats: Cat[] = [
  {
    id: '1',
    name: 'Whiskers',
    breed: 'Siamese',
    gender: 'male',
    birth_date: '2020-11-15',
    color: 'Cream',
    microchip_id: '',
    notes: '',
    profile_image_url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    user_id: 'mock-user-id',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    healthStatus: 'healthy',
    age: 3,
    lastCheckup: '2023-10-15',
    upcomingVaccination: '2024-01-15',
    weight: 4.5,
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'Maine Coon',
    gender: 'female',
    birth_date: '2021-11-15', // Added required field
    color: 'Gray', // Added required field
    microchip_id: '', // Added required field
    notes: '', // Added required field
    profile_image_url: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    user_id: 'mock-user-id', // Added required field
    created_at: '2023-01-01T00:00:00Z', // Added required field
    updated_at: '2023-01-01T00:00:00Z', // Added required field
    healthStatus: 'needs attention',
    age: 2,
    lastCheckup: '2023-09-20',
    upcomingVaccination: '2023-12-20',
    weight: 5.2,
  },
  {
    id: '3',
    name: 'Oliver',
    breed: 'Tabby',
    gender: 'male',
    birth_date: '2018-11-15', // Added required field
    color: 'Orange', // Added required field
    microchip_id: '', // Added required field
    notes: '', // Added required field
    profile_image_url: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    user_id: 'mock-user-id', // Added required field
    created_at: '2023-01-01T00:00:00Z', // Added required field
    updated_at: '2023-01-01T00:00:00Z', // Added required field
    healthStatus: 'healthy',
    age: 5,
    lastCheckup: '2023-11-05',
    upcomingVaccination: '2024-02-05',
    weight: 6.0,
  },
];

export default function Dashboard() {
  // Properly typed state variables
  const [cats, setCats] = useState<Cat[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClientComponentClient();
  const router = useRouter();
  
  useEffect(() => {
    const fetchCats = async () => {
      try {
        // Get the current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return;
        
        // Fetch cats that belong to the current user with proper typing
        const { data, error } = await supabase
          .from('cats')
          .select('*')
          .eq('user_id', user.id);
          
        if (error) {
          console.error('Error fetching cats:', error);
          return;
        }
        
        if (data) {
          // Process the data to ensure consistent property naming
          const processedCats: Cat[] = data.map((cat: DatabaseCat) => ({
            ...cat,
            // Add any UI-specific fields or transformations here
            healthStatus: determineHealthStatus(cat), // Example function to determine health status
          }));
          
          setCats(processedCats);
          
          // If no cats, redirect to onboarding
          if (data.length === 0) {
            router.push('/onboarding');
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCats();
  }, [supabase, router]);
  
  // Helper function to determine health status (example)
  const determineHealthStatus = (cat: DatabaseCat): string => {
    // This is just a placeholder - implement your actual logic
    return 'healthy';
  };
  
  // Filter cats based on search term and filter status
  const filteredCats = cats.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Handle potential undefined healthStatus
    const matchesFilter = filterStatus === 'all' || cat.healthStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // First, let's define a proper interface for what CatCard expects
  interface CatCardProps {
    id: string;
    name: string;
    breed: string;
    gender: string;
    age: number; // Changed from optional to required
    healthStatus: string; // Changed from optional to required
    lastCheckup: string; // Changed from optional to required
    upcomingVaccination: string; // Changed from optional to required
    weight: number; // Changed from optional to required
    profileImageUrl: string;
  }
  
  // Normalize cat data for CatCard component with proper typing
  const normalizeCatForCard = (cat: Cat): CatCardProps => {
    // Calculate age from birth_date if not provided
    const age = cat.age ?? calculateAgeFromBirthDate(cat.birth_date);
    
    return {
      id: cat.id,
      name: cat.name,
      breed: cat.breed,
      gender: cat.gender,
      age: age,
      healthStatus: cat.healthStatus ?? 'healthy',
      lastCheckup: cat.lastCheckup ?? 'Not available', // Provide default value
      upcomingVaccination: cat.upcomingVaccination ?? 'Not scheduled', // Provide default value
      weight: cat.weight ?? 0, // Provide default value
      profileImageUrl: cat.profileImageUrl || cat.profile_image_url
    };
  };
  
  // Helper function to calculate age from birth date
  const calculateAgeFromBirthDate = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };
  
  // Then in your JSX:
  {filteredCats.map(cat => (
    <CatCard key={cat.id} cat={normalizeCatForCard(cat)} />
  ))}

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard</h1>
          <p className="text-gray-600">Manage your cats&apos; health and well-being</p>
        </div>
        <Link 
          href="/dashboard/cats/add" 
          className="mt-4 md:mt-0 flex items-center gap-2 bg-[var(--accent-blue)] text-white px-4 py-2 rounded-full hover:bg-[#6EB7D4] transition-colors"
        >
          <FaPlus /> Add New Cat
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search cats..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="healthy">Healthy</option>
              <option value="needs attention">Needs Attention</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">Quick Access</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/dashboard/quick-stats">
            <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <h3 className="font-medium mb-1">Health Metrics</h3>
              <p className="text-sm text-gray-600">View weight trends and vaccination status</p>
            </div>
          </Link>
          {/* Add more quick access links here */}
        </div>
      </div>
      {/* Cat Overview */}
      <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Your Cats</h2>
    
      {isLoading ? (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--accent-blue)] mx-auto"></div>
          <p className="text-gray-500 mt-4">Loading your cats...</p>
        </div>
      ) : filteredCats.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <p className="text-gray-500">No cats found. Add a new cat to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCats.map(cat => (
            <CatCard key={cat.id} cat={normalizeCatForCard(cat)} />
          ))}
        </div>
      )}
      
      {/* // Add this somewhere in your dashboard JSX, perhaps after the search and filter section */}
   
    </div>
  );
}