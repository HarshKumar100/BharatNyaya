import React from 'react'
import Feed from './Feed'
import Navbar from './shared/Navbar'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers"
import { motion } from 'framer-motion'
import { Briefcase, Scale, Users, Bell } from 'lucide-react'

const Home = () => {
    useGetAllPost();
    useGetSuggestedUsers();
    
    return (
        <div className="min-h-screen bg-[#F3F1EC]">
            {/* Professional Navbar */}
            <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
                <Navbar />
            </div>

            {/* Main Content */}
            <div className="flex pt-16 px-4 lg:px-8 max-w-8xl mx-auto">
                {/* Left Sidebar */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden lg:block w-64 fixed left-8 top-20 bg-white rounded-xl shadow-sm p-4 border border-gray-200"
                >
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 px-4">Quick Access</h2>
                        
                        <nav className="space-y-1">
                            <a href="/cases" className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200">
                                <Briefcase className="w-5 h-5 mr-3" />
                                <span>Active Cases</span>
                            </a>
                            <a href="/consultations" className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200">
                                <Scale className="w-5 h-5 mr-3" />
                                <span>Consultations</span>
                            </a>
                            <a href="/network" className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200">
                                <Users className="w-5 h-5 mr-3" />
                                <span>Legal Network</span>
                            </a>
                        </nav>

                        <div className="border-t border-gray-200 pt-4">
                            <h3 className="text-sm font-medium text-gray-900 px-4 mb-3">Recent Updates</h3>
                            <div className="space-y-3">
                                {/* Recent Updates Items */}
                                <div className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                    <p className="text-sm text-gray-600">New case document uploaded</p>
                                    <p className="text-xs text-gray-400">2 hours ago</p>
                                </div>
                                <div className="px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                    <p className="text-sm text-gray-600">Consultation scheduled</p>
                                    <p className="text-xs text-gray-400">5 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Feed Area */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 lg:ml-64 lg:mr-80 min-h-screen"
                >
                    <div className="max-w-3xl mx-auto py-6">
                        {/* Feed Container */}
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl border-2 border-gray-900 p-6">
                                <h1 className="text-2xl font-semibold text-gray-900 mb-6">Legal Feed</h1>
                                <div className="space-y-8">
                    <Feed />
                                </div>
                            </div>
                    <Outlet />
                </div>
                    </div>
                </motion.div>

                {/* Enhanced Right Sidebar */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden xl:block w-72 fixed right-8 top-20"
                >
                    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
                            <Bell className="w-5 h-5 text-gray-500" />
                        </div>
                        <div className="space-y-4">
                            {/* Notification Items */}
                            <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                                <div>
                                    <p className="text-sm text-gray-800">New case update available</p>
                                    <p className="text-xs text-gray-500">10 minutes ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-xl">
                <RightSidebar />
            </div>
                </motion.div>
            </div>

            {/* Add custom styles for posts */}
            <style jsx>{`
                /* Target individual posts within the Feed component */
                .post-item {
                    @apply bg-white rounded-xl border-2 border-gray-900 p-6 mb-6 transition-all duration-300 hover:shadow-lg;
                }
            `}</style>
        </div>
    )
}

export default Home