import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Comment = ({ comment }) => {
    return (
        <div className='my-2'>
            <div className='flex gap-3 items-center'>
                <Avatar className='h-8 w-8 ring-2 ring-offset-2 ring-blue-500'>
                    <AvatarImage src={comment?.author?.profile?.profilePhoto} alt={comment?.author?.fullname} />
                    <AvatarFallback className='bg-gradient-to-br from-blue-400 to-purple-400 text-white'>
                        {comment?.author?.fullname?.split(' ').map(name => name[0]).join('')}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h1 className='font-bold text-sm'>
                        {comment?.author?.fullname}
                        <span className='font-normal text-gray-600 pl-2'>{comment?.text}</span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Comment