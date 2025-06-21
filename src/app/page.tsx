import type { Metadata } from 'next';
import Home from '@/components/Home';

// Metadata object
const metadata = {
  name: 'BMS – Modern Blog Management System for Writers & Creators',
  memo: 'BMS is a fast, intuitive, and customizable Blog Management System built for modern content creators. Create, edit, and manage your blog with ease.',
  words: 'Blog Management System, BMS, blog editor, content platform, blogging tool, CMS, Next.js blog',
  banner: {
    link: 'https://media.licdn.com/dms/image/v2/D4D12AQECBAkFnQsKHg/article-cover_image-shrink_423_752/B4DZahzvBsGwAU-/0/1746471416590?e=2147483647&v=beta&t=LrnWNRE5Fcu-mBmo4-CDUmwDWxATP1_P-uCOnRP0KwI',
  },
  media: {
    link: 'https://media.licdn.com/dms/image/v2/D4D12AQECBAkFnQsKHg/article-cover_image-shrink_423_752/B4DZahzvBsGwAU-/0/1746471416590?e=2147483647&v=beta&t=LrnWNRE5Fcu-mBmo4-CDUmwDWxATP1_P-uCOnRP0KwI',
  },
  site: process.env.NEXT_PUBLIC_WEBB_SITE_LINK || 'https://bms-blog-management-service-6bhn.vercel.app',
  created: '2024-09-01T05:00:00.000Z',
  modified: '2024-09-01T06:00:00.000Z',
  domain: 'main',
};

type BlogPost = {
  wall?: {
    link?: string;
  };
  meta?: {
    name?: string;
    memo?: string;
    slug?: string;
  };
  feat?: {
    sort?: string;
  };
  user?: {
    name?: string;
    item?: string;
  };
  crts?: string | number | Date;
  item?: string;
};

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

// Generate metadata server-side
export async function generateMetadata(): Promise<Metadata> {
  // console.log('Generating metadata for homepage', {
  //   mediaLink: metadata.media?.link,
  //   isValid: isValidImageUrl(metadata.media?.link || ''),
  // });
  return {
    title: metadata.name,
    description: metadata.memo,
    keywords: metadata.words,
    openGraph: {
      title: 'BMS – Blog Management System',
      description: 'Create, manage, and publish beautiful blog posts with BMS. Built with performance and simplicity in mind.',
      type: 'website',
      images: metadata.media?.link && isValidImageUrl(metadata.media.link) ? [metadata.media.link] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'BMS – Blog Management System',
      description: 'Power your content with BMS, the modern blog management tool for creators and developers.',
      images: metadata.media?.link && isValidImageUrl(metadata.media.link) ? [metadata.media.link] : [],
    },
  };
}

export default async function Page() {
  const index = '1';
  const items = '10';
  const category = 'All';

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://bms-blog-management-service-6bhn.vercel.app'}/api/posts?index=${index}&items=${items}&category=${category}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Ensure fresh data for SSR
      }
    );

    if (!res.ok) {
      // console.error('Failed to fetch posts:', res.statusText);
      return <Home initialPosts={[]} />;
    }

    const result = await res.json();
    const posts: BlogPost[] = result?.data?.list || [];
    // console.log('Fetched posts for homepage:', posts.length);

    return <Home initialPosts={posts} />;
  } catch (error) {
    // console.error('Error fetching posts for homepage:', error);
    return <Home initialPosts={[]} />;
  }
}