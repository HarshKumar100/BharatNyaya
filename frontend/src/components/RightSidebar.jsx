import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import SuggestedUsers from './SuggestedUsers';

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);
  return (
    <div className="fixed top-20 right-0 mr-8">
      <div className="w-72 bg-white rounded-lg shadow-md border-2 border-gray-200/60 p-4 hover:shadow-lg transition-shadow">
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Link to={`/profile/${user?._id}`} className="transition-transform hover:scale-105">
              <Avatar className="ring-2 ring-transparent hover:ring-blue-200">
                <AvatarImage src={user?.profilePicture} alt="post_image" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h1 className='font-semibold text-sm'>
                <Link 
                  to={`/profile/${user?._id}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {user?.username}
                </Link>
              </h1>
              <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
            </div>
          </div>
          <button className="text-sm text-blue-500 font-medium hover:text-blue-600 hover:underline transition-colors">
            Switch
          </button>
        </div>
        <SuggestedUsers />
      </div>
    </div>
  )
}

export default RightSidebar