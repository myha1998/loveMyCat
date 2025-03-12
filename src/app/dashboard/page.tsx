'use client';

import { useState } from 'react';
import CatCard from '@/components/dashboard/CatCard';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import Link from 'next/link';

// Temporary mock data - will be replaced with actual data from Supabase
const mockCats = [
  {
    id: '1',
    name: 'Whiskers',
    age: 3,
    breed: 'Siamese',
    gender: 'male',
    healthStatus: 'healthy',
    lastCheckup: '2023-10-15',
    upcomingVaccination: '2024-01-15',
    weight: 4.5,
    profileImageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '2',
    name: 'Luna',
    age: 2,
    breed: 'Maine Coon',
    gender: 'female',
    healthStatus: 'needs attention',
    lastCheckup: '2023-09-20',
    upcomingVaccination: '2023-12-20',
    weight: 5.2,
    profileImageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: '3',
    name: 'Oliver',
    age: 5,
    breed: 'Tabby',
    gender: 'male',
    healthStatus: 'healthy',
    lastCheckup: '2023-11-05',
    upcomingVaccination: '2024-02-05',
    weight: 6.0,
    profileImageUrl: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
  },
];

export default function Dashboard() {
  // Keep setCats for future implementation of data fetching from API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cats, setCats] = useState(mockCats);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Filter cats based on search term and filter status
  const filteredCats = cats.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || cat.healthStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

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

      {/* Cat Overview */}
      <h2 className="text-xl font-semibold mb-4 text-[var(--text-primary)]">Your Cats</h2>
      
      {filteredCats.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <p className="text-gray-500">No cats found. Add a new cat to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCats.map(cat => (
            <CatCard key={cat.id} cat={cat} />
          ))}
        </div>
      )}
    </div>
  );
}