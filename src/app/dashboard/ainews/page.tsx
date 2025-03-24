'use client';

import DashboardNavbar from '../../../components/dashbaord/navbar';
import NewsSearchComponent from '../../../components/ainews/search';

export default function AINEWSPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <DashboardNavbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          <div className="bg-green-600 text-white p-6">
            <h1 className="text-3xl font-bold">AI News & Updates</h1>
            <p className="text-green-100 mt-2">
              Stay informed with the latest news across various categories
            </p>
          </div>
          
          <div className="p-6">
            <NewsSearchComponent />
          </div>
        </div>
      </main>
    </div>
  );
}