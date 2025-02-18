import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar';
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCode, Search, Phone, Video, MoreVertical, Plus, Send } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';

const ChatPage = () => {
    const [textMessage, setTextMessage] = useState("");
    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const { onlineUsers, messages } = useSelector(store => store.chat);
    const dispatch = useDispatch();

    const sendMessageHandler = async (receiverId) => {
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/message/send/${receiverId}`, { textMessage }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setMessages([...messages, res.data.newMessage]));
                setTextMessage("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null));
        }
    },[]);

    return (
        <>
        <Navbar/>
        <div className='flex ml-[16%] h-screen bg-gray-50'>
            <section className='w-full md:w-1/4 bg-white shadow-lg rounded-l-xl my-4 ml-4'>
                <div className='p-6 border-b'>
                    <div className='flex items-center justify-between mb-6'>
                        <div>
                            <h1 className='font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                                Messages
                            </h1>
                            <p className='text-sm text-gray-500'>
                                Welcome back, {user?.fullname}
                            </p>
                        </div>
                        <Avatar className='h-10 w-10 ring-2 ring-offset-2 ring-blue-500'>
                            <AvatarImage src={user?.profile?.profilePhoto} />
                            <AvatarFallback className='bg-gradient-to-br from-blue-400 to-purple-400 text-white'>
                                {user?.fullname?.split(' ').map(name => name[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='relative'>
                        <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                        <Input 
                            placeholder="Search conversations..." 
                            className='pl-10 bg-gray-50 border-gray-200 focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                </div>
                <div className='overflow-y-auto h-[calc(100vh-220px)] px-2'>
                    {suggestedUsers?.map((suggestedUser) => {
                        const isOnline = onlineUsers.includes(suggestedUser?._id);
                        const isSelected = selectedUser?._id === suggestedUser?._id;
                        
                        return (
                            <div 
                                key={suggestedUser._id}
                                onClick={() => dispatch(setSelectedUser(suggestedUser))} 
                                className={`flex items-center p-4 my-2 rounded-xl cursor-pointer transition-all
                                    ${isSelected 
                                        ? 'bg-blue-50 border-blue-200 shadow-sm' 
                                        : 'hover:bg-gray-50 border border-transparent'
                                    }`}
                            >
                                <div className='relative'>
                                    <Avatar className='h-12 w-12 ring-2 ring-offset-2 ring-gray-200'>
                                        <AvatarImage src={suggestedUser?.profile?.profilePhoto} />
                                        <AvatarFallback className='bg-gradient-to-br from-blue-400 to-purple-400 text-white'>
                                            {suggestedUser?.fullname?.split(' ').map(name => name[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    {isOnline && (
                                        <span className='absolute bottom-0 right-0 h-3.5 w-3.5 bg-green-500 rounded-full ring-2 ring-white'></span>
                                    )}
                                </div>
                                <div className='ml-4 flex-1'>
                                    <h3 className='font-semibold text-gray-900'>{suggestedUser?.fullname}</h3>
                                    <p className='text-xs text-gray-500'>{suggestedUser?.role === 'lawyer' ? 'Lawyer' : 'Lawyer Seeker'}</p>
                                    <p className={`text-sm ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                                        {isOnline ? 'Active now' : 'Offline'}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>

            {selectedUser ? (
                <section className='flex-1 flex flex-col bg-white shadow-lg rounded-r-xl my-4 mr-4 ml-2'>
                    <div className='flex justify-between items-center px-6 py-4 border-b'>
                        <div className='flex items-center'>
                            <Avatar className='h-10 w-10 ring-2 ring-offset-2 ring-blue-500'>
                                <AvatarImage src={selectedUser?.profile?.profilePhoto} alt='profile' />
                                <AvatarFallback className='bg-gradient-to-br from-blue-400 to-purple-400 text-white'>
                                    {selectedUser?.fullname 
                                        ? selectedUser.fullname.split(' ').map(name => name[0]).join('')
                                        : ''}
                                </AvatarFallback>
                            </Avatar>
                            <div className='ml-4'>
                                <h3 className='font-semibold text-gray-900'>{selectedUser?.fullname}</h3>
                                <p className='text-xs text-gray-500'>{selectedUser?.role === 'lawyer' ? 'Lawyer' : 'Lawyer Seeker'}</p>
                                <p className={`text-sm ${onlineUsers.includes(selectedUser?._id) ? 'text-green-600' : 'text-gray-500'}`}>
                                    {onlineUsers.includes(selectedUser?._id) ? 'Active now' : 'Offline'}
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Button variant="ghost" size="icon" className='rounded-full hover:bg-gray-100'>
                                <Phone className='h-5 w-5 text-gray-600' />
                            </Button>
                            <Button variant="ghost" size="icon" className='rounded-full hover:bg-gray-100'>
                                <Video className='h-5 w-5 text-gray-600' />
                            </Button>
                            <Button variant="ghost" size="icon" className='rounded-full hover:bg-gray-100'>
                                <MoreVertical className='h-5 w-5 text-gray-600' />
                            </Button>
                        </div>
                    </div>

                    <Messages selectedUser={selectedUser} className="flex-1 px-4 py-2" />

                    <div className='p-4 border-t bg-white rounded-br-xl'>
                        <div className='flex items-center gap-2 bg-gray-50 rounded-2xl p-2 border border-gray-200'>
                            <Button variant="ghost" size="icon" className='rounded-full hover:bg-gray-100'>
                                <Plus className='h-5 w-5 text-gray-600' />
                            </Button>
                            <Input 
                                value={textMessage} 
                                onChange={(e) => setTextMessage(e.target.value)}
                                type="text"
                                placeholder="Type your message..." 
                                className='border-0 focus-visible:ring-0 bg-transparent'
                            />
                            <Button 
                                onClick={() => sendMessageHandler(selectedUser?._id)}
                                className='rounded-full bg-blue-500 hover:bg-blue-600 h-10 w-10 p-0'
                            >
                                <Send className='h-5 w-5' />
                            </Button>
                        </div>
                    </div>
                </section>
            ) : (
                <div className='flex-1 flex flex-col items-center justify-center bg-white shadow-lg rounded-r-xl my-4 mr-4 ml-2'>
                    <div className='p-8 rounded-2xl bg-gray-50 flex flex-col items-center'>
                        <MessageCircleCode className='w-32 h-32 text-blue-500 mb-6' />
                        <h1 className='font-bold text-2xl mb-2 text-gray-900'>Your Messages</h1>
                        <p className='text-gray-500 text-center'>
                            Select a conversation to start messaging<br/>
                            Your chats are waiting!
                        </p>
                    </div>
                </div>
            )}
        </div>
        </>
    )
}

export default ChatPage