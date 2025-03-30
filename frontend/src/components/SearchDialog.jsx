import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { useSelector } from 'react-redux';

const SearchDialog = ({ open, setOpen }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim()) {
            try {
                setLoading(true);
                const res = await axios.get(`${USER_API_END_POINT}/search?query=${query}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    setSearchResults(res.data.users);
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to search users");
            } finally {
                setLoading(false);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
        setOpen(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    // Helper function to get avatar fallback text
    const getAvatarFallback = (fullname) => {
        if (!fullname) return 'U';
        return fullname.charAt(0).toUpperCase();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Search Users</DialogTitle>
                </DialogHeader>
                <Input
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="my-4"
                />
                <div className="max-h-[300px] overflow-y-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                        </div>
                    ) : (
                        searchResults.map((user) => (
                            <div
                                key={user._id}
                                className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors"
                                onClick={() => handleUserClick(user._id)}
                            >
                                <Avatar>
                                    <AvatarImage 
                                        src={user.profile?.profilePicture} 
                                        alt={user.fullname || 'User'} 
                                    />
                                    <AvatarFallback>
                                        {getAvatarFallback(user.fullname)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-semibold">
                                        {user.fullname || 'Anonymous User'}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {user.email}
                                    </p>
                                    {user.profile?.bio && (
                                        <p className="text-xs text-gray-400 truncate max-w-[200px]">
                                            {user.profile.bio}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                    {!loading && searchQuery && searchResults.length === 0 && (
                        <div className="text-center text-gray-500 py-4">
                            No users found
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SearchDialog;