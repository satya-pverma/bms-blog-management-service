
'use client'

import React, { useEffect, useRef, useState } from 'react'

type CommentItem = {
  sender: string;
  text: string;
};

type CommentBoxProps = {
  list: CommentItem[];
  id: string
};

    
    type UserAsset = {
        name: string;
        mail: string;
        mobile: string;
        item: string;
    };


const CommentBox = ({id, list }: CommentBoxProps) => {


    const [asset, setAsset] = useState<UserAsset | null>(null);
    const [comment, setComment] = useState('')

    const [commentArray, setCommentArray] = useState(list)
    const [submit, setSubmit] = useState(false)
    const [loader, setLoader] = useState(false)
    const [showToast, setShowToast] = useState({stat:false,color:'', message:''})
    const scrollRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        
        const raw = localStorage.getItem("indx");
        const auth = raw ? JSON.parse(raw) : null;
        //   console.log(auth);
        setAsset(auth);
    }, []);



const AddComment = async()=>{
    setLoader(true)
    setSubmit(true)
    var datx = {item: id, text:comment, sender: asset?.name || 'anonymous' }
     const res = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datx),
      });

      const result = await res.json();
    //   console.log(result)

      if (!res.ok) {
        setLoader(false)
        setSubmit(false)
        setShowToast({stat:true, color:'red', message:'Error: Error while Posting Comment. Try again' })
        // setErrors(result.message || "Something went wrong.");
        return;
      }
      setCommentArray((prev)=> [...prev, datx])
      setShowToast({stat:true, color: 'green', message:'Success: Comment Posted' })
       setSubmit(false)
       setComment('')
    // //    alert("Registration successful!");
    //    router.push("/")
}

// console.log(commentArray)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [commentArray]);






  return (
    <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-5">Comments</h2>

            {/* Comments List */}
            {/* <div className="space-y-6 max-h-72 overflow-y-auto pr-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                    U{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-gray-800">User {i + 1}</p>
                      <span className="text-xs text-gray-400">
                        
                        {new Date().toDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-snug">
                      This is a sample comment content for display purposes.
                    </p>
                  </div>
                </div>
              ))}
            </div> */}

        <div ref={scrollRef} className="space-y-6 max-h-72 overflow-y-auto pr-1 scrollbar-hide">
              {commentArray.map((item: { sender: string; text: string }, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                    {'U'}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-gray-800">{item?.sender}</p>
                    </div>
                    <p className="text-sm text-gray-700 leading-snug">
                      {item?.text}
                    </p>
                  </div>
                </div>
              ))}
            </div> 
            

            {/* Add Comment */}
            <div className="space-y-3 mt-6">
              <textarea
                value={comment}
                onChange={(e)=> setComment(e.target.value)}
                rows={3}
                placeholder="Write your comment..."
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                disabled={submit}
                onClick={()=> AddComment()}
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold transition 
             hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                
              >
                {loader ? 'Posting...':'Post Comment'}
              </button>
            </div>
          </div>
        </div>
  )
}

export default CommentBox