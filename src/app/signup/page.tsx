'use client';
import FadedLoader from "@/components/faded-loader";
import FormNeeded from "@/components/form-needed";
import InlineLoader from "@/components/InlineLoader";
import PlainLoader from "@/components/plain-loader";
import ToastSuccess from "@/components/ToastSuccess";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Signup() {


  const router = useRouter()

  const [Loader, setLoader] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile, setProfile] = useState<File | null>(null);
  const [error, setError] = useState("");
      const [showToast, setShowToast] = useState({stat:false, color:'', message:''})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !mobile || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoader(true)
    setSubmit(true)
    try {
      const formData = {
        name,
        mail: email,
        mobile,
        password,
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        setLoader(false)
      setSubmit(false)
        setShowToast({stat:true, color:'red', message:'Error: Error while Creating Account. Try again' })
        setError(result.message || "Something went wrong.");
        return;
      }
       setShowToast({stat:true, color: 'green', message:'Success : Registration successful!' })

       setLoader(false)
       setSubmit(false)
      // alert("Registration successful!");
       router.push("/login")

      // Optional: redirect or clear form
    } catch (err) {
      //console.error(err);
      setError("Failed to register user.");
      setLoader(false)
      setSubmit(false)
    }

  };



  return (
    <div
      className="relative min-h-screen flex bg-cover bg-center font-[family-name:var(--font-geist-sans)]"
      style={{ backgroundImage: "url('/120314.jpg')" }}
    >
      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

      {/* Content layout */}
      <div className="relative z-10 w-full flex flex-col md:flex-row min-h-screen">
        {/* Left side: Welcome text */}
        <div className="w-full md:w-3/4 flex items-center justify-center p-6 sm:p-10">
          <div className="text-white text-center space-y-4">
            <Image
              src="/registernow.png"
              alt="Register illustration"
              width={300}
              height={300}
              className="mx-auto"
            />
            <h2 className="text-4xl font-bold">Join Our Community</h2>
            <p className="text-lg max-w-xl mx-auto">
              Create your account to access exclusive features and stay connected.
            </p>
          </div>
        </div>


        {/* Right side: Signup Card */}
        <div className="w-full md:w-1/4 flex items-center justify-center p-6 bg-white">
          <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md border border-gray-200">
            <div className="mb-6 text-center">

              <Image
                src="/login.png"
                alt="Login illustration"
                width={80}
                height={80}
                className="mx-auto"
              />

              <p className="text-sm text-gray-500 mt-1">Sign up to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name <FormNeeded /></label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address <FormNeeded /></label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile Number <FormNeeded /></label>
                <input
                  type="tel"
                  id="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91XXXXXXXXXX"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password <FormNeeded /></label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password <FormNeeded /></label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* 
              <div>
                <label htmlFor="profile" className="block text-sm font-medium text-gray-700">Profile Photo</label>
                <input
                  type="file"
                  id="profile"
                  accept="image/*"
                  onChange={(e) => setProfile(e.target.files?.[0] || null)}
                  className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                             file:rounded-xl file:border-0 file:text-sm file:font-semibold
                             file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div> */}

              {showToast.stat && <ToastSuccess message={showToast.message} color = {showToast.color} />}
                
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}
              {Loader && <InlineLoader />}
              <button
                disabled={submit || Loader}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold transition 
             hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?
              <Link href="/login" className="text-blue-600 font-medium hover:underline ml-1">
                Sign in
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
