'use client';

import { useState } from 'react';

// Interface for NewsItem to match the structure from the API
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

// Utility function to format timestamp
const formatDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp));
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function NewsCard({ newsItem }: { newsItem: NewsItem }) {
  // State to toggle expanded view of subnews
  const [isExpanded, setIsExpanded] = useState(false);

  // Truncate text if it's too long
  const truncateText = (text: string, maxLength: number = 150) => {
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Thumbnail Image */}
      {newsItem.images?.thumbnail && (
        <div className="h-48 overflow-hidden">
          <img 
            src={newsItem.images.thumbnailProxied || newsItem.images.thumbnail} 
            alt={newsItem.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-green-800 mb-2">
          {truncateText(newsItem.title, 100)}
        </h3>

        {/* Snippet */}
        <p className="text-gray-600 mb-3">
          {truncateText(newsItem.snippet)}
        </p>

        {/* Meta Information */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span>{newsItem.publisher}</span>
          <span>{formatDate(newsItem.timestamp)}</span>
        </div>

        {/* Main Article Link */}
        <a 
          href={newsItem.newsUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-800 font-semibold inline-block mb-3"
        >
          Read Full Article
        </a>

        {/* Subnews Section */}
        {newsItem.subnews && newsItem.subnews.length > 0 && (
          <div className="mt-4">
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-green-600 hover:text-green-800 font-medium"
            >
              {isExpanded ? 'Hide Related News' : `Show ${newsItem.subnews.length} Related Articles`}
            </button>

            {isExpanded && (
              <div className="mt-3 space-y-2 border-t pt-3">
                {newsItem.subnews.map((subNews, index) => (
                  <div key={index} className="bg-green-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-1">
                      {truncateText(subNews.title, 80)}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2">
                      {truncateText(subNews.snippet, 100)}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{subNews.publisher}</span>
                      <a 
                        href={subNews.newsUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}