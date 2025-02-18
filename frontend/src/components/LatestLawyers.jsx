import React from 'react'
import LatestLawyerCards from './LatestLawyerCards';
import { useSelector } from 'react-redux';

// const randomLawyers = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestLawyers = () => {
    const { allLawyers } = useSelector(store => store.lawyer);

    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Top Exprience</span> Lawyers & Addvocates</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allLawyers.length <= 0 ? <span>No Lawyers & Addvocates Available</span> : allLawyers?.slice(0, 6).map((lawyer) => <LatestLawyerCards key={lawyer._id} lawyer={lawyer} />)
                }
            </div>

            <h1 className='text-4xl font-bold my-10 text-center'><span className='text-[#6A38C2]'>Why </span>BharatNyay?</h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
                {/* Specialist Lawyers Card */}
                <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100'>
                    <div className='bg-[#6A38C2] w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h2 className='text-xl font-bold mb-2'>Specialist Lawyers</h2>
                    <p className='text-gray-600'>Easily get specialised legal counsel and connect with experienced lawyers.</p>
                </div>

                {/* Privacy Card */}
                <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100'>
                    <div className='bg-[#6A38C2] w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className='text-xl font-bold mb-2'>Privacy and Confidentiality</h2>
                    <p className='text-gray-600'>Your personal information will be 100% secure with BharatNyay.</p>
                </div>

                {/* Convenient Card */}
                <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100'>
                    <div className='bg-[#6A38C2] w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h2 className='text-xl font-bold mb-2'>Convenient and Easy</h2>
                    <p className='text-gray-600'>Effortlessly find expert legal assistance and get in touch with top-tier lawyers.</p>
                </div>

                {/* 24/7 Support Card */}
                <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100'>
                    <div className='bg-[#6A38C2] w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                    <h2 className='text-xl font-bold mb-2'>24/7 Support</h2>
                    <p className='text-gray-600'>Reach out to us from anywhere and at any time. We're always here for you.</p>
                </div>
            </div>

            <h1 className='text-4xl font-bold my-10 text-center'>
                <span className='text-[#6A38C2]'>How to get </span>
                Lawyer Consultation Online?
            </h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
                {/* Step 1: Visit Website */}
                <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 relative'>
                    <div className='absolute -top-4 -left-4 bg-[#6A38C2] w-8 h-8 rounded-full flex items-center justify-center text-white font-bold'>1</div>
                    <div className='bg-[#6A38C2] w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                    </div>
                    <h2 className='text-xl font-bold mb-2'>Visit BharatNyay.com</h2>
                    <p className='text-gray-600'>Access the platform from any device.</p>
                </div>

                {/* Step 2: Specify Issue */}
                <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 relative'>
                    <div className='absolute -top-4 -left-4 bg-[#6A38C2] w-8 h-8 rounded-full flex items-center justify-center text-white font-bold'>2</div>
                    <div className='bg-[#6A38C2] w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <h2 className='text-xl font-bold mb-2'>Specify your issue</h2>
                    <p className='text-gray-600'>Enter details about your legal problem to find the right lawyer.</p>
                </div>

                {/* Step 3: Request Recorded */}
                <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 relative'>
                    <div className='absolute -top-4 -left-4 bg-[#6A38C2] w-8 h-8 rounded-full flex items-center justify-center text-white font-bold'>3</div>
                    <div className='bg-[#6A38C2] w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className='text-xl font-bold mb-2'>Request Recorded</h2>
                    <p className='text-gray-600'>Your consultation request is securely recorded in the system.</p>
                </div>

                {/* Step 4: Tele-consultation */}
                <div className='bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 relative'>
                    <div className='absolute -top-4 -left-4 bg-[#6A38C2] w-8 h-8 rounded-full flex items-center justify-center text-white font-bold'>4</div>
                    <div className='bg-[#6A38C2] w-14 h-14 rounded-full flex items-center justify-center mb-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                    </div>
                    <h2 className='text-xl font-bold mb-2'>Tele-consultation</h2>
                    <p className='text-gray-600'>Connect with the lawyer via online chat or call for expert legal advice.</p>
                </div>
            </div>




            <h1 className='text-4xl font-bold my-16 text-center'>
                <span className='text-[#6A38C2]'>Our Legal </span>
                Services
            </h1>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
                {/* Corporate */}
                <div className='group bg-white p-8 rounded-2xl hover:bg-[#6A38C2] transition-all duration-300 transform hover:-translate-y-2'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='bg-[#6A38C2] group-hover:bg-white w-20 h-20 rounded-2xl rotate-45 flex items-center justify-center mb-6 transition-all duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-white group-hover:text-[#6A38C2] -rotate-45 transition-all duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h2 className='text-2xl font-bold mb-4 group-hover:text-white transition-all duration-300'>Corporate Law</h2>
                        <p className='text-gray-600 group-hover:text-gray-200 transition-all duration-300'>
                            Expert assistance in court incorporation, MSME & GST registration, compliance, and document drafting.
                        </p>
                    </div>
                </div>

                {/* Banking & Finance */}
                <div className='group bg-white p-8 rounded-2xl hover:bg-[#6A38C2] transition-all duration-300 transform hover:-translate-y-2'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='bg-[#6A38C2] group-hover:bg-white w-20 h-20 rounded-2xl rotate-45 flex items-center justify-center mb-6 transition-all duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-white group-hover:text-[#6A38C2] -rotate-45 transition-all duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className='text-2xl font-bold mb-4 group-hover:text-white transition-all duration-300'>Banking & Finance</h2>
                        <p className='text-gray-600 group-hover:text-gray-200 transition-all duration-300'>
                            Comprehensive solutions for property verification, risk assessment, and financial management.
                        </p>
                    </div>
                </div>

                {/* Criminal Law */}
                <div className='group bg-white p-8 rounded-2xl hover:bg-[#6A38C2] transition-all duration-300 transform hover:-translate-y-2'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='bg-[#6A38C2] group-hover:bg-white w-20 h-20 rounded-2xl rotate-45 flex items-center justify-center mb-6 transition-all duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-white group-hover:text-[#6A38C2] -rotate-45 transition-all duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                            </svg>
                        </div>
                        <h2 className='text-2xl font-bold mb-4 group-hover:text-white transition-all duration-300'>Criminal Law</h2>
                        <p className='text-gray-600 group-hover:text-gray-200 transition-all duration-300'>
                            Expert handling of criminal cases, bail matters, FIR registration, and cyber crime issues.
                        </p>
                    </div>
                </div>

                {/* Civil Law */}
                <div className='group bg-white p-8 rounded-2xl hover:bg-[#6A38C2] transition-all duration-300 transform hover:-translate-y-2'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='bg-[#6A38C2] group-hover:bg-white w-20 h-20 rounded-2xl rotate-45 flex items-center justify-center mb-6 transition-all duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-white group-hover:text-[#6A38C2] -rotate-45 transition-all duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className='text-2xl font-bold mb-4 group-hover:text-white transition-all duration-300'>Civil Law</h2>
                        <p className='text-gray-600 group-hover:text-gray-200 transition-all duration-300'>
                            Specialized in probate, succession, insurance cases, and consumer dispute resolution.
                        </p>
                    </div>
                </div>
            </div>


            {/* Additional Legal Services */}
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
                {/* Family Law */}
                <div className='group bg-white p-8 rounded-2xl hover:bg-[#6A38C2] transition-all duration-300 transform hover:-translate-y-2'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='bg-[#6A38C2] group-hover:bg-white w-20 h-20 rounded-2xl rotate-45 flex items-center justify-center mb-6 transition-all duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-white group-hover:text-[#6A38C2] -rotate-45 transition-all duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h2 className='text-2xl font-bold mb-4 group-hover:text-white transition-all duration-300'>Family Law</h2>
                        <p className='text-gray-600 group-hover:text-gray-200 transition-all duration-300'>
                            Count on us for guidance and support through handling Divorce, Custody Maintenance, Dowry Prohibition related issues.
                        </p>
                    </div>
                </div>

                {/* Real Estate */}
                <div className='group bg-white p-8 rounded-2xl hover:bg-[#6A38C2] transition-all duration-300 transform hover:-translate-y-2'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='bg-[#6A38C2] group-hover:bg-white w-20 h-20 rounded-2xl rotate-45 flex items-center justify-center mb-6 transition-all duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-white group-hover:text-[#6A38C2] -rotate-45 transition-all duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </div>
                        <h2 className='text-2xl font-bold mb-4 group-hover:text-white transition-all duration-300'>Real Estate</h2>
                        <p className='text-gray-600 group-hover:text-gray-200 transition-all duration-300'>
                            Experience peace of mind as we tackle your Property Investigation, Verification, Transfer, Registration & allied services.
                        </p>
                    </div>
                </div>

                {/* Divorce */}
                <div className='group bg-white p-8 rounded-2xl hover:bg-[#6A38C2] transition-all duration-300 transform hover:-translate-y-2'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='bg-[#6A38C2] group-hover:bg-white w-20 h-20 rounded-2xl rotate-45 flex items-center justify-center mb-6 transition-all duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-white group-hover:text-[#6A38C2] -rotate-45 transition-all duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h2 className='text-2xl font-bold mb-4 group-hover:text-white transition-all duration-300'>Divorce</h2>
                        <p className='text-gray-600 group-hover:text-gray-200 transition-all duration-300'>
                            Connect with experienced divorce lawyers for confidential consultations, legal guidance, and document assistance.
                        </p>
                    </div>
                </div>

                {/* Torts */}
                <div className='group bg-white p-8 rounded-2xl hover:bg-[#6A38C2] transition-all duration-300 transform hover:-translate-y-2'>
                    <div className='flex flex-col items-center text-center'>
                        <div className='bg-[#6A38C2] group-hover:bg-white w-20 h-20 rounded-2xl rotate-45 flex items-center justify-center mb-6 transition-all duration-300'>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-white group-hover:text-[#6A38C2] -rotate-45 transition-all duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                            </svg>
                        </div>
                        <h2 className='text-2xl font-bold mb-4 group-hover:text-white transition-all duration-300'>Torts</h2>
                        <p className='text-gray-600 group-hover:text-gray-200 transition-all duration-300'>
                            Expert guidance for personal injury, negligence, defamation, and consumer rights violation cases.
                        </p>
                    </div>
                </div>
            </div>



        </div>

    )
}

export default LatestLawyers