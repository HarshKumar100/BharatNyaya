import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <>
      <div className="relative min-h-screen">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0" 
          style={{
            backgroundImage: 'url("/src/assets/court.png")', // Update this path to match your image location
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-screen">
          <div className="flex flex-col h-full justify-center items-start max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Professional Legal Solutions for Your Success
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-200 mb-8 max-w-2xl"
            >
              Connect with experienced attorneys, manage cases efficiently, and get the legal representation you deserve.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4"
            >
              <Link to="/register">
                <Button className="bg-[#1a365d] hover:bg-[#2c5282] text-white px-8 py-3 text-lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/about">
                <Button className="bg-[#1a365d] hover:bg-[#2c5282] text-white px-8 py-3 text-lg">
                  Learn More
                </Button>
              </Link>
            </motion.div>

            {/* Features Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
            >
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-3">For Lawyers</h3>
                <p className="text-gray-200">
                  Manage your practice, connect with clients, and grow your legal business.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-3">For Clients</h3>
                <p className="text-gray-200">
                  Find the right attorney, track your cases, and get expert legal advice.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
                <h3 className="text-white text-xl font-semibold mb-3">Secure Platform</h3>
                <p className="text-gray-200">
                  Confidential communication and secure document management.
                </p>
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="max-w-2xl w-full mx-auto mt-16"
            >
              <div className="relative flex items-center border border-gray-300 rounded-full bg-white shadow-lg overflow-hidden">
                <div className="relative">
                  <select 
                    className="px-5 py-4 bg-white text-gray-700 outline-none rounded-l-full appearance-none cursor-pointer border-r"
                    defaultValue=""
                  >
                    <option value="" disabled>Enter Case Type</option>
                    <option value="criminal">Criminal Law</option>
                    <option value="family">Family & Divorce</option>
                    <option value="property">Property Disputes</option>
                    <option value="corporate">Corporate Law</option>
                    <option value="ip">Intellectual Property</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                    ▼
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Select Practice Area"
                  className="w-full px-5 py-4 text-gray-700 outline-none bg-transparent"
                />

                <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-7 py-4 rounded-r-full flex items-center gap-2 hover:from-purple-700 hover:to-indigo-700 transition duration-300">
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust Indicators */}
        {/* <div className="relative z-10 bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#1a365d] mb-4">Trusted by Legal Professionals</h2>
              <p className="text-gray-600">Join thousands of lawyers and clients using our platform</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center"> */}
              {/* Replace these with your actual partner logos */}
              {/* <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-12 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default HeroSection;