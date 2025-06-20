
import Head from "next/head";
import { notFound } from 'next/navigation';
import Image from 'next/image';
import StickyNavbar from '@/components/navbar';
import EmptyState from '@/components/EmptyState';
import NoBlogsFound from '@/components/NoBlogFound';

type Props = {
    params: {
        slug: string;
    };
};

// /app/post/[slug]/page.tsx



export default async function PostDetailsPage({ params }: Props) {

    const res = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-zigdt/endpoint/blog/details', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer YOUR_API_KEY',
        },
        body: JSON.stringify({
            data: { slug: params.slug },
            srvc: '',
        }),
        next: { revalidate: 10 }, // ISR: Regenerate every 10 seconds
    });

    const result = await res.json();

    console.log(result.data)

    if (!result?.stat) return <NoBlogsFound />;


    const post = result.data;

    return (
        <>

            <Head>
                <title>{`${post?.meta?.name} • ${post?.feta?.sort} • ${post?.user?.name} • BMS - Blog Management System`}</title>
                <meta
                    name="description"
                    content={post?.meta?.memo || ''}
                />
                <meta
                    name="keywords"
                    content={post?.meta?.memo}
                />

                <meta property="og:title" content={` ${post?.meta?.name} • ${post?.feta?.sort} • ${post?.user?.name} • BMS - Blog Management System`} />
                <meta
                    property="og:description"
                    content="Create, manage, and publish beautiful blog posts with BMS. Built with performance and simplicity in mind."
                />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={post?.wall?.link} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="BMS – Blog Management System" />
                <meta
                    name="twitter:description"
                    content="Power your content with BMS, the modern blog management tool for creators and developers."
                />
            </Head>



            <div>
  <StickyNavbar />

  {/* Top Banner */}
  <div className="relative max-w-7xl mx-auto px-6 h-48 sm:h-80">
    {post.wall?.link ? (
      <img
        src={post.wall.link}
        alt={post.meta?.name}
        className=" w-full h-full  rounded object-cover"
      />
    ) : (
      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500" />
    )}

    {/* Category Label on Banner */}
    <div className="absolute top-4 left-9 bg-white text-sm font-medium text-blue-600 px-4 py-1 rounded-full shadow">
      {post.feat.sort || 'Uncategorized'}
    </div>
  </div>

  {/* Main 2-column layout */}
  <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
    {/* Left Side: Blog Details */}
    <div className="w-full lg:w-2/3">
      {/* Author and Date */}
      <div className="flex text-sm text-gray-500 mb-1">
       <div> By <span className="font-semibold text-gray-800 me-auto">{post.user?.name || 'Unknown'}</span></div>

         {/* Stats */}
        <div className="  me-5 mx-15 flex flex-wrap gap-6 text-sm text-gray-600 font-medium">
            <span>👍 Likes: 123</span>
            <span>💬 Comments: 18</span>
            <span>👁️ Views: 785</span>
            <span>🔗 Shares: 12</span>
        </div>
      </div>
      <div className="text-xs text-gray-400 mb-6">
        Published on {new Date(post.crts).toLocaleDateString()} at{' '}
        {new Date(post.crts).toLocaleTimeString()}
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.meta.name}</h1>

      {/* Description */}
      {/* <p className="text-gray-600 text-lg mb-6">{post.meta.memo}</p> */}

      {/* Body */}
      <article className="prose prose-lg max-w-none text-gray-800">
        {post.meta?.memo.split('\n\n').map((para: string, i: number) => (
          <p key={i}>{para}</p>
        )) || <p>No content available.</p>}
      </article>

     
    </div>

 {/* Right Side: Comments */}
<div className="w-full lg:w-1/3 space-y-6">
  <div className="bg-white p-6 rounded-2xl shadow-md">
    <h2 className="text-xl font-semibold text-gray-900 mb-5">Comments</h2>

    {/* Comments List */}
    <div className="space-y-6 max-h-72 overflow-y-auto pr-1">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
            U{i + 1}
          </div>

          {/* Comment Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-800">User {i + 1}</p>
              <span className="text-xs text-gray-400">
                {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-snug">
              This is a well-thought-out comment discussing the blog content clearly and respectfully.
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Divider */}
    <div className="my-6 border-t border-gray-200" />

    {/* Add Comment */}
    <form className="space-y-3">
      <textarea
        rows={3}
        placeholder="Write your comment..."
        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Post Comment
      </button>
    </form>
  </div>
</div>






  </div>
</div>







        </>
    );
}


export async function generateStaticParams() {
    const res = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-zigdt/endpoint/slug/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: '',
        },
        body: JSON.stringify({ actv: true }),
    });

    const result = await res.json();
    //   console.log(result)
    return result?.data?.list?.map((post: any) => ({
        slug: post.meta?.slug,
    })) || [];
}


