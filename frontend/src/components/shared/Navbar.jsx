import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { PlusSquare, Search } from 'lucide-react'
import { useState } from 'react'
import CreatePost from '../CreatePost'
import SearchDialog from '../SearchDialog'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Bharat<span className='text-[#F83002]'>Nyay</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'lawyer' ? (
                                <>
                                    <li><Link to="/home">Home</Link></li>
                                    <li><Link to="/">About</Link></li>
                                    <li><Link to="/chat">Chat</Link></li>
                                    <li 
                                        className='flex items-center gap-1 cursor-pointer hover:text-gray-600'
                                        onClick={() => setOpen(true)}
                                    >
                                        <PlusSquare size={20} />
                                        <span>Add Post</span>
                                    </li>
                                    <li><Link to="/admin/courts">Courts</Link></li>
                                    <li><Link to="/admin/lawyers">Lawyers</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/home">Home</Link></li>
                                    <li><Link to="/">About</Link></li>
                                    <li><Link to="/chat">Chat</Link></li>
                                    <li 
                                        className='flex items-center gap-1 cursor-pointer hover:text-gray-600'
                                        onClick={() => setOpen(true)}
                                    >
                                        <PlusSquare size={20} />
                                        <span>Add Post</span>
                                    </li>
                                    <li><Link to="/lawyers">Lawyers</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                        <li>
                            <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => setSearchOpen(true)}
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                        </li>
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                            {
                                                user && user.role === 'lawyer' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }
                                              
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                        <CreatePost open={open} setOpen={setOpen} />
                </div>
            </div>
            <SearchDialog open={searchOpen} setOpen={setSearchOpen} />
        </div>
    )
}

export default Navbar