import React from 'react'
import LatestLawyerCards from './LatestLawyerCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Shield, Scale, BookOpen, Users, Building2, Gavel, Home, FileText, Star } from 'lucide-react';
import { FaBalanceScale } from "react-icons/fa"
import { Button } from './ui/button';

// const randomLawyers = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestLawyers = () => {
    const { allLawyers } = useSelector(store => store.lawyer);

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white py-20">
            <div className="container mx-auto px-4">
                {/* Featured Lawyers Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
<section className="relative py-10 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center px-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-4xl mx-auto"
            >
                <div className="flex justify-center items-center mb-4">
                    <FaBalanceScale className="text-5xl text-yellow-400 animate-bounce" />
                </div>
                <h2 className="text-lg font-semibold tracking-wide uppercase text-yellow-300">
                Featured Professionals
                </h2>
                <h1 className="mt-2 text-5xl font-extrabold leading-tight">
                Top Experienced Lawyers & Advocates
            </h1>
                <p className="mt-4 text-lg opacity-90 max-w-3xl mx-auto">
                Connect with India's most qualified and experienced legal professionals
                </p>
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-6"
                >
                    <Button className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition">
                        Get Legal Help Now
                    </Button>
                </motion.div>
            </motion.div>
        </section>

                    {allLawyers.length <= 0 ? (
                        <div className="text-center py-20 bg-gray-50 rounded-xl">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Scale className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-gray-900">No Lawyers & Advocates Available</h3>
                                <p className="mt-2 text-gray-500">Please check back later for updated listings.</p>
                            </motion.div>
                    </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {allLawyers?.slice(0, 6).map((lawyer, index) => (
                                <motion.div
                                    key={lawyer._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group relative bg-white rounded-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                >
                                    {/* Gradient Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-indigo-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    <LatestLawyerCards lawyer={lawyer} />
                                    
                                    {/* Hover Content */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="text-white">
                                            <p className="font-semibold text-lg">View Profile</p>
                                            <p className="text-sm opacity-90">Click to see full details</p>
                </div>
            </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Why Choose Us Section */}
                <section className="relative py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center px-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-4xl mx-auto"
            >
                <div className="flex justify-center items-center mb-4">
                    <FaBalanceScale className="text-5xl text-yellow-400 animate-bounce" />
                </div>
                <h2 className="text-lg font-semibold tracking-wide uppercase text-yellow-300">
                    Why Choose Us
                </h2>
                <h1 className="mt-2 text-5xl font-extrabold leading-tight">
                    Legal Excellence at Your Service
                </h1>
                <p className="mt-4 text-lg opacity-90 max-w-3xl mx-auto">
                    Connect with India's finest legal professionals and get expert guidance for all your legal needs.
                </p>
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-6"
                >
                    <Button className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition">
                        Get Legal Help Now
                    </Button>
                </motion.div>
            </motion.div>
        </section>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group bg-white rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                        >
                            <div className="p-6">
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300">
                                    <div className="text-indigo-600 group-hover:text-white transition-colors duration-300">
                                        {feature.icon}
                    </div>
                </div>
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 mt-2 group-hover:text-gray-700 transition-colors duration-300">
                                    {feature.description}
                        </p>
                    </div>
                        </motion.div>
                    ))}
                </div>

                {/* Practice Areas Section */}
                <div className="mt-32">
                <section className="relative py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center px-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-4xl mx-auto"
            >
                <div className="flex justify-center items-center mb-4">
                    <FaBalanceScale className="text-5xl text-yellow-400 animate-bounce" />
                </div>
                <h2 className="text-lg font-semibold tracking-wide uppercase text-yellow-300">
                Practice Areas
                </h2>
                <h1 className="mt-2 text-5xl font-extrabold leading-tight">
                Comprehensive Legal Services
                </h1>
                <p className="mt-4 text-lg opacity-90 max-w-3xl mx-auto">
                Expert legal assistance across multiple practice areas
                </p>
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-6"
                >
                    <Button className="bg-yellow-400 text-gray-900 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition">
                        Get Legal Help Now
                    </Button>
                </motion.div>
            </motion.div>
        </section>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {practiceAreas.map((area, index) => (
                            <motion.div
                                key={area.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group bg-white rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                            >
                                <div className="p-6 relative overflow-hidden">
                                    {/* Animated Background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                                    
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 transform group-hover:rotate-6 group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300">
                                            <div className="text-indigo-600 group-hover:text-white transition-colors duration-300">
                                                {area.icon}
                    </div>
                </div>
                                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                                            {area.title}
                                        </h3>
                                        <p className="text-gray-600 mt-2 group-hover:text-gray-700 transition-colors duration-300">
                                            {area.description}
                                        </p>
                                        
                                        {/* Services List with Hover Effects */}
                                        <ul className="mt-4 space-y-2">
                                            {area.services.map((service, i) => (
                                                <li 
                                                    key={i} 
                                                    className="flex items-center text-gray-600 transform transition-all duration-300 hover:translate-x-2"
                                                >
                                                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2 transform transition-transform duration-300 group-hover:scale-150" />
                                                    {service}
                                                </li>
                                            ))}
                                        </ul>
                    </div>
                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Features Data
const features = [
    {
        icon: <Shield className="w-6 h-6 text-indigo-600" />,
        title: "Verified Experts",
        description: "All lawyers are verified and have proven track records in their respective fields."
    },
    {
        icon: <Scale className="w-6 h-6 text-indigo-600" />,
        title: "Fair Practice",
        description: "Transparent fee structure and ethical legal practices guaranteed."
    },
    {
        icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
        title: "Expert Guidance",
        description: "Get comprehensive legal advice from experienced professionals."
    },
    {
        icon: <Users className="w-6 h-6 text-indigo-600" />,
        title: "24/7 Support",
        description: "Round-the-clock assistance for all your legal queries and concerns."
    }
];

// Practice Areas Data
const practiceAreas = [
    {
        icon: <Building2 className="w-6 h-6 text-indigo-600 group-hover:text-white" />,
        title: "Corporate Law",
        description: "Comprehensive legal solutions for businesses of all sizes",
        services: [
            "Company Registration",
            "Compliance Management",
            "Contract Drafting",
            "Mergers & Acquisitions"
        ]
    },
    {
        icon: <Gavel className="w-6 h-6 text-indigo-600 group-hover:text-white" />,
        title: "Criminal Law",
        description: "Expert criminal defense and prosecution services",
        services: [
            "Criminal Defense",
            "Bail Matters",
            "Criminal Appeals",
            "White Collar Crime"
        ]
    },
    {
        icon: <Home className="w-6 h-6 text-indigo-600 group-hover:text-white" />,
        title: "Real Estate",
        description: "Complete property law and real estate services",
        services: [
            "Property Documentation",
            "Title Verification",
            "Property Disputes",
            "Real Estate Transactions"
        ]
    },
    {
        icon: <Users className="w-6 h-6 text-indigo-600 group-hover:text-white" />,
        title: "Family Law",
        description: "Sensitive handling of family legal matters",
        services: [
            "Divorce Proceedings",
            "Child Custody",
            "Marriage Registration",
            "Maintenance Cases"
        ]
    },
    {
        icon: <Scale className="w-6 h-6 text-indigo-600 group-hover:text-white" />,
        title: "Civil Litigation",
        description: "Expert handling of civil cases and disputes",
        services: [
            "Civil Suits",
            "Consumer Disputes",
            "Recovery Cases",
            "Injunction Matters"
        ]
    },
    {
        icon: <FileText className="w-6 h-6 text-indigo-600 group-hover:text-white" />,
        title: "Documentation",
        description: "Professional legal documentation services",
        services: [
            "Legal Drafting",
            "Agreement Preparation",
            "Will Creation",
            "Power of Attorney"
        ]
    }
];

export default LatestLawyers