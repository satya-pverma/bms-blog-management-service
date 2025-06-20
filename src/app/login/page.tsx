'use client';

import FormNeeded from "@/components/form-needed";
import InlineLoader from "@/components/InlineLoader";
import ToastSuccess from "@/components/ToastSuccess";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const router = useRouter()
  const [Loader, setLoader] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
   const [showToast, setShowToast] = useState({stat:false, color:'', message:''})


  const handleSubmit = async () => {
    // e.preventDefault();
    setError("");

    if ( !email  || !password) {
      setError("Email and Passowrd is Required");
      return;
    }


    setLoader(true)
    setSubmit(true)
    try {
      const formData = {
        mail: email,
        password,
      };

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      //console.log(result.data)
      

      if (!res.ok) {
      setShowToast({stat:true, color:'red', message:'Error: Error while login, Try Again' })
      setError(result.message || "Something went wrong.");
      setLoader(false)
      setSubmit(false)
        return;
      }
      setLoader(false)
      setSubmit(false)
      setShowToast({stat:true, color: 'green', message:'Success : Login successful!' })


      localStorage.setItem("indx", JSON.stringify(result.data))
      setTimeout(()=>{router.push("/")},1500)
      
      
    } catch (err) {
      // console.error(err);
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
        {/* Left side: Carousel / Hero */}
       
        <div className="w-full md:w-3/4 flex items-center justify-center p-6 sm:p-10">
          <div className="text-white text-center space-y-6 ">

             <div className="justify-center text-center items-center space-x-[-10px]  ">
             <Image
                  style={{marginLeft:'auto', marginRight:'auto'}}
                  key={''}
                  src={"/bms3.png"}
                  alt={`User`}
                  width={180}
                  height={180}
                  className="rounded-full border-2 border-white shadow-md "
                />
            </div>
            
            <h2 className="text-4xl font-bold">Welcome to Blog Management System</h2>
            <p className="text-lg max-w-xl mx-auto text-white/90">
              The easiest way to manage your thoughts, Suggestions, Exploration — all in one place.
            </p>

            {/* Avatar group */}
            <div className="flex justify-center items-center space-x-[-10px] mt-4">
              {["/u1.jpg", "/u2.jpg", "/u3.jpg", "/u4.jpg", "/u5.jpg"].map((src, index) => (
                <Image
                  key={index}
                  src={src}
                  alt={`User ${index + 1}`}
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-white shadow-md"
                />
              ))}
              <div className="ml-4 text-sm text-white">
                <p>5,000+ users joined us</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right side: Login Card */}
        <div className="w-full md:w-1/4 flex items-center justify-center p-6 bg-white ">
          <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-md border border-gray-200">
            <div className="mb-6 text-center">
               
              <Image
                src="/login.png"
                alt="Login illustration"
                width={80}
                height={80}
                className="mx-auto"
              />
              <h1 className="text-2xl font-bold text-gray-800 mt-2">Welcome Back 👋</h1>
              <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
            </div>

            <div onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address <FormNeeded />
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  id="email"
                  placeholder="you@example.com"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password <FormNeeded />
                </label>
                <input
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="form-checkbox rounded border-gray-300" />
                  Remember me
                </label>
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              {showToast.stat && <ToastSuccess message={showToast.message} color = {showToast.color} />}
              
              {error && <p className="text-sm text-red-600 text-center">{error}</p>}
              {Loader && <InlineLoader />}
              <button
                onClick={()=> handleSubmit()}
                disabled={submit || Loader}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold transition 
             hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                Sign In
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Don&apos;t have an account?
              <Link href="/signup" className="text-blue-600 font-medium hover:underline ml-1">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
