import Home from '@/components/Home';
import type { Metadata } from 'next';


// Metadata object
const metadata = {
  name: 'BMS – Modern Blog Management System for Writers & Creators',
  memo: 'BMS is a fast, intuitive, and customizable Blog Management System built for modern content creators. Create, edit, and manage your blog with ease.',
  words: 'Blog Management System, BMS, blog editor, content platform, blogging tool, CMS, Next.js blog',
  banner: { link: process.env.NEXT_PUBLIC_WEBB_SITE_MEDIA },
  media: { link: process.env.NEXT_PUBLIC_WEBB_SITE_MEDIA },
  site: process.env.NEXT_PUBLIC_WEBB_SITE_LINK,
  created: '2024-09-01T05:00:00.000Z',
  modified: '2024-09-01T06:00:00.000Z',
  domain: 'main',
};

// Generate metadata server-side
export async function generateMetadata(): Promise<Metadata> {
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
    },
  };
}

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

export default function Page() {
  return <Home />;
}