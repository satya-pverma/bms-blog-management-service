import Image from 'next/image';

export default function NoBlogsFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 text-gray-600">
      <Image
        src="/empty.png" // Must start with `/` and match the file name
        alt="No Blogs"
        width={180}
        height={180}
        className="mb-6 rounded-lg"
      />
      <h2 className="text-xl font-semibold">No Blogs Found</h2>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        It looks like there are no blog posts in this category or matching your search. Try adjusting your filters.
      </p>
    </div>
  );
}
