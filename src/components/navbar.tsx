'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const StickyNavbar = () => {
 
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [asset, setAsset] = useState()
  const [loader, setLoader] = useState(true)

useEffect(() => {
  setLoader(true)
  const raw = localStorage.getItem("indx");
  const auth = raw ? JSON.parse(raw) : null;
//   console.log(auth);
  setAsset(auth);
  setLoader(false)
}, []);

//   console.log(asset)


  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm py-3">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo and Menu items */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/bms3.png" // Replace with your logo path
              alt="Logo"
              width={50}
              height={30}
              className="object-contain border-2 border-white shadow-md"
            />
          </Link>

          
        </div>

        {/* Avatar with dropdown */}
        {
          !loader &&  asset &&  <div className="relative" ref={dropdownRef}>
          <button

            onClick= {()=> router.push("/profile")}//{toggleDropdown}
            className="focus:outline-none rounded-full overflow-hidden border border-gray-300 w-10 h-10"
          >
            <Image
                
              src="/avatar.png"
              alt="User avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </button>

          {/* {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-10">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={() => alert('Logging out...')}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )} */}
        </div>
        }

        {
           !loader && !asset && <div>
            <Link
                href="/login"
                className="inline-block px-6 py-2 bg-blue-600 text-white font-medium text-sm rounded-md hover:bg-blue-700 transition"
                >
                Login
            </Link>
            </div>
        }
       
      </div>
    </nav>
  );
};

export default StickyNavbar;
