import Link from 'next/link';
import Image from 'next/image';
import { FaPaw, FaWeight, FaSyringe, FaCalendarAlt } from 'react-icons/fa';

type CatCardProps = {
  cat: {
    id: string;
    name: string;
    age: number;
    breed: string;
    gender: string;
    healthStatus: string;
    lastCheckup: string;
    upcomingVaccination: string;
    weight: number;
    profileImageUrl: string;
  };
};

export default function CatCard({ cat }: CatCardProps) {
  // Function to determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'needs attention':
        return 'bg-yellow-100 text-yellow-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Link href={`/dashboard/cats/${cat.id}`}>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative h-48 w-full">
          {cat.profileImageUrl ? (
            <Image
              src={cat.profileImageUrl}
              alt={cat.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
              <FaPaw className="text-gray-400 text-4xl" />
            </div>
          )}
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(cat.healthStatus)}`}>
            {cat.healthStatus}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">{cat.name}</h3>
            <span className="text-sm text-gray-500">{cat.age} {cat.age === 1 ? 'year' : 'years'}</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">{cat.breed} • {cat.gender}</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <FaWeight className="text-[var(--accent-blue)]" />
              <span>{cat.weight} kg</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[var(--accent-blue)]" />
              <span>Last checkup: {formatDate(cat.lastCheckup)}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FaSyringe className="text-[var(--accent-blue)]" />
              <span>Next vaccination: {formatDate(cat.upcomingVaccination)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}