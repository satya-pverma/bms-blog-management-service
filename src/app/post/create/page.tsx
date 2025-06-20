'use client';

import { useEffect, useState } from 'react';
import StickyNavbar from '@/components/navbar';
import { useRouter } from 'next/navigation';
import PlainLoader from '@/components/plain-loader';
import FormNeeded from '@/components/form-needed';
import InlineLoader from '@/components/InlineLoader';
import ToastSuccess from '@/components/ToastSuccess';


const categories = [
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
  "Opinion",
  "Religion"
];

export default function CreateBlogPage() {

    
    type UserAsset = {
        name: string;
        mail: string;
        mobile: string;
        item: string;
    };

    const [title, setTitle] = useState('');
    const [coverUrl, setCoverUrl] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [category, setCategory] = useState('');
    const [asset, setAsset] = useState<UserAsset | null>(null);
    const [loader, setLoader] = useState(true)
    const [submit, setSubmit] = useState(false)

    const [showToast, setShowToast] = useState({stat:false, color:'', message:''})

    const router = useRouter()

    useEffect(() => {
        setLoader(true)
        const raw = localStorage.getItem("indx");
        const auth = raw ? JSON.parse(raw) : null;
        //   console.log(auth);
        setAsset(auth);
        setLoader(false)
        if (auth) {
            //   router.push("/post/create")
        }
        else {
            router.push("/login")
        }
    }, []);

    const validate = () => {
        const errs: string[] = [];

        if (!title.trim()) errs.push('Title is required.');
        if (coverUrl != '') {
            try {
                new URL(coverUrl);
            } catch {
                errs.push('Cover image URL is not valid.');
            }
            // errs.push('Cover image URL is required.');
        } 
        // if (!author.trim()) errs.push('Author name is required.');
        if (!body.trim()) errs.push('Description is required.');
         if (!category.trim()) errs.push('Blog Category is required.');

        return errs;
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')  // Remove non-word characters
            .replace(/\s+/g, '-')      // Replace spaces with hyphens
            .replace(/--+/g, '-')      // Remove duplicate hyphens
            .replace(/^-+|-+$/g, '');  // Trim hyphens from ends
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSubmit(true)

        setErrors([]);
        var slug = generateSlug(title)
        var datx = {
            name:title,
            banner:coverUrl,
            user: {name: asset?.name, mail: asset?.mail , item: asset?.item, mobile: asset?.mobile  },
            memo:body,
            slug:slug,
            category: category
        }

        const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({data:datx}),
      });

      const result = await res.json();

      if (!res.ok) {
        setLoader(false)
        setSubmit(false)
        setShowToast({stat:true, color:'red', message:'Error: Error while Updating Post. Try again' })
        setErrors(result.message || "Something went wrong.");
        return;
      }
       setShowToast({stat:true, color: 'green', message:'Success: Post Created' })
       setSubmit(false)
    //    alert("Registration successful!");
       router.push("/")
    };

    return (
        <div className="min-h-screen bg-gray-50 mb-5">
            <StickyNavbar />
            {
                loader ?
                    <PlainLoader />
                    :
                    <></>
            }

            <div className="max-w-3xl mx-auto px-6 py-10 border rounded-lg bg-white mt-2">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Blog</h1>

                {errors.length > 0 && (
                    <div className="mb-6 bg-red-100 border border-red-300 text-red-700 rounded-lg p-4 space-y-1 text-sm">
                        {errors.map((err, idx) => (
                            <p key={idx}>⚠️ {err}</p>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title <FormNeeded /></label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog title"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                        <input
                            type="text"
                            value={coverUrl}
                            onChange={(e) => setCoverUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category <FormNeeded /></label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description <FormNeeded/></label>
                        <textarea
                            rows={8}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Write your blog here..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    {submit && <InlineLoader />}
                    {showToast.stat && <ToastSuccess message={showToast.message} color = {showToast.color} />}
                    

                    <button
                        disabled={loader || submit}
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold transition 
             hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        Publish Blog
                    </button>
                </form>
            </div>
        </div>
    );
}
