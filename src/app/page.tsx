import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Connecting Startups with the Right Investors
              </h1>
              <p className="text-xl mb-8">
                BUCK is a platform that bridges the gap between innovative startups and forward-thinking investors. Join our community and take your business to the next level.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/startups/register" className="px-6 py-3 bg-white text-green-600 font-semibold rounded-md hover:bg-gray-100 text-center">
                  Register Startup
                </Link>
                <Link href="/investors/register" className="px-6 py-3 bg-green-800 text-white font-semibold rounded-md hover:bg-green-900 text-center">
                  Become an Investor
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                {/* Placeholder for hero image - replace with your actual image */}
                <div className="bg-gray-200 w-full h-64 md:h-80 rounded relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Hero Image Placeholder
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How BUCK Works</h2>
            <p className="mt-4 text-xl text-gray-600">Simple, transparent, and effective</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Register</h3>
              <p className="text-gray-600">Create your profile as a startup or investor and showcase your strengths.</p>
            </div>
            
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect</h3>
              <p className="text-gray-600">Find the perfect match based on industry, funding stage, and investment goals.</p>
            </div>
            
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Grow</h3>
              <p className="text-gray-600">Secure funding and mentorship to take your startup to new heights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Startups Showcase */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Startups</h2>
            <p className="mt-4 text-xl text-gray-600">Discover innovative ventures seeking investment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    Startup Image
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Startup {i}</h3>
                  <p className="text-green-600 mb-2">Tech &bull; Series A</p>
                  <p className="text-gray-600 mb-4">A brief description of what this startup does and why it's worth investing in.</p>
                  <Link href={`/startups/${i}`} className="text-green-600 font-medium hover:text-green-800">
                    Learn More &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/startups" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
              View All Startups
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Success Stories</h2>
            <p className="mt-4 text-xl text-gray-600">Hear from our community</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">John Doe</h4>
                  <p className="text-gray-600">CEO, TechStart</p>
                </div>
              </div>
              <p className="text-gray-700">
                "BUCK helped us connect with investors who truly understood our vision. Within 3 months, we secured the funding we needed to scale our operations."
              </p>
            </div>
            
            <div className="p-6 bg-green-50 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">Jane Smith</h4>
                  <p className="text-gray-600">Angel Investor</p>
                </div>
              </div>
              <p className="text-gray-700">
                "As an investor, BUCK has streamlined my deal flow. The platform's curation and analytics help me find promising startups that align with my investment thesis."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Take the Next Step?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join BUCK today and be part of a growing community that's reshaping the startup ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/signup" className="px-8 py-4 bg-white text-green-600 font-semibold rounded-md hover:bg-gray-100">
              Sign Up Now
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-green-800 text-white font-semibold rounded-md hover:bg-green-900">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}