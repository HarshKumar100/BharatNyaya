import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminLawyersTable from "./AdminLawyersTable";
import useGetAllAdminLawyers from "@/hooks/useGetAllAdminLawyers";
import { setSearchLawyerByText } from "@/redux/lawyerSlice";
import { Search, Filter, Users, PlusCircle, Bell, Briefcase, Award, Calendar, ChevronRight } from "lucide-react";

const AdminLawyers = () => {
  useGetAllAdminLawyers();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchLawyerByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Enhanced Hero Section with Background Image */}
      <div className="relative w-full h-[450px] flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.6)), url('https://eu-images.contentstack.com/v3/assets/bltdd43779342bd9107/blt2fc43477abf0ad38/638f7bb854473f36bc018fa1/1216H1-2882A-1540x800.jpg')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        
        {/* Hero Content with enhanced styling */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-6">
            Legal Professional Platform
          </div>
          <h1 className="text-5xl font-bold mb-6 text-white leading-tight">
            Connecting Excellence in <span className="text-blue-400">Legal Practice</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Manage our network of qualified legal professionals and expand your firm's capabilities
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              onClick={() => navigate("/admin/lawyers/create")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium text-base transition-all duration-150 flex items-center gap-2"
            >
              <PlusCircle className="h-5 w-5" />
              <span>Add New Lawyer</span>
            </Button>
            <Button 
              className="bg-white hover:bg-gray-100 text-blue-700 px-6 py-3 rounded-md font-medium text-base"
            >
              View Directory
            </Button>
          </div>
        </div>
      </div>
      
      {/* Added padding below hero section */}
      <div className="pb-12"></div>
      
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 -mt-24 pb-16 p-10">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 border border-gray-100">
          {/* Enhanced Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white p-4 rounded-xl shadow-md">
                <Users className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Legal Directory</h2>
                <p className="text-gray-600 mt-1 text-lg">
                  Manage your network of legal professionals
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  3
                </div>
                <Button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
              <Button
                onClick={() => navigate("/admin/lawyers/create")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium transition-all duration-150 flex items-center gap-2"
              >
                <span>+ Add New Lawyer</span>
              </Button>
            </div>
          </div>

          {/* Enhanced Search & Filter Bar */}
          <div className="mb-10">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    className="w-full pl-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    placeholder="Search by name, specialty, or registration number..."
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                  />
                </div>
                <div className="flex gap-3">
                  <Button className="bg-white hover:bg-gray-100 text-gray-700 px-5 py-2 border border-gray-300 rounded-md font-medium flex items-center gap-2 shadow-sm">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium shadow-sm">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Table with Enhanced Styling */}
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-8">
            <AdminLawyersTable />
          </div>
          
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-6 px-2">
            <p className="text-gray-600">Showing 1-10 of 287 lawyers</p>
            <div className="flex gap-2">
              <Button className="bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 border border-gray-300 rounded-md font-medium">
                Previous
              </Button>
              <Button className="bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 border border-blue-200 rounded-md font-medium">
                Next
              </Button>
            </div>
          </div>
        </div>
        
        {/* Statistics Cards - Enhanced with icons */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Lawyers</h3>
                <p className="text-3xl font-bold text-gray-800">287</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600 font-medium">
              +12% from last month
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-600 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Active Lawyers</h3>
                <p className="text-3xl font-bold text-gray-800">243</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600 font-medium">
              92% active rate
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-600 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Practice Areas</h3>
                <p className="text-3xl font-bold text-gray-800">18</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-purple-600 font-medium">
              Full coverage of legal fields
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-600 hover:shadow-lg transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">New This Month</h3>
                <p className="text-3xl font-bold text-gray-800">12</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-lg">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-amber-600 font-medium">
              4 pending verification
            </div>
          </div>
        </div>
        
        {/* Quick Access Cards - Enhanced with gradients */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
            <div className="bg-white rounded-full p-3 inline-block shadow-sm mb-6">
              <div className="bg-blue-600 rounded-full p-2">
                <Users className="h-5 w-5 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Verification Queue</h3>
            <p className="text-gray-600 mb-6">
              Review and approve pending lawyer verification requests in the system.
            </p>
            <Button className="bg-white text-blue-700 hover:bg-gray-50 px-5 py-2 rounded-md font-medium shadow-sm flex items-center justify-between w-full">
              <span>View Queue</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
            <div className="bg-white rounded-full p-3 inline-block shadow-sm mb-6">
              <div className="bg-green-600 rounded-full p-2">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Directory Settings</h3>
            <p className="text-gray-600 mb-6">
              Manage practice areas, certifications and other directory metadata.
            </p>
            <Button className="bg-white text-green-700 hover:bg-gray-50 px-5 py-2 rounded-md font-medium shadow-sm flex items-center justify-between w-full">
              <span>Configure</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
            <div className="bg-white rounded-full p-3 inline-block shadow-sm mb-6">
              <div className="bg-purple-600 rounded-full p-2">
                <Award className="h-5 w-5 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Export Data</h3>
            <p className="text-gray-600 mb-6">
              Generate comprehensive reports and export lawyer directory data.
            </p>
            <Button className="bg-white text-purple-700 hover:bg-gray-50 px-5 py-2 rounded-md font-medium shadow-sm flex items-center justify-between w-full">
              <span>Export</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLawyers;