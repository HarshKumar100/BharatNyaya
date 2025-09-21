import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X, Home, Info, MessageCircle, PlusSquare, Building2, Users, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { useState } from 'react'
import CreatePost from '../CreatePost'
import SearchDialog from '../SearchDialog'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <div className='bg-white/95 backdrop-blur-sm shadow-lg'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                {/* Logo */}
                <div>
                    <h1 className='text-xl md:text-2xl font-bold'>Bharat<span className='text-[#F83002]'>Nyay</span></h1>
                </div>

                {/* Desktop Navigation */}
                <div className='hidden lg:flex items-center gap-6'>
                    <ul className='flex font-medium items-center gap-4'>
                        {
                            user && user.role === 'lawyer' ? (
                                <>
                                    <li>
                                        <Link to="/home" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Home">
                                            <Home size={20} />
                                            <span className="hidden xl:inline">Home</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors" title="About">
                                            <Info size={20} />
                                            <span className="hidden xl:inline">About</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/chat" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Chat">
                                            <MessageCircle size={20} />
                                            <span className="hidden xl:inline">Chat</span>
                                        </Link>
                                    </li>
                                    <li 
                                        className='flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors'
                                        onClick={() => setOpen(true)}
                                        title="Add Post"
                                    >
                                        <PlusSquare size={20} />
                                        <span className="hidden xl:inline">Add Post</span>
                                    </li>
                                    <li>
                                        <Link to="/admin/courts" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Courts">
                                            <Building2 size={20} />
                                            <span className="hidden xl:inline">Courts</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/lawyers" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Lawyers">
                                            <Users size={20} />
                                            <span className="hidden xl:inline">Lawyers</span>
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/home" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Home">
                                            <Home size={20} />
                                            {/* <span className="hidden xl:inline">Home</span> */}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors" title="About">
                                            <Info size={20} />
                                            {/* <span className="hidden xl:inline">About</span> */}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/chat" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Chat">
                                            <MessageCircle size={20} />
                                            {/* <span className="hidden xl:inline">Chat</span> */}
                                        </Link>
                                    </li>
                                    <li 
                                        className='flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors'
                                        onClick={() => setOpen(true)}
                                        title="Add Post"
                                    >
                                        <PlusSquare size={20} />
                                        {/* <span className="hidden xl:inline">Add Post</span> */}
                                    </li>
                                    <li>
                                        <Link to="/lawyers" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Lawyers">
                                            <Users size={20} />
                                            {/* <span className="hidden xl:inline">Lawyers</span> */}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/browse" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Browse">
                                            <Search size={20} />
                                            <span className="hidden xl:inline">Browse</span>
                                        </Link>
                                    </li>
                                </>
                            )
                        }
                        <li>
                            <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => setSearchOpen(true)}
                                className="hover:bg-gray-100"
                                title="Search"
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                        </li>
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                    <Button variant="outline" size="sm" className="hidden sm:inline-flex">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white" size="sm">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer hover:ring-2 hover:ring-gray-200 transition-all">
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
                </div>

                {/* Mobile Menu Button */}
                <div className='lg:hidden flex items-center gap-2'>
                    <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setSearchOpen(true)}
                        className="hover:bg-gray-100"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                    {!user && (
                        <div className='flex items-center gap-1'>
                            <Link to="/login">
                                <Button variant="outline" size="sm">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white" size="sm">Signup</Button>
                            </Link>
                        </div>
                    )}
                    {user && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="cursor-pointer hover:ring-2 hover:ring-gray-200 transition-all">
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
                    )}
                    <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="hover:bg-gray-100"
                    >
                        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className='lg:hidden bg-white border-t border-gray-200 shadow-lg'>
                    <div className='px-4 py-4 space-y-2'>
                        <ul className='space-y-2'>
                            {
                                user && user.role === 'lawyer' ? (
                                    <>
                                        <li>
                                            <Link to="/home" className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                <Home size={20} />
                                                <span>Home</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                <Info size={20} />
                                                <span>About</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/chat" className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                <MessageCircle size={20} />
                                                <span>Chat</span>
                                            </Link>
                                        </li>
                                        <li 
                                            className='flex items-center gap-3 py-3 px-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors'
                                            onClick={() => {setOpen(true); setMobileMenuOpen(false);}}
                                        >
                                            <PlusSquare size={20} />
                                            <span>Add Post</span>
                                        </li>
                                        <li>
                                            <Link to="/admin/courts" className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                <Building2 size={20} />
                                                <span>Courts</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/admin/lawyers" className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                <Users size={20} />
                                                <span>Lawyers</span>
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/home" className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                <Home size={20} />
                                                <span>Home</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/" className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                <Info size={20} />
                                                <span>About</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/chat" className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                <MessageCircle size={20} />
                                                <span>Chat</span>
                                            </Link>
                                        </li>
                                        <li 
                                            className='flex items-center gap-3 py-3 px-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors'
                                            onClick={() => {setOpen(true); setMobileMenuOpen(false);}}
                                        >
                                            <PlusSquare size={20} />
                                            <span>Add Post</span>
                                        </li>
                                        <li>
                                            <Link to="/lawyers" className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                <Users size={20} />
                                                <span>Lawyers</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/browse" className="flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-gray-100 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                                                <Search size={20} />
                                                <span>Browse</span>
                                            </Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            )}

            <CreatePost open={open} setOpen={setOpen} />
            <SearchDialog open={searchOpen} setOpen={setSearchOpen} />
        </div>
    )
}

export default Navbar