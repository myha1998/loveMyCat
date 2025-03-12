import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { FaClipboardList, FaBell, FaChartLine, FaPaw } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFE4E1]">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Track Your Cat&apos;s Health</span>
              <span className="block text-[#87CEEB] mt-2">With Ease</span>
            </h1>
            <p className="mt-4 max-w-md mx-auto text-lg text-gray-600">
              Monitor your cat&apos;s health, track vaccinations, set reminders, and more.
            </p>
            
            {/* Category Pills */}
            <div className="mt-8 flex gap-4 justify-center">
              <button className="px-6 py-2 rounded-full bg-white text-gray-700 flex items-center gap-2 hover:text-[var(--accent-pink)]">
                <FaPaw /> Health
              </button>
              <button className="px-6 py-2 rounded-full bg-white text-gray-700 flex items-center gap-2 hover:text-[var(--accent-pink)]">
                <FaBell /> Reminders
              </button>
              <button className="px-6 py-2 rounded-full bg-white text-gray-700 flex items-center gap-2 hover:text-[var(--accent-pink)]">
                <FaClipboardList /> Records
              </button>
            </div>

            {/* Feature Cards */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center">
                <div className="h-12 w-12 bg-[#87CEEB]/20 rounded-xl flex items-center justify-center mb-4">
                  <FaClipboardList className="h-5 w-5 text-[#87CEEB] flex-shrink-0" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Health Records</h3>
                <p className="mt-2 text-gray-600 text-center">Keep track of vaccinations, medications, and vet visits.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center">
                <div className="h-12 w-12 bg-[#87CEEB]/20 rounded-xl flex items-center justify-center mb-4">
                  <FaBell className="h-5 w-5 text-[#87CEEB] flex-shrink-0" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Smart Reminders</h3>
                <p className="mt-2 text-gray-600 text-center">Never miss important appointments or medications.</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center">
                <div className="h-12 w-12 bg-[#87CEEB]/20 rounded-xl flex items-center justify-center mb-4">
                  <FaChartLine className="h-6 w-6 text-[#87CEEB]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Health Analytics</h3>
                <p className="mt-2 text-gray-600 text-center">Track and visualize your cat&apos;s health trends over time.</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-12 flex gap-4 justify-center">
              <Link
                href="/auth/signin"
                className="px-8 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="#features"
                className="px-8 py-3 rounded-full bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
