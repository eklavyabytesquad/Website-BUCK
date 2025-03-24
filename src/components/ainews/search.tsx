'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from './newscard';

// Define types for better type safety
interface NewsItem {
  title: string;
  snippet: string;
  publisher: string;
  timestamp: string;
  newsUrl: string;
  images?: {
    thumbnail?: string;
    thumbnailProxied?: string;
  };
  subnews?: NewsItem[];
}

// News categories and their corresponding API endpoints
const NEWS_CATEGORIES = [
  { label: 'Latest', endpoint: 'latest' },
  { label: 'Business', endpoint: 'business' },
  { label: 'Technology', endpoint: 'technology' },
  { label: 'Health', endpoint: 'health' },
  { label: 'Sports', endpoint: 'sport' },
  { label: 'Science', endpoint: 'science' }
];

// Countries and their language codes
const COUNTRIES = [
  { label: 'United States', code: 'US', language: 'en-US' },
  { label: 'India', code: 'IN', language: 'hi-IN' },
  { label: 'United Kingdom', code: 'GB', language: 'en-GB' },
  { label: 'Canada', code: 'CA', language: 'en-CA' }
];

export default function NewsSearchComponent() {
  // State for search parameters and results
  const [category, setCategory] = useState('latest');
  const [country, setCountry] = useState('US');
  const [language, setLanguage] = useState('en-US');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Fetch news based on selected parameters with exponential backoff for rate limits
  const fetchNews = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // API key should ideally be stored in an environment variable
      // Using a proxy server would be even better to keep API keys secure
      const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '37dacdcf12msh2c6bc485cebbd88p137f0fjsn7eac11ea907';
      
      const response = await axios.get(`https://google-news13.p.rapidapi.com/${category}`, {
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'google-news13.p.rapidapi.com'
        },
        params: {
          lr: language,
          geo: country
        }
      });

      // Ensure we have an items array to work with
      if (response.data && response.data.items) {
        setNews(response.data.items);
        setRetryCount(0); // Reset retry count on success
      } else {
        setNews([]);
        setError('No news data available for the selected filters.');
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      
      // Handle rate limiting explicitly
      if (axios.isAxiosError(err) && err.response?.status === 429) {
        const retryAfter = parseInt(err.response.headers['retry-after'] || '60', 10);
        setError(`Rate limit exceeded. The API is temporarily unavailable. Please try again in ${retryAfter} seconds or change your search parameters.`);
      } else {
        setError('Failed to fetch news. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Manual retry function
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchNews();
  };

  // Fetch news when component mounts or parameters change
  useEffect(() => {
    fetchNews();
  }, [category, country, language]);

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-black mb-4">News Feed</h2>
      
      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            News Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600 bg-white text-black"
          >
            {NEWS_CATEGORIES.map((cat) => (
              <option key={cat.endpoint} value={cat.endpoint}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Country Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Country
          </label>
          <select
            value={country}
            onChange={(e) => {
              const selectedCountry = COUNTRIES.find(c => c.code === e.target.value);
              setCountry(e.target.value);
              setLanguage(selectedCountry?.language || 'en-US');
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-600 focus:border-green-600 bg-white text-black"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Language
          </label>
          <input
            type="text"
            value={language}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-black"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-600"></div>
        </div>
      )}

      {/* Error State with Retry Button */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-900 p-4 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{error}</p>
              {error.includes('Rate limit') && (
                <p className="mt-2 text-xs text-red-800">
                  RapidAPI Free tier has limited requests per month. Consider upgrading your plan or implementing a caching strategy.
                </p>
              )}
              <div className="mt-3">
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News Results */}
      {!isLoading && !error && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.length > 0 ? (
            news.map((item, index) => (
              <NewsCard key={index} newsItem={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-800 bg-gray-50 rounded-lg border border-gray-200 p-6">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No news found</h3>
              <p className="mt-1 text-sm text-gray-500">
                No news articles found for the selected category and region.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}