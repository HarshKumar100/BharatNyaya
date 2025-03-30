import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './shared/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useState } from 'react';

const CurrentUserProfile = () => {
    const { user } = useSelector(store => store.auth);
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

    if (!user) {
        return (
            <div>
                <Navbar />
                <div className="flex justify-center items-center min-h-[80vh]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-4xl mx-auto py-8 px-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start gap-8">
                        <Avatar className="h-32 w-32">
                            <AvatarImage 
                                src={user.profile?.profilePicture} 
                                alt={user.fullname} 
                            />
                            <AvatarFallback>
                                {user.fullname?.charAt(0)?.toUpperCase() || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-2xl font-bold mb-2">
                                        {user.fullname}
                                    </h1>
                                    <p className="text-gray-600">{user.email}</p>
                                    <p className="text-gray-500 mt-1">
                                        <span className="font-medium">Role: </span>
                                        <span className="capitalize">{user.role}</span>
                                    </p>
                                </div>
                                <Button 
                                    variant="outline"
                                    onClick={() => setOpenUpdateDialog(true)}
                                >
                                    Edit Profile
                                </Button>
                            </div>

                            {user.profile?.bio && (
                                <div className="mt-4">
                                    <h2 className="font-semibold text-gray-700">Bio</h2>
                                    <p className="text-gray-600 mt-1">{user.profile.bio}</p>
                                </div>
                            )}
                            
                            {user.profile?.skills?.length > 0 && (
                                <div className="mt-4">
                                    <h2 className="font-semibold text-gray-700 mb-2">Skills</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {user.profile.skills.map((skill, index) => (
                                            <span 
                                                key={index}
                                                className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {user.phoneNumber && (
                                <div className="mt-4">
                                    <h2 className="font-semibold text-gray-700">Contact</h2>
                                    <p className="text-gray-600 mt-1">
                                        Phone: {user.phoneNumber}
                                    </p>
                                </div>
                            )}

                            {user.profile?.resume && (
                                <div className="mt-4">
                                    <a 
                                        href={user.profile.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        View Resume
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <UpdateProfileDialog open={openUpdateDialog} setOpen={setOpenUpdateDialog} />
        </div>
    );
};

export default CurrentUserProfile; 