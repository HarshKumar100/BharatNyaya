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
import { setLoading } from '@/redux/authSlice'
import { Loader2, Upload, User, Mail, Phone, Lock } from 'lucide-react'
import { motion } from 'framer-motion'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
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

            {/* Signup Form Container */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full max-w-lg mx-auto"
                >
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4"
                        >
                            <User className="w-8 h-8 text-white" />
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-2xl md:text-3xl font-bold text-white mb-2"
                        >
                            Create Account
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-gray-300 text-sm md:text-base"
                        >
                            Join our legal platform and get started today
                        </motion.p>
                    </div>

                    {/* Signup Form */}
                    <motion.form 
                        onSubmit={submitHandler} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 md:p-8 shadow-2xl"
                    >
                        <div className="space-y-4 md:space-y-6">
                            {/* Full Name Field */}
                            <div>
                                <Label className="text-white font-medium text-sm mb-2 block">
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type="text"
                                        value={input.fullname}
                                        name="fullname"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your full name"
                                        className="w-full pl-10 pr-3 md:pr-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <Label className="text-white font-medium text-sm mb-2 block">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your email address"
                                        className="w-full pl-10 pr-3 md:pr-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                                    />
                                </div>
                            </div>

                            {/* Phone Number Field */}
                            <div>
                                <Label className="text-white font-medium text-sm mb-2 block">
                                    Phone Number
                                </Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type="text"
                                        value={input.phoneNumber}
                                        name="phoneNumber"
                                        onChange={changeEventHandler}
                                        placeholder="Enter your phone number"
                                        className="w-full pl-10 pr-3 md:pr-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <Label className="text-white font-medium text-sm mb-2 block">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type="password"
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="Create a strong password"
                                        className="w-full pl-10 pr-3 md:pr-4 py-2 md:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                                    />
                                </div>
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

                            {/* Profile Picture Upload */}
                            <div>
                                <Label className="text-white font-medium text-sm mb-2 block">
                                    Profile Picture (Optional)
                                </Label>
                                <div className="relative">
                                    <input
                                        accept="image/*"
                                        type="file"
                                        onChange={changeFileHandler}
                                        className="sr-only"
                                        id="profile-upload"
                                    />
                                    <label
                                        htmlFor="profile-upload"
                                        className="flex items-center justify-center w-full p-4 bg-white/10 border border-white/20 rounded-lg cursor-pointer hover:bg-white/20 transition-all duration-200"
                                    >
                                        <Upload className="w-5 h-5 text-gray-400 mr-2" />
                                        <span className="text-gray-300">
                                            {input.file ? input.file.name : 'Choose profile picture'}
                                        </span>
                                    </label>
                                </div>
                            </div>
                            
                            {/* Signup Button */}
                            <div className="pt-4">
                                {loading ? (
                                    <Button 
                                        disabled
                                        className="w-full py-3 bg-blue-600/80 hover:bg-blue-600/80 text-white font-medium rounded-lg transition-all duration-200 cursor-not-allowed"
                                    >
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Creating Account...
                                    </Button>
                                ) : (
                                    <Button 
                                        type="submit" 
                                        className="w-full py-2 md:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm md:text-base"
                                    >
                                        Create Account
                                    </Button>
                                )}
                            </div>
                            
                            {/* Login Link */}
                            <div className="text-center pt-4 border-t border-white/10">
                                <span className="text-gray-300 text-sm">
                                    Already have an account? 
                                    <Link 
                                        to="/login" 
                                        className="text-blue-400 hover:text-blue-300 ml-1 font-medium transition-colors duration-200"
                                    >
                                        Sign In
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
                            By creating an account, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Signup