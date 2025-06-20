'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import StickyNavbar from '@/components/navbar';
import InlineLoader from '@/components/InlineLoader';
import NoBlogsFound from '@/components/NoBlogFound';
import FormNeeded from '@/components/form-needed';
import ToastSuccess from '@/components/ToastSuccess';

type BlogPost = {
    id: string;
    title: string;
    coverImage: string;
    author: string;
    body: string;
};

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

  
type UserAsset = {
        name: string;
        mail: string;
        mobile: string;
        item: string;
    };

export default function EditPostPage() {
    const { id } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [post, setPost] = useState<BlogPost | null>(null);

    const [errors, setErrors] = useState<string[]>([]);

    // Form state
    const [title, setTitle] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('');
    const [asset, setAsset] = useState<UserAsset | null>(null);
    const [loader, setLoader] = useState(true)
    const [submit, setSubmit] = useState(false)
    const [showToast, setShowToast] = useState({stat:false, color:'', message:''})

    
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
            // router.push("/login")
        }
    }, []);


    useEffect(() => {
        if (!id) return;

        // Fetch post details by ID
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/posts/${id}`);
                const result = await res.json();
                console.log(result)
                if(result.stat) {
                    setPost(result.data);

                    setTitle(result?.data.meta.name);
                    setCoverImage(result?.data?.wall?.link);
                    //setAuthor(result?.data.author);
                    setCategory(result?.data?.feat?.sort)
                    setBody(result?.data?.meta?.memo);
                }

            } catch (err) {
                // setError('Failed to fetch post.');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const validate = () => {
        const errs: string[] = [];

        if (!title.trim()) errs.push('Title is required.');
        if (coverImage != '') {
            try {
                new URL(coverImage);
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

    const handleSubmit = async () => {
    
        setError('');

        const validationErrors = validate();

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }


        if (!title  || !categories || !body) {
            setError('All fields are required.');
            return;
        }

        setSubmit(true)
        try {

            var slug = generateSlug(title)
            var datx = {
                item: id,
                actv: true,
                name:title,
                banner:coverImage,
                user: {name: asset?.name, mail: asset?.mail , item: asset?.item, mobile: asset?.mobile  },
                memo:body,
                slug:slug,
                category: category
            }

            const res = await fetch(`/api/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: datx }),
            });

            const result = await res.json();
            // console.log(result)
            if (result.success) {
                setSubmit(false)
                setShowToast({stat:true, color: 'green', message:'Success: Post Edited' })
            } else {
                setSubmit(false)
                setShowToast({stat:true, color:'red', message:'Error: Error while Updating Post. Try again' })
                setError(result.message || 'Failed to update post.');
            }
        } catch (err) {
            setError('Something went wrong.');
        }
    };

    const handleDelete = async () => {

        setError('');
        setSubmit(true)
        try {
            var slug = generateSlug(title)
            var datx = {
                item: id,
                actv: false,
                name:title,
                banner:coverImage,
                user: {name: asset?.name, mail: asset?.mail , item: asset?.item, mobile: asset?.mobile  },
                memo:body,
                slug:slug,
                category: category
            }
            const res = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: datx }),
            });

            const result = await res.json();
            if (result.success) {
                setSubmit(false)
                setShowToast({stat:true, color:'green', message:'Success: Post Deleted' })
                router.push("/")
            } else {
                setShowToast({stat:true, color:'red', message:'Error: Error while Updating Post. Try again' })
                setError(result.message || 'Failed to update post.');
            }
        } catch (err) {
            setError('Something went wrong.');
        }
    };




    //   if (loading) return <p className="text-center mt-20">Loading...</p>;

    return (
        <div>
            <StickyNavbar />

            {loading && <div className='mt-5'> <InlineLoader /> </div>}

            {!loading && !post && <div className='mt-5'> <NoBlogsFound /></div>}
            {
                !loading && post &&
                <div className="max-w-3xl mx-auto px-4 py-10 border mt-2 rounded">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Blog Post</h1>

                    {errors.length > 0 && (
                    <div className="mb-6 bg-red-100 border border-red-300 text-red-700 rounded-lg p-4 space-y-1 text-sm">
                        {errors.map((err, idx) => (
                            <p key={idx}>⚠️ {err}</p>
                        ))}
                    </div>
                     )}

                    <div  className="space-y-5">
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title <FormNeeded /></label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                            <input
                                type="text"
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description <FormNeeded /></label>
                            <textarea
                                rows={6}
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {showToast.stat && <ToastSuccess message={showToast.message} color = {showToast.color} />}
                        
                        {submit && <div><InlineLoader/></div>}
                        
                        <div className='flex'>
                        
                        <button
                            onClick={()=> handleDelete()}
                            disabled={submit}
                            type="submit"
                            className="text-end me-auto bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
                        >
                            Delete Post
                        </button>
                        
                        <button
                            onClick={()=> handleSubmit()}
                            disabled={submit}
                            type="submit"
                            className="text-end bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Update Post
                        </button>
                        </div>
                    </div>
                </div>
            }

        </div>
    );
}
