import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(store => store.auth);
    
    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {suggestedUsers.map((user) => (
                <div key={user._id} className='flex items-center justify-between my-5'>
                    <div className='flex items-center gap-2'>
                        <Link to={`/profile/${user?._id}`}>
                            <Avatar className='h-10 w-10 ring-2 ring-offset-2 ring-gray-200'>
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
                            <Link to={`/profile/${user?._id}`}>
                                <h1 className='font-semibold text-sm hover:underline'>{user?.fullname}</h1>
                            </Link>
                            <div className='text-xs space-y-0.5'>
                                <p className='text-gray-500'>{user?.email}</p>
                                <p className='text-gray-600'>{user?.role === 'lawyer' ? 'Lawyer' : 'Lawyer Seeker'}</p>
                            </div>
                        </div>
                    </div>
                    <span className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>
                        Follow
                    </span>
                </div>
            ))}
        </div>
    )
}

export default SuggestedUsers