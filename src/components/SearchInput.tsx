'use client';

import { useState } from 'react';
import { Search } from 'lucide-react'; // optional, install lucide-react or use any icon lib

export default function SearchInput({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blog posts..."
        className="w-full pl-10 pr-4 py-2 border bg-white border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="absolute left-3 top-2.5 text-gray-400 hover:text-blue-600">
        <Search size={18} />
      </button>
    </form>
  );
}
