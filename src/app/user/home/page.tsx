'use client';

import StickyNavbar from '@/components/navbar';
import SearchInput from '@/components/SearchInput';
import { useState } from 'react';

const categories = [
  'All',
  'Technology',
  'Health & Fitness',
  'Travel',
  'Finance',
  'Fashion & Beauty',
  'Food & Cooking',
  'Education',
  'Business & Marketing',
  'Parenting',
  'DIY & Crafts',
  'Gaming',
  'Entertainment',
  'Photography',
  'Spirituality/Religion',
  'Political/Opinion',
];

const blogPosts = [
  {
    id: 1,
    title: 'Understanding React Server Components',
    excerpt: 'Server Components are a new way to build React apps efficiently...',
    category: 'Technology',
    image: '/u1.jpg',
  },
  {
    id: 2,
    title: 'Tailwind CSS Best Practices',
    excerpt: 'Write cleaner and more scalable styles using utility classes...',
    category: 'Fashion & Beauty',
    image: '/u2.jpg',
  },
  {
    id: 3,
    title: 'Next.js 14 App Router',
    excerpt: 'Explore the new App Router architecture in Next.js...',
    category: 'Technology',
    // no image
  },
   {
    id: 4,
    title: 'Tailwind CSS Best Practices',
    excerpt: 'Write cleaner and more scalable styles using utility classes...',
    category: 'Fashion & Beauty',
    image: '/u2.jpg',
  },
  {
    id: 5,
    title: 'Next.js 14 App Router',
    excerpt: 'Explore the new App Router architecture in Next.js...',
    category: 'Technology',
    // no image
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <StickyNavbar />

 <div className=" sticky top-19 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-2">
       <div className="  flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-6     ">
            {/* Category filter (50%) */}
            <div className="w-full md:w-1/2 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-2 w-max pr-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-sm rounded-full border whitespace-nowrap ${
                      activeCategory === category
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    } transition`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Search bar (50%) */}
            <div className="w-full md:w-1/3 justify-end text-end">
              <SearchInput onSearch={handleSearch} />
            </div>
          </div>
          </div>
          </div>


      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-6">

          {/* Blog Cards */}
          <div className="space-y-6 overflow-y">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className={`flex flex-col ${
                  post.image ? 'md:flex-row' : ''
                } bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition group`}
              >
                {/* Image */}
                {post.image && (
                  <div className="relative w-full md:w-48 h-40 mb-4 md:mb-0 md:mr-5 rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="mb-1 text-sm text-blue-600 font-medium">{post.category}</div>
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.excerpt}</p>
                  </div>

                  <div className="mt-4 flex justify-between text-xs text-gray-500">
                    <span>By Admin</span>
                    <div className="flex gap-4">
                      <span>💬 12</span>
                      <span>❤️ 34</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="text-center text-gray-500 mt-10">No posts found for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
}
