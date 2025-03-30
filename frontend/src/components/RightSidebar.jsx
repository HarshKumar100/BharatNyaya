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
              <Avatar className="h-10 w-10 ring-2 ring-offset-2 ring-gray-200">
                <AvatarImage 
                  src={user?.profile?.profilePhoto} 
                  alt={user?.fullname}
                  className="object-cover" 
                />
                <AvatarFallback className='bg-gradient-to-br from-blue-400 to-purple-400 text-white'>
                  {user?.fullname?.split(' ').map(name => name[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link 
                to={`/profile/${user?._id}`}
                className="hover:text-blue-600 transition-colors"
              >
                <h1 className='font-semibold text-sm'>{user?.fullname}</h1>
              </Link>
              <div className='text-xs space-y-0.5'>
                <p className='text-gray-500'>{user?.email}</p>
                <p className='text-gray-600'>{user?.role === 'lawyer' ? 'Lawyer' : 'Lawyer Seeker'}</p>
              </div>
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