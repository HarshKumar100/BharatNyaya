import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CourtsTable from "./CourtsTable";
import { useNavigate } from "react-router-dom";
import useGetAllCourts from "@/hooks/useGetAllCourts";
import { useDispatch } from "react-redux";
import { setSearchCourtByText } from "@/redux/courtSlice";
import { Search } from "lucide-react";

const Courts = () => {
  const courts = useGetAllCourts();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCourtByText(input));
  }, [input]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section with Professional Background */}
      <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-slate-900">
        {/* Background Image with Proper Overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "url('https://eu-images.contentstack.com/v3/assets/bltdd43779342bd9107/blt2fc43477abf0ad38/638f7bb854473f36bc018fa1/1216H1-2882A-1540x800.jpg')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Comprehensive Court Directory
          </h1>
          <p className="text-lg text-gray-200 mb-8">
            Access an extensive network of courts and legal professionals to support your practice and clients.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => navigate("/admin/courts/create")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
            >
              Your Practice Area
            </Button>
            <Button 
              onClick={() => navigate("/directory")} 
              className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-2 rounded-md font-medium"
            >
              Browse Directory
            </Button>
          </div>
        </div>
      </div>

      {/* Added padding below the hero section */}
      <div className="pb-12"></div>

      {/* Main Content Section - Floating Card Design */}
      <div className="max-w-6xl mx-auto px-4 -mt-16">
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Court Directory</h2>
              <p className="text-gray-600 mt-1">
                Find and connect with courts across jurisdictions
              </p>
            </div>
            <Button
              onClick={() => navigate("/admin/courts/create")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition-all duration-150 flex items-center gap-2"
            >
              <span> Your Practice Area</span>
            </Button>
          </div>

          {/* Enhanced Search Input */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                className="w-full pl-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search courts by name, location, or jurisdiction..."
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
            </div>
          </div>

          {/* Table Section with Enhanced Styling */}
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <CourtsTable courts={courts} />
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Court Access</h3>
            <p className="text-gray-600">
              Find contact information, hours, and accessibility details for all registered courts.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Legal Resources</h3>
            <p className="text-gray-600">
              Access court-specific forms, filing procedures, and jurisdictional guidelines.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Professional Network</h3>
            <p className="text-gray-600">
              Connect with other legal professionals working within these court systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courts;


