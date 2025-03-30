import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send, Heart } from 'lucide-react'
import { Button } from './ui/button'
import { setSelectedUser } from '@/redux/authSlice';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Badge } from './ui/badge'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const { onlineUsers } = useSelector(store => store.chat);
    const { posts } = useSelector(store => store.post);
    const [localLikes, setLocalLikes] = useState(post.likes || []);
    const [isLiking, setIsLiking] = useState(false);
    const [comment, setComment] = useState(post.comments);
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    }

    const handleLikeClick = async () => {
        if (isLiking) return;
        
        try {
            setIsLiking(true);
            
            const newLikes = localLikes.includes(user?._id)
                ? localLikes.filter(id => id !== user?._id)
                : [...localLikes, user?._id];
            
            setLocalLikes(newLikes);
            
            const endpoint = localLikes.includes(user?._id) ? 'dislike' : 'like';
            
            const res = await axios.get(`http://localhost:8080/api/v1/post/${post._id}/${endpoint}`, {
                withCredentials: true
            });

            if (res.data.success) {
                const updatedPosts = posts.map(p => 
                    p._id === post._id ? { ...p, likes: res.data.post.likes } : p
                );
                dispatch(setPosts(updatedPosts));
            } else {
                setLocalLikes(post.likes || []);
                toast.error("Failed to update like status");
            }
        } catch (error) {
            console.error('Like error:', error);
            setLocalLikes(post.likes || []);
            toast.error(error.response?.data?.message || "Failed to update like");
        } finally {
            setIsLiking(false);
        }
    };

    const commentHandler = async () => {
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/post/${post._id}/comment`, { text }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(res.data);
            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);

                const updatedPostData = posts.map(p =>
                    p._id === post._id ? { ...p, comments: updatedCommentData } : p
                );

                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                setText("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deletePostHandler = async () => {
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/post/delete/${post?._id}`, { withCredentials: true })
            if (res.data.success) {
                const updatedPostData = posts.filter((postItem) => postItem?._id !== post?._id);
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.messsage);
        }
    }

    const bookmarkHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/post/${post?._id}/bookmark`, {withCredentials:true});
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleCommentClick = () => {
        dispatch(setSelectedPost(post));
        setOpen(true);
    };

    return (
        <div className='bg-white rounded-lg shadow-sm p-3 my-3 max-w-[500px] mx-auto'>
            <div className='flex items-center justify-between mb-3'>
                <div className='flex items-center gap-2'>
                    <Avatar className='h-8 w-8 ring-1 ring-offset-1 ring-blue-400'>
                        <AvatarImage src={post?.author?.profile?.profilePhoto} />
                        <AvatarFallback className='bg-gradient-to-br from-blue-400 to-purple-400 text-white text-xs'>
                            {post?.author?.fullname?.split(' ').map(name => name[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className='font-semibold'>{post?.author?.fullname}</h3>
                        <p className='text-sm text-gray-500'>
                            {post?.createdAt ? new Date(post.createdAt).toLocaleString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            }) : ''}
                        </p>
                    </div>
                </div>
                {user?._id === post?.author?._id && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={deletePostHandler}>
                        <MoreHorizontal className='h-4 w-4' />
                    </Button>
                )}
            </div>

            <div className='relative group'>
                <img
                    className='rounded-md w-full max-h-[400px] object-cover transition-transform duration-200 hover:scale-[0.99]'
                    src={post.image}
                    alt="post_img"
                />
                <div className='absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-md' />
            </div>

            <div className='flex items-center justify-between my-2 px-1'>
                <div className='flex items-center gap-3'>
                    <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleLikeClick}
                        disabled={isLiking}
                        className="flex items-center gap-2 p-0"
                    >
                        <Heart 
                            className={`h-6 w-6 ${localLikes.includes(user?._id) ? 'fill-red-500 text-red-500' : ''}`} 
                        />
                        <span>{localLikes.length} likes</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCommentClick}
                        className="flex items-center gap-2 p-0"
                    >
                        <MessageCircle className="h-6 w-6" />
                        <span>{comment.length} comments</span>
                    </Button>
                    <button className='p-1 hover:bg-green-50 rounded-full transition-colors'>
                        <Send className='w-5 h-5 text-gray-700 hover:text-green-600' />
                    </button>
                </div>
                <button onClick={bookmarkHandler} className='p-1 hover:bg-purple-50 rounded-full transition-colors'>
                    <Bookmark className='w-5 h-5 text-gray-700 hover:text-purple-600' />
                </button>
            </div>

            <div className='space-y-1.5 px-1'>
                <p className='text-sm text-gray-800'>
                    <span className='font-semibold mr-1.5'>{post.author?.fullname}</span>
                    {post.caption}
                </p>
                {comment.length > 0 && (
                    <button
                        onClick={handleCommentClick}
                        className='text-xs text-gray-500 hover:text-gray-700 font-medium transition-colors'
                    >
                        View all {comment.length} comments
                    </button>
                )}
            </div>

            <CommentDialog open={open} setOpen={setOpen} />

            <div className='mt-3 flex items-center gap-2 border-t border-gray-100 pt-3'>
                <input
                    type="text"
                    placeholder='Add a comment...'
                    value={text}
                    onChange={changeEventHandler}
                    className='flex-1 px-2.5 py-1 text-xs border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-transparent transition-all'
                />
                {text && (
                    <button 
                        onClick={commentHandler}
                        className='px-3 py-1 bg-purple-500 text-white text-xs font-medium rounded-full hover:bg-purple-600 active:scale-95 transition-all'
                    >
                        Post
                    </button>
                )}
            </div>
        </div>
    )
}

export default Post