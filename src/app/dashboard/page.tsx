'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../utils/authcontext';
import DashboardNavbar from '../../components/dashbaord/navbar';

export default function Dashboard() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect logic with more robust checking
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Loading state with improved design
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600 mb-4 mx-auto"></div>
          <p className="text-green-800 font-semibold">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <DashboardNavbar />
      
      {/* Main dashboard content will go here */}
      <main className="container mx-auto px-4 py-8">
        {/* Placeholder for dashboard content */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold text-green-800 mb-4">
            Welcome to BUCKz Dashboard
          </h1>
          <p className="text-gray-600">
            Select an option from the navigation menu to get started.
          </p>
        </div>
      </main>
    </div>
  );
}