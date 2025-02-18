import React from 'react'
import Feed from './Feed'
import Navbar from './shared/Navbar'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers"

const Home = () => {
    useGetAllPost();
    useGetSuggestedUsers();
    
    return (
<div className="min-h-screen bg-[hsl(42,22%,94%)]">
            {/* Fixed Navbar */}
            <div className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200">
                <Navbar />
            </div>

            {/* Main Content with top padding to account for fixed navbar */}
            <div className='flex pt-16'> {/* Add padding-top here */}
                <div className='flex-grow max-w-[calc(100%-300px)]'> {/* Limit width to prevent overlap */}
                    <Feed />
                    <Outlet />
                </div>
                <RightSidebar />
            </div>
        </div>
    )
}

export default Home