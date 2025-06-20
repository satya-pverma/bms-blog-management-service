'use client';

import FadedLoader from '@/components/faded-loader';
import StickyNavbar from '@/components/navbar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Profile() {


    type UserAsset = {
        name: string;
        mail: string;
        mobile: string;
    };

    const [asset, setAsset] = useState<UserAsset | null>(null);
    const [loader, setLoader] = useState(true)

    const router = useRouter()

    useEffect(() => {
        setLoader(true)
        const raw = localStorage.getItem("indx");
        const auth = raw ? JSON.parse(raw) : null;
        //   console.log(auth);
        if (auth) {
            setAsset(auth);
            setLoader(false)
        }
        else {
            router.push("/")
        }
        setLoader(false)

    }, []);


    const handleLogout = async()=>{
        localStorage.removeItem("indx");
        router.push("/")

    }



    return (
        <div>
            <StickyNavbar />
            {loader ? <FadedLoader /> : <></>}
            <div className='min-h-screen bg-gray-50'>
                <div className='max-w-7xl mx-auto px-6  '>
                    <div className="">
                        {/* Banner */}
                        <div className="bg-blue-900 h-40 relative ">

                            {/* Avatar */}
                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 ">
                                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                                    <Image
                                        src="/avatar.png" // Replace with actual path or user image
                                        alt="User Avatar"
                                        width={80}
                                        height={80}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Profile Details */}
                        <div className="flex-1 mt-16 px-6 max-w-md mx-auto w-full text-center">
                            <h2 className="text-xl font-semibold text-gray-800">{ }</h2>
                            <p className="text-gray-800">{asset?.name}</p>
                            <p className="text-gray-800 mt-1">{asset?.mail}</p>
                            <p className="text-gray-800 mt-1">{asset?.mobile}</p>

                           
                        </div>

                        {/* Logout Button */}

                        <div className="px-6 py-6 mt-auto max-w-md mx-auto w-full">
                            <button
                                onClick={() =>handleLogout() }
                                className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>



                {/* <h6>My Posts</h6> */}



                </div>
            </div>
        </div>
    );
}
