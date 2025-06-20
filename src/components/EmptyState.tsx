import Image from 'next/image';

export default function EmptyState({ message = "No posts yet." }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 text-gray-500">
      <div className="w-28 h-28 mb-6 relative">
        <Image
          src="/empty.png" // Replace with your own placeholder image
          alt="No posts"
          fill
          className="object-contain"
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-700">{message}</h2>
      <p className="mt-2 text-sm text-gray-500">New posts will appear here once added.</p>
    </div>
  );
}
