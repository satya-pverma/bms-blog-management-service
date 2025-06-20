'use client';

import Image from 'next/image';
import EmptyState from '@/components/EmptyState';
import InlineLoader from '@/components/InlineLoader';
import StickyNavbar from '@/components/navbar';
import SearchInput from '@/components/SearchInput';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type BlogPost = {
  wall?: {
    link?: string; // cover image URL
  };
  meta?: {
    name?: string; // title
    memo?: string; // description/excerpt
    slug?: string;
  };
  feat?: {
    sort?: string; // category/tag
  };
  user?: {
    name?: string; // author
    item?: string;
  };
  crts?: string | number | Date; // created timestamp
  item?: string;
};

type UserAsset = {
  name: string;
  mail: string;
  mobile: string;
  item: string;
};

type Props = {
  initialPosts: BlogPost[];
};

const categories = [
  'All',
  'Technology',
  'Health and Fitness',
  'Travel',
  'Finance',
  'Fashion and Beauty',
  'Food and Cooking',
  'Education',
  'Business and Marketing',
  'Parenting',
  'DIY and Crafts',
  'Gaming',
  'Entertainment',
  'Photography',
  'Spirituality',
  'Political',
  'Opinion',
  'Religion',
];

// Utility function to validate image URL
const isValidImageUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.protocol === 'https:' &&
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(parsedUrl.pathname)
    );
  } catch {
    return false;
  }
};

export default function Home({ initialPosts }: Props) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [index, setIndex] = useState('1');
  const [items, setItems] = useState('10');
  const [asset, setAsset] = useState<UserAsset | null>(null);
  const [loader, setLoader] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [likes, setLikes] = useState<number[]>(initialPosts.map(() => 34));

  const router = useRouter();

  useEffect(() => {
    const raw = localStorage.getItem('indx');
    const auth = raw ? JSON.parse(raw) : null;
    setAsset(auth);
  }, []);

  useEffect(() => {
    if (activeCategory === 'All' && index === '1' && items === '10') {
      // Use initialPosts for default state to avoid refetching
      setPosts(initialPosts);
      setLikes(initialPosts.map(() => 34));
      setLoader(false);
      return;
    }

    setLoader(true);
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/posts?index=${index}&items=${items}&category=${activeCategory}`
        );
        if (!res.ok) {
          console.error('Failed to fetch posts:', res.statusText);
          setPosts([]);
          setLikes([]);
          setLoader(false);
          return;
        }
        const result = await res.json();
        if (!result?.data?.list) {
          console.error('No posts found in API response');
          setPosts([]);
          setLikes([]);
        } else {
          setPosts(result.data.list);
          setLikes(result.data.list.map(() => 34));
        }
        setLoader(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
        setLikes([]);
        setLoader(false);
      }
    };
    fetchPosts();
  }, [activeCategory, index, items]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLike = (index: number) => {
    setLikes((prev) => {
      const updated = [...prev];
      updated[index] = (updated[index] || 0) + 1;
      return updated;
    });
  };

  const handleCreateBlog = async () => {
    if (asset) {
      router.push('/post/create');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <StickyNavbar />

      <div className="sticky top-17 z-50 bg-gray-500">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-6">
            {/* Category filter (50%) */}
            <div className="w-full md:w-1/2 overflow-x-auto scrollbar-hide">
              <div className="flex space-x-2 w-max pr-4 px-3">
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
              <div className="flex">
                <SearchInput onSearch={handleSearch} />
                <button
                  onClick={handleCreateBlog}
                  className="px-4 ms-2 py-2 text-sm rounded-full whitespace-nowrap bg-green-500 text-white font-medium hover:bg-green-600 transition cursor-pointer"
                >
                  Create Blog
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loader && (
        <div className="mt-5">
          <InlineLoader />
        </div>
      )}

      {!loader && posts.length === 0 && (
        <div className="mt-5">
          <EmptyState />
        </div>
      )}

      {!loader && posts.length > 0 && (
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            {/* Blog Cards */}
            <div className="space-y-6 overflow-y">
              {posts.map((post, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    post?.wall?.link ? 'md:flex-row ' : ''
                  } bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition group`}
                >
                  {/* Image */}
                  {post?.wall?.link && isValidImageUrl(post.wall.link) ? (
                    <div className="relative w-full md:w-48 h-40 mb-4 md:mb-0 md:mr-5 rounded-lg overflow-hidden">
                      <Image
                        src={post.wall.link}
                        alt={post.meta?.name || 'Blog post image'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 192px"
                        priority={i < 2} // Prioritize first two images for LCP
                      />
                    </div>
                  ) : null}

                  {/* Content */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">
                        {post?.meta?.name}
                        {asset?.item === post?.user?.item && (
                          <span
                            onClick={() => router.push(`/post/edit/${post?.item}`)}
                            className="mx-5 inline-flex items-center gap-1 text-blue-600 cursor-pointer hover:underline text-sm"
                          >
                            ✏️ Edit
                          </span>
                        )}
                      </h2>
                      <div className="mb-1 text-sm text-yellow-600 font-medium">
                        {post?.feat?.sort}
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                        {post?.meta?.memo}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-between text-xs text-gray-500">
                      <span>Author: {post?.user?.name}</span>
                      <span>
                        <button
                          className="btn rounded-full border cursor-pointer whitespace-nowrap hover:bg-blue-700 transition bg-blue-500 p-3 text-white"
                          onClick={() => router.push(`/post/${post?.meta?.slug}`)}
                        >
                          View Details
                        </button>
                      </span>

                      <div className="flex gap-4 items-center text-gray-600 text-sm">
                        {/* Comment button */}
                        <button
                          onClick={() => router.push(`/post/${post?.meta?.slug}`)}
                          className="flex items-center gap-1 px-3 cursor-pointer py-1 rounded-full bg-gray-50 hover:bg-gray-100 active:scale-95 transition"
                        >
                          <span role="img" aria-label="comments" className="text-lg">
                            💬
                          </span>
                          <span className="font-medium">12</span>
                        </button>

                        {/* Like button */}
                        <button
                          onClick={() => handleLike(i)}
                          className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 hover:bg-red-100 text-red-600 active:scale-95 transition"
                        >
                          <span role="img" aria-label="likes" className="text-lg cursor-pointer">
                            ❤️
                          </span>
                          <span className="font-medium">{likes[i]}</span>
                        </button>

                        {/* Date */}
                        <div className="text-gray-900 text-xs">
                          <div>{post?.crts ? new Date(post.crts).toDateString() : ''}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}