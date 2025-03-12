'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaHome, 
  FaCat, 
  FaWeight, 
  FaSyringe, 
  FaUtensils, 
  FaNotesMedical, 
  FaBell, 
  FaChartLine, 
  FaCog 
} from 'react-icons/fa';

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Load collapse state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);
  
  // Save collapse state to localStorage when it changes
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

  const menuItems = [
    { name: 'Dashboard', icon: <FaHome />, path: '/dashboard' },
    { name: 'Cats', icon: <FaCat />, path: '/dashboard/cats' },
    { name: 'Weight Tracking', icon: <FaWeight />, path: '/dashboard/weight' },
    { name: 'Vaccinations', icon: <FaSyringe />, path: '/dashboard/vaccinations' },
    { name: 'Diet & Feeding', icon: <FaUtensils />, path: '/dashboard/diet' },
    { name: 'Medical Records', icon: <FaNotesMedical />, path: '/dashboard/medical' },
    { name: 'Reminders', icon: <FaBell />, path: '/dashboard/reminders' },
    { name: 'Reports', icon: <FaChartLine />, path: '/dashboard/reports' },
    { name: 'Settings', icon: <FaCog />, path: '/dashboard/settings' },
  ];

  return (
    <aside className={`bg-white h-screen shadow-sm ${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 hidden md:block`}>
      <div className="p-4">
        <button 
          onClick={toggleCollapse}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="mt-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link 
                href={item.path}
                className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-4'} py-3 ${
                  pathname === item.path 
                    ? 'bg-[var(--accent-blue)/10] text-[var(--accent-blue)]' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}