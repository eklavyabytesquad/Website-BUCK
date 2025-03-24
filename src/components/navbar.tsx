'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl">BUCK</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md font-medium hover:bg-green-700">
              Home
            </Link>
            <Link href="/startups" className="px-3 py-2 rounded-md font-medium hover:bg-green-700">
              Startups
            </Link>
            <Link href="/investors" className="px-3 py-2 rounded-md font-medium hover:bg-green-700">
              Investors
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-md font-medium hover:bg-green-700">
              About
            </Link>
            <Link href="/contact" className="px-3 py-2 rounded-md font-medium hover:bg-green-700">
              Contact
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/login" className="px-4 py-2 rounded-md font-medium bg-white text-green-600 hover:bg-gray-100">
              Login
            </Link>
            <Link href="/signup" className="px-4 py-2 rounded-md font-medium bg-green-800 text-white hover:bg-green-900">
              Sign Up
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-green-700 focus:outline-none"
            >
              <svg 
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-green-600`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="block px-3 py-2 rounded-md font-medium hover:bg-green-700">
            Home
          </Link>
          <Link href="/startups" className="block px-3 py-2 rounded-md font-medium hover:bg-green-700">
            Startups
          </Link>
          <Link href="/investors" className="block px-3 py-2 rounded-md font-medium hover:bg-green-700">
            Investors
          </Link>
          <Link href="/about" className="block px-3 py-2 rounded-md font-medium hover:bg-green-700">
            About
          </Link>
          <Link href="/contact" className="block px-3 py-2 rounded-md font-medium hover:bg-green-700">
            Contact
          </Link>
          <div className="flex space-x-2 mt-4">
            <Link href="/login" className="flex-1 px-4 py-2 text-center rounded-md font-medium bg-white text-green-600 hover:bg-gray-100">
              Login
            </Link>
            <Link href="/signup" className="flex-1 px-4 py-2 text-center rounded-md font-medium bg-green-800 text-white hover:bg-green-900">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}