import React, { useState } from 'react'
import Navbar from './shared/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '@/redux/authSlice';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = userProfile?.followers?.includes(user?._id);

  const followHandler = async () => {
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/user/followorunfollow/${userProfile?._id}`, {}, {
        withCredentials: true
      });
      if (res.data.success) {
        const updatedUserProfile = {
          ...userProfile,
          followers: isFollowing 
            ? userProfile.followers.filter(id => id !== user._id)
            : [...userProfile.followers, user._id]
        };
        dispatch(setUserProfile(updatedUserProfile));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <>
      <Navbar/>
      <div className="bg-gray-50 min-h-screen pb-10">
        {/* Banner */}
        <div className="h-60 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32">
          <div className="bg-white rounded-xl shadow-xl p-6 relative">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex-shrink-0 flex justify-center">
                <Avatar className="h-40 w-40 border-4 border-white shadow-lg ring-4 ring-gray-50">
                  <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" className="object-cover" />
                  <AvatarFallback className="text-2xl">CN</AvatarFallback>
                </Avatar>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900">{userProfile?.username}</h1>
                    <p className="text-gray-600 max-w-2xl">{userProfile?.bio || 'No bio yet...'}</p>
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
                      <AtSign className="w-4 h-4" /> 
                      <span className="pl-1 font-medium">{userProfile?.username}</span>
                    </Badge>
                  </div>

                  <div className="flex gap-3">
                    {isLoggedInUserProfile ? (
                      <div className="flex gap-2">
                        <Link to="/account/edit">
                          <Button variant="outline" className="bg-white border-gray-300 hover:bg-gray-50 text-gray-700 font-medium">
                            Edit profile
                          </Button>
                        </Link>
                        <Button variant="outline" className="bg-white border-gray-300 hover:bg-gray-50 text-gray-700">
                          View archive
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={followHandler}
                          className={`px-6 ${
                            isFollowing 
                              ? 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700' 
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {isFollowing ? 'Following' : 'Follow'}
                        </Button>
                        <Button variant="outline" className="bg-white border-gray-300 hover:bg-gray-50 text-gray-700">
                          Message
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-8 pt-4 border-t">
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-gray-900">{userProfile?.posts.length}</span>
                    <span className="text-gray-600">Posts</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-gray-900">{userProfile?.followers.length}</span>
                    <span className="text-gray-600">Followers</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-gray-900">{userProfile?.following.length}</span>
                    <span className="text-gray-600">Following</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8 border-b border-gray-200">
              <div className="flex justify-center gap-12">
                <button
                  onClick={() => handleTabChange('posts')}
                  className={`pb-4 px-2 relative ${
                    activeTab === 'posts'
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  POSTS
                  {activeTab === 'posts' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                  )}
                </button>
                <button
                  onClick={() => handleTabChange('saved')}
                  className={`pb-4 px-2 relative ${
                    activeTab === 'saved'
                      ? 'text-blue-600 font-semibold'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  SAVED
                  {activeTab === 'saved' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                  )}
                </button>
                <button className="pb-4 px-2 text-gray-500 hover:text-gray-800">
                  TAGS
                </button>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedPost?.map((post) => (
                  <div key={post?._id} className="group relative rounded-lg overflow-hidden bg-gray-200">
                    <img
                      src={post.image}
                      alt="post"
                      className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex items-center space-x-8">
                        <div className="flex items-center gap-2 text-white">
                          <Heart className="w-6 h-6" />
                          <span className="text-lg font-medium">{post?.likes.length}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white">
                          <MessageCircle className="w-6 h-6" />
                          <span className="text-lg font-medium">{post?.comments.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile