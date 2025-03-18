"use client"

import { useState } from 'react';
import { QuickStatsProps, Cat, WeightRecord, VaccinationRecord } from '@/types/health';
import Image from 'next/image';
import { FaWeight, FaSyringe, FaExclamationTriangle } from 'react-icons/fa';

export default function QuickStats({ cats, weightRecords, vaccinationRecords }: QuickStatsProps) {
  const [selectedCat, setSelectedCat] = useState<string>(cats.length > 0 ? cats[0].id : '');

  // Filter records for the selected cat
  const catWeightRecords = weightRecords.filter(record => record.cat_id === selectedCat);
  const catVaccinationRecords = vaccinationRecords.filter(record => record.cat_id === selectedCat);

  // Sort weight records by date (newest first)
  const sortedWeightRecords = [...catWeightRecords].sort(
    (a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime()
  );

  // Get the latest weight record
  const latestWeightRecord = sortedWeightRecords.length > 0 ? sortedWeightRecords[0] : null;

  // Calculate weight trend (if there are at least 2 records)
  const weightTrend = sortedWeightRecords.length >= 2 
    ? sortedWeightRecords[0].weight - sortedWeightRecords[1].weight 
    : 0;

  // Sort vaccination records by expiry date (soonest first)
  const sortedVaccinationRecords = [...catVaccinationRecords].sort(
    (a, b) => new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime()
  );

  // Get upcoming vaccinations (those that expire within the next 30 days)
  const upcomingVaccinations = sortedVaccinationRecords.filter(record => {
    const expiryDate = new Date(record.expiry_date);
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);
    return expiryDate <= thirtyDaysFromNow && expiryDate >= today;
  });

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Quick Stats</h2>
      
      {/* Cat selector */}
      {cats.length > 0 ? (
        <div className="mb-4">
          <label htmlFor="cat-selector" className="block text-sm font-medium text-gray-700 mb-1">
            Select Cat
          </label>
          <select
            id="cat-selector"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)]"
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
          >
            {cats.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p className="text-gray-500 mb-4">No cats found. Add a cat to see stats.</p>
      )}

      {selectedCat && (
        <div className="space-y-4">
          {/* Weight stats */}
          <div className="border-b pb-4">
            <div className="flex items-center gap-2 mb-2">
              <FaWeight className="text-[var(--accent-blue)]" />
              <h3 className="font-medium">Weight Trend</h3>
            </div>
            
            {latestWeightRecord ? (
              <div>
                <p className="text-lg font-semibold">
                  {latestWeightRecord.weight} kg
                  {weightTrend !== 0 && (
                    <span className={`ml-2 text-sm ${weightTrend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {weightTrend > 0 ? '+' : ''}{weightTrend.toFixed(1)} kg
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  Last recorded: {formatDate(latestWeightRecord.recorded_at)}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">No weight records available.</p>
            )}
          </div>

          {/* Vaccination stats */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FaSyringe className="text-[var(--accent-blue)]" />
              <h3 className="font-medium">Vaccination Status</h3>
            </div>
            
            {sortedVaccinationRecords.length > 0 ? (
              <div>
                <p className="mb-2">
                  <span className="font-semibold">{sortedVaccinationRecords.length}</span> vaccinations recorded
                </p>
                
                {upcomingVaccinations.length > 0 ? (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                    <div className="flex items-start">
                      <FaExclamationTriangle className="text-yellow-400 mt-0.5 mr-2" />
                      <div>
                        <p className="font-medium text-yellow-700">Upcoming vaccinations:</p>
                        <ul className="mt-1 space-y-1">
                          {upcomingVaccinations.map(vaccination => (
                            <li key={vaccination.id} className="text-sm text-yellow-700">
                              {vaccination.vaccine_name} - expires {formatDate(vaccination.expiry_date)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-green-600 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 bg-green-600 rounded-full"></span>
                    All vaccinations up to date
                  </p>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No vaccination records available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}