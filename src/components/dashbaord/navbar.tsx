'use client';

import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../app/utils/authcontext';
import Link from 'next/link';

// Icons (you can replace these with actual icon components)
const InvestmentIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>;
const SearchIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>;
const AIAnalysisIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 16H5V5h14v14zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>;
const NewsIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-8v12h8c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10h-8v-8h8v8z"/></svg>;
const FundingIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09v.58c0 .73-.6 1.33-1.33 1.33h-.75c-.73 0-1.33-.6-1.33-1.33v-.6c-1.54-.48-2.67-1.89-2.75-3.55h1.91c.09.93.73 1.75 1.95 1.75 1.45 0 2.04-.79 2.04-1.67 0-.85-.56-1.61-1.83-1.89l-1.83-.44c-1.67-.4-2.84-1.73-2.84-3.28 0-1.93 1.52-3.48 3.45-3.82V5.33c0-.73.6-1.33 1.33-1.33h.75c.73 0 1.33.6 1.33 1.33v.58c1.54.48 2.67 1.89 2.75 3.55h-1.91c-.09-.93-.73-1.75-1.95-1.75-1.45 0-2.04.79-2.04 1.67 0 .85.56 1.61 1.83 1.89l1.83.44c1.67.4 2.84 1.73 2.84 3.28 0 1.93-1.52 3.48-3.45 3.82z"/></svg>;
const ProfileIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;

export default function DashboardNavbar() {
  const { userInfo, logout } = useAuth();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Determine menu items based on user role
  const getMenuItems = () => {
    const baseItems = [
      { 
        label: 'AI Analysis', 
        href: '/dashboard/ai-analysis', 
        icon: <AIAnalysisIcon /> 
      },
      { 
        label: 'AI News', 
        href: '/dashboard/ainews', 
        icon: <NewsIcon /> 
      }
    ];

    if (userInfo?.role === 'Investor') {
      return [
        { 
          label: 'Investments', 
          href: '/dashboard/investments', 
          icon: <InvestmentIcon /> 
        },
        { 
          label: 'Startup Search', 
          href: '/dashboard/startup-search', 
          icon: <SearchIcon /> 
        },
        ...baseItems
      ];
    } else if (userInfo?.role === 'Startup') {
      return [
        { 
          label: 'Investor Search', 
          href: '/dashboard/investor-search', 
          icon: <SearchIcon /> 
        },
        { 
          label: 'Fundings', 
          href: '/dashboard/fundings', 
          icon: <FundingIcon /> 
        },
        ...baseItems
      ];
    }

    return baseItems;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="text-2xl font-bold text-green-600">
              BUCKz
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            {getMenuItems().map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-green-600 flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out hover:bg-green-50"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Profile Dropdown */}
          <div className="flex items-center relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center space-x-2 text-gray-700 hover:text-green-600 focus:outline-none"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <ProfileIcon />
              </div>
              <span className="hidden md:block font-medium">{userInfo?.username}</span>
            </button>

            {/* Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{userInfo?.username}</p>
                  <p className="text-xs text-gray-500">{userInfo?.email}</p>
                </div>
                <Link 
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  Profile Settings
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}