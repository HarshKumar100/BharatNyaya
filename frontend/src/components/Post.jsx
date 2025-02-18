import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Badge } from './ui/badge'

const Post = ({ post }) => {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post);
    const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
    const [postLike, setPostLike] = useState(post.likes.length);
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

    const likeOrDislikeHandler = async () => {
        try {
            const action = liked ? 'dislike' : 'like';
            const res = await axios.get(`http://localhost:8080/api/v1/post/${post._id}/${action}`, { withCredentials: true });
            console.log(res.data);
            if (res.data.success) {
                const updatedLikes = liked ? postLike - 1 : postLike + 1;
                setPostLike(updatedLikes);
                setLiked(!liked);

                // apne post ko update krunga
                const updatedPostData = posts.map(p =>
                    p._id === post._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                    } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

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
    return (
        <div className='my-8 w-full max-w-md mx-auto bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-4 border border-gray-100'>
    <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-3'>
            <Avatar className='w-10 h-10 ring-2 ring-purple-500/20 hover:ring-purple-500/40 transition-all'>
                <AvatarImage src={post.author?.profilePicture} alt="profile" className='object-cover' />
                <AvatarFallback className='bg-gradient-to-r from-purple-500 to-pink-500 text-white'>
                    {post.author?.username?.charAt(0) || 'U'}
                </AvatarFallback>
            </Avatar>
            <div className='flex items-center gap-2'>
                <h1 className='font-semibold text-gray-800 hover:text-gray-900 cursor-pointer'>
                    {post.author?.username}
                </h1>
                {user?._id === post.author._id && 
                    <span className='px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full'>Author</span>}
            </div>
        </div>
        <Dialog>
            <DialogTrigger asChild>
                <MoreHorizontal className='cursor-pointer text-gray-400 hover:text-gray-600 transition-colors' />
            </DialogTrigger>
            <DialogContent className='rounded-lg p-2 w-48 shadow-xl'>
                {post?.author?._id !== user?._id && 
                    <Button variant='ghost' className='w-full justify-start text-red-600 hover:bg-red-50'>
                        Unfollow
                    </Button>}
                <Button variant='ghost' className='w-full justify-start hover:bg-gray-50'>
                    Add to favorites
                </Button>
                {user && user?._id === post?.author._id && 
                    <Button onClick={deletePostHandler} variant='ghost' className='w-full justify-start text-red-600 hover:bg-red-50'>
                        Delete Post
                    </Button>}
            </DialogContent>
        </Dialog>
    </div>

    <div className='relative group'>
        <img
            className='rounded-lg w-full aspect-square object-cover transition-transform duration-200 hover:scale-98'
            src={post.image}
            alt="post_img"
        />
        <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg' />
    </div>

    <div className='flex items-center justify-between my-4 px-1'>
        <div className='flex items-center gap-4'>
            <button className='p-1.5 hover:bg-red-50 rounded-full transition-colors'>
                {liked ? 
                    <FaHeart onClick={likeOrDislikeHandler} className='w-6 h-6 text-red-600 animate-pop' /> : 
                    <FaRegHeart onClick={likeOrDislikeHandler} className='w-6 h-6 text-gray-800 hover:text-red-600' />}
            </button>
            <button 
                onClick={() => {
                    dispatch(setSelectedPost(post));
                    setOpen(true);
                }}
                className='p-1.5 hover:bg-blue-50 rounded-full transition-colors'
            >
                <MessageCircle className='w-6 h-6 text-gray-800 hover:text-blue-600' />
            </button>
            <button className='p-1.5 hover:bg-green-50 rounded-full transition-colors'>
                <Send className='w-6 h-6 text-gray-800 hover:text-green-600' />
            </button>
        </div>
        <button onClick={bookmarkHandler} className='p-1.5 hover:bg-purple-50 rounded-full transition-colors'>
            <Bookmark className='w-6 h-6 text-gray-800 hover:text-purple-600' />
        </button>
    </div>

    <div className='space-y-2 px-1'>
        <span className='font-semibold text-gray-900'>{postLike} likes</span>
        <p className='text-gray-800'>
            <span className='font-semibold mr-2'>{post.author?.username}</span>
            {post.caption}
        </p>
        {comment.length > 0 && (
            <button
                onClick={() => {
                    dispatch(setSelectedPost(post));
                    setOpen(true);
                }}
                className='text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors'
            >
                View all {comment.length} comments
            </button>
        )}
    </div>

    <CommentDialog open={open} setOpen={setOpen} />

    <div className='mt-4 flex items-center gap-2 border-t border-gray-100 pt-4'>
        <input
            type="text"
            placeholder='Add a comment...'
            value={text}
            onChange={changeEventHandler}
            className='flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
        />
        {text && (
            <button 
                onClick={commentHandler}
                className='px-4 py-1.5 bg-purple-500 text-white text-sm font-semibold rounded-full hover:bg-purple-600 active:scale-95 transition-all'
            >
                Post
            </button>
        )}
    </div>
</div>
    )
}

export default Post