import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            {/* Background Image with Overlay */}
            <div 
                className="absolute inset-0 z-0" 
                style={{
                    backgroundImage: 'url("/src/assets/court.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-slate-900/80" />
            </div>
            
            {/* Navbar with higher z-index */}
            <div className="relative z-20">
                <Navbar />
            </div>

            {/* Login Form Container */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full max-w-md mx-auto"
                >
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4"
                        >
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-2xl md:text-3xl font-bold text-white mb-2"
                        >
                            Welcome Back
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-gray-300 text-sm md:text-base"
                        >
                            Sign in to your account to continue
                        </motion.p>
                    </div>

                    {/* Login Form */}
                    <motion.form 
                        onSubmit={submitHandler} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 md:p-8 shadow-2xl"
                    >
                        <div className="space-y-4 md:space-y-6">
                            {/* Email Field */}
                            <div>
                                <Label className="text-white font-medium text-sm mb-2 block">
                                    Email Address
                                </Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your email address"
                                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <Label className="text-white font-medium text-sm mb-2 block">
                                    Password
                                </Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="Enter your password"
                                    className="w-full px-3 md:px-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                                />
                            </div>
                            
                            {/* Role Selection */}
                            <div>
                                <Label className="text-white font-medium text-sm mb-3 block">
                                    Account Type
                                </Label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                    <label className={`relative flex items-center justify-center p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                        input.role === 'student' 
                                            ? 'border-blue-500 bg-blue-500/20' 
                                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                                    }`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="sr-only"
                                        />
                                        <div className="text-center">
                                            <div className="text-white font-medium">Client</div>
                                            <div className="text-gray-300 text-xs mt-1">I need legal help</div>
                                        </div>
                                    </label>
                                    
                                    <label className={`relative flex items-center justify-center p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                        input.role === 'lawyer' 
                                            ? 'border-blue-500 bg-blue-500/20' 
                                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                                    }`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="lawyer"
                                            checked={input.role === 'lawyer'}
                                            onChange={changeEventHandler}
                                            className="sr-only"
                                        />
                                        <div className="text-center">
                                            <div className="text-white font-medium">Lawyer</div>
                                            <div className="text-gray-300 text-xs mt-1">I provide legal services</div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            
                            {/* Login Button */}
                            <div className="pt-4">
                                {loading ? (
                                    <Button 
                                        disabled
                                        className="w-full py-3 bg-blue-600/80 hover:bg-blue-600/80 text-white font-medium rounded-lg transition-all duration-200 cursor-not-allowed"
                                    >
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Signing In...
                                    </Button>
                                ) : (
                                    <Button 
                                        type="submit" 
                                        className="w-full py-2 md:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base"
                                    >
                                        Sign In
                                    </Button>
                                )}
                            </div>
                            
                            {/* Signup Link */}
                            <div className="text-center pt-4 border-t border-white/10">
                                <span className="text-gray-300 text-sm">
                                    Don't have an account? 
                                    <Link 
                                        to="/signup" 
                                        className="text-blue-400 hover:text-blue-300 ml-1 font-medium transition-colors duration-200"
                                    >
                                        Create Account
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </motion.form>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-center mt-8"
                    >
                        <p className="text-gray-400 text-xs">
                            Secure login powered by advanced encryption
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Login