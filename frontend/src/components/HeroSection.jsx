import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/lawyerSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchLawyerHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
//         <div className='text-center'>
//             <div className='flex flex-col gap-5 my-10'>
//                 <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>"Your Justice, Our Priority – Find the Best Lawyers Instantly!"</span>
//                 <h1 className='text-5xl font-bold'>Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Best Lawyers & Addvocates</span></h1>
//                 <p>"Find the Best Lawyers for Your Legal Needs – Trusted, Affordable, and Just a Click Away!"</p>
//                 <div className="max-w-2xl mx-auto my-8">
//   <div className="relative flex items-center w-full border border-gray-300 rounded-full bg-white shadow-md overflow-hidden">
    

//     <select className="px-4 py-3 bg-white text-gray-700 border-r outline-none">
//       <option>Enter Case Type</option>
//       <option>Criminal Law</option>
//       <option>Family & Divorce</option>
//       <option>Property Disputes</option>
//       <option>Corporate Law</option>
//       <option>Intellectual Property</option>
//     </select>

    
//     <input
//       type="text"
//       placeholder="Select Practice Area"
//       className="w-full px-4 py- text-gray-700 outline-none bg-transparent"
//     />


//     <button className="bg-purple-600 text-white px-6 py-3 rounded-r-full flex items-center gap-2 hover:bg-purple-700">
//       <Search className="h-5 w-5" />
//       Search
//     </button>

//   </div>
// </div>

//             </div>
//         </div>
<div className="flex flex-col items-center text-center gap-6 my-14 px-6">
      
      {/* Tagline */}
      <span className="px-5 py-2 rounded-full bg-gray-100 text-[#F83002] font-semibold text-sm">
        "Your Justice, Our Priority – Find the Best Lawyers Instantly!"
      </span>

      {/* Heading */}
      <h1 className="text-5xl font-extrabold leading-tight">
        Search, Apply &<br /> Get Your{" "}
        <span className="text-[#6A38C2]">Best Lawyers & Advocates</span>
      </h1>

      {/* Subheading */}
      <p className="text-lg text-gray-600">
        "Find the Best Lawyers for Your Legal Needs – Trusted, Affordable, and Just a Click Away!"
      </p>

      {/* Search Bar */}
      <div className="max-w-2xl w-full">
        <div className="relative flex items-center border border-gray-300 rounded-full bg-white shadow-lg overflow-hidden">

          {/* Case Type Dropdown */}
          <div className="relative">
            <select className="px-5 py-4 bg-white text-gray-700 outline-none rounded-l-full appearance-none cursor-pointer border-r">
              <option>Enter Case Type</option>
              <option>Criminal Law</option>
              <option>Family & Divorce</option>
              <option>Property Disputes</option>
              <option>Corporate Law</option>
              <option>Intellectual Property</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
              ▼
            </div>
          </div>

          {/* Practice Area Input */}
          <input
            type="text"
            placeholder="Select Practice Area"
            className="w-full px-5 py-4 text-gray-700 outline-none bg-transparent"
          />

          {/* Search Button */}
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-7 py-4 rounded-r-full flex items-center gap-2 hover:from-purple-700 hover:to-indigo-700 transition">
            <Search className="h-5 w-5" />
            Search
          </button>

        </div>
      </div>
    </div>
    )
}

export default HeroSection