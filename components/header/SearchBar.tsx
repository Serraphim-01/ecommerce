"use client";

import { Search } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isMobile?: boolean;
}

export const SearchBar = ({ searchQuery, setSearchQuery, isMobile }: SearchBarProps) => {
  const containerClasses = isMobile ? "md:hidden pb-4" : "hidden md:flex flex-1 max-w-lg mx-8";

  return (
    <div className={containerClasses}>
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};
