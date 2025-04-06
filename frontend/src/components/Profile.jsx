import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './shared/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  AtSign, Mail, Phone, MapPin, Calendar, Clock, 
  FileText, AlertCircle, CheckCircle2, Scale, 
  MessageCircle, User, Shield, Activity, Building2, InfoIcon, 
  // Phone2
   Bell 
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { setUserProfile } from '@/redux/authSlice';
import { motion } from 'framer-motion';

const LawyerProfile = ({ userProfile, isLoggedInUserProfile }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Professional Banner for Lawyer */}
      <div className="h-80 bg-gradient-to-r from-slate-800 to-slate-900 relative">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Profile Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0">
                <Avatar className="h-48 w-48 border-4 border-white shadow-xl">
                  <AvatarImage src={userProfile?.profilePicture} />
                  <AvatarFallback className="bg-slate-800 text-white text-3xl">
                    {userProfile?.fullname?.[0]}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {userProfile?.fullname}
                      </h1>
                      <Badge className="bg-slate-800 text-white">Verified Lawyer</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {userProfile?.specializations?.map((spec, index) => (
                        <Badge key={index} variant="outline" className="border-slate-800 text-slate-800">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-gray-600 max-w-2xl mb-4">{userProfile?.bio}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Scale className="w-4 h-4 mr-2" />
                        {userProfile?.barCouncilNumber}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {userProfile?.yearsOfPractice} Years Experience
                      </div>
                    </div>
                  </div>

                  {isLoggedInUserProfile ? (
                    <Link to="/account/edit">
                      <Button className="bg-slate-800 hover:bg-slate-900">
                        Edit Profile
                      </Button>
                    </Link>
                  ) : (
                    <div className="flex gap-3">
                      <Button className="bg-slate-800 hover:bg-slate-900">
                        Schedule Consultation
                      </Button>
                      <Button variant="outline" className="border-slate-800 text-slate-800">
                        Message
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Professional Stats */}
          <div className="grid grid-cols-4 divide-x divide-gray-200 bg-slate-50">
            {[
              { label: 'Cases Won', value: userProfile?.casesWon || '0' },
              { label: 'Years Experience', value: userProfile?.yearsOfPractice || '0' },
              { label: 'Satisfied Clients', value: userProfile?.satisfiedClients || '0' },
              { label: 'Success Rate', value: userProfile?.successRate || '0%' }
            ].map((stat, index) => (
              <div key={index} className="px-8 py-6 text-center">
                <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-3 gap-8 p-8">
            {/* Left Column */}
            <div className="col-span-2 space-y-8">
              {/* About Section */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
                <div className="prose max-w-none text-gray-600">
                  {userProfile?.about || 'No information provided.'}
                </div>
              </section>

              {/* Experience Section */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
                <div className="space-y-4">
                  {userProfile?.experience?.map((exp, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                      <p className="text-sm text-gray-500">{exp.duration}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Notable Cases */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Notable Cases</h2>
                <div className="space-y-4">
                  {userProfile?.notableCases?.map((caseItem, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900">{caseItem.title}</h3>
                      <p className="text-gray-600">{caseItem.description}</p>
                      <p className="text-sm text-gray-500">{caseItem.year}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                  {isLoggedInUserProfile && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Verified Contact
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-center text-gray-600 group">
                    <div className="flex items-center flex-1">
                      <Mail className="w-5 h-5 mr-3 text-slate-700" />
                      <span>{userProfile?.email}</span>
                    </div>
                    {isLoggedInUserProfile && (
                      <Badge className="bg-blue-100 text-blue-700">Primary</Badge>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex items-center text-gray-600 group">
                    <div className="flex items-center flex-1">
                      <Phone className="w-5 h-5 mr-3 text-slate-700" />
                      <span>{userProfile?.phone || 'Not provided'}</span>
                    </div>
                    {isLoggedInUserProfile && userProfile?.phone && (
                      <Badge className="bg-blue-100 text-blue-700">Verified</Badge>
                    )}
                  </div>

                  {/* Office Phone (if provided) */}
                  {userProfile?.officePhone && (
                    <div className="flex items-center text-gray-600">
                      <Building2 className="w-5 h-5 mr-3 text-slate-700" />
                      <span>{userProfile.officePhone}</span>
                    </div>
                  )}

                  {/* Office Address */}
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-slate-700" />
                    <span>{userProfile?.location || userProfile?.address || 'Location not provided'}</span>
                  </div>

                  {/* Business Hours - Only shown if provided */}
                  {userProfile?.businessHours && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-3 text-slate-700" />
                      <span>{userProfile.businessHours}</span>
                    </div>
                  )}

                  {/* Contact Preference - Only shown if provided */}
                  {userProfile?.contactPreference && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <InfoIcon className="w-4 h-4 inline mr-2" />
                        Preferred contact method: {userProfile.contactPreference}
                      </p>
                    </div>
                  )}
                </div>

                {/* Contact Buttons - Only shown to non-profile owners */}
                {!isLoggedInUserProfile && (
                  <div className="mt-6 flex gap-3">
                    <Button 
                      className="w-full bg-slate-800 hover:bg-slate-900 text-white"
                      onClick={() => window.location.href = `mailto:${userProfile?.email}`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                    {userProfile?.phone && (
                      <Button 
                        className="w-full border border-slate-800 text-slate-800 hover:bg-slate-50"
                        onClick={() => window.location.href = `tel:${userProfile?.phone}`}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Education */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
                <div className="space-y-3">
                  {userProfile?.education?.map((edu, index) => (
                    <div key={index} className="border-l-2 border-slate-800 pl-3">
                      <div className="font-medium text-gray-900">{edu.degree}</div>
                      <div className="text-sm text-gray-600">{edu.institution}</div>
                      <div className="text-sm text-gray-500">{edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practice Areas */}
              <div className="bg-slate-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Practice Areas</h2>
                <div className="flex flex-wrap gap-2">
                  {userProfile?.practiceAreas?.map((area, index) => (
                    <Badge key={index} className="bg-slate-200 text-slate-800">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ClientProfile = ({ userProfile, isLoggedInUserProfile }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Client Banner */}
      <div className="h-72 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Profile Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-shrink-0">
                <Avatar className="h-40 w-40 border-4 border-white shadow-xl">
                  <AvatarImage src={userProfile?.profilePicture} />
                  <AvatarFallback className="bg-blue-600 text-white text-2xl">
                    {userProfile?.fullname?.[0]}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {userProfile?.fullname}
                      </h1>
                      <Badge className="bg-blue-100 text-blue-700">Client</Badge>
                    </div>
                    <p className="text-gray-600 max-w-2xl mb-4">{userProfile?.bio}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Member since {userProfile?.joinDate}
                      </div>
                    </div>
                  </div>

                  {isLoggedInUserProfile && (
                    <Link to="/account/edit">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Edit Profile
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Case Statistics */}
          <div className="grid grid-cols-4 divide-x divide-gray-200 bg-gray-50">
            {[
              { label: 'Active Cases', value: userProfile?.activeCases?.length || '0' },
              { label: 'Completed Cases', value: userProfile?.completedCases?.length || '0' },
              { label: 'Consultations', value: userProfile?.consultations?.length || '0' },
              { label: 'Documents', value: userProfile?.documents?.length || '0' }
            ].map((stat, index) => (
              <div key={index} className="px-6 py-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-3 gap-8 p-8">
            {/* Left Column - Active Cases */}
            <div className="col-span-2 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Active Cases</h2>
              {userProfile?.activeCases?.map((caseItem, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{caseItem.title}</h3>
                      <p className="text-sm text-gray-600">Case ID: {caseItem.id}</p>
                    </div>
                    <Badge className={
                      caseItem.status === 'Active' ? 'bg-green-100 text-green-700' :
                      caseItem.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }>
                      {caseItem.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Assigned Lawyer</p>
                      <p className="font-medium text-gray-900">{caseItem.lawyer}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Next Hearing</p>
                      <p className="font-medium text-gray-900">{caseItem.nextHearing || 'Not scheduled'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                  {isLoggedInUserProfile && (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Verified Account
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-4">
                  {/* Personal Information Group */}
                  <div className="space-y-3">
                    {/* Full Name */}
                    <div className="flex items-center text-gray-600">
                      <User className="w-5 h-5 mr-3 text-blue-600" />
                      <div>
                        <span className="font-medium text-gray-900">{userProfile?.fullname}</span>
                        {userProfile?.username && (
                          <span className="text-sm text-gray-500 ml-2">(@{userProfile.username})</span>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center justify-between text-gray-600 group">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-3 text-blue-600" />
                        <span>{userProfile?.email}</span>
                      </div>
                      {isLoggedInUserProfile && (
                        <Badge className="bg-blue-100 text-blue-700">Primary</Badge>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="flex items-center justify-between text-gray-600">
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-3 text-blue-600" />
                        <span>{userProfile?.phone || 'Not provided'}</span>
                      </div>
                      {isLoggedInUserProfile && userProfile?.phone && (
                        <Badge className="bg-blue-100 text-blue-700">Verified</Badge>
                      )}
                    </div>

                    {/* Alternative Phone (if provided) */}
                    {userProfile?.alternativePhone && (
                      <div className="flex items-center text-gray-600">
                        <Phone2 className="w-5 h-5 mr-3 text-blue-600" />
                        <span>{userProfile.alternativePhone}</span>
                        <span className="text-sm text-gray-500 ml-2">(Alternative)</span>
                      </div>
                    )}
                  </div>

                  {/* Address Information */}
                  <div className="pt-3 border-t border-gray-200">
                    {/* Current Address */}
                    <div className="flex items-start text-gray-600 mb-3">
                      <MapPin className="w-5 h-5 mr-3 text-blue-600 mt-1" />
                      <div>
                        <span className="block">{userProfile?.address || 'Address not provided'}</span>
                        {userProfile?.city && userProfile?.state && (
                          <span className="text-sm text-gray-500">
                            {userProfile.city}, {userProfile.state}
                            {userProfile.zipCode && ` - ${userProfile.zipCode}`}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Communication Preferences */}
                  {userProfile?.communicationPreference && (
                    <div className="pt-3 border-t border-gray-200">
                      <div className="flex items-center text-gray-600">
                        <Bell className="w-5 h-5 mr-3 text-blue-600" />
                        <span className="text-sm">
                          Preferred contact method: {userProfile.communicationPreference}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Best Time to Contact */}
                  {userProfile?.bestTimeToContact && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-3 text-blue-600" />
                      <span className="text-sm">
                        Best time to contact: {userProfile.bestTimeToContact}
                      </span>
                    </div>
                  )}
                </div>

                {/* Privacy Notice */}
                {isLoggedInUserProfile && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                      <p className="text-sm text-blue-700">
                        Your contact information is only visible to verified lawyers you connect with.
                      </p>
                    </div>
                  </div>
                )}

                {/* Contact Buttons - Only shown to lawyers viewing the profile */}
                {!isLoggedInUserProfile && userProfile?.role === 'client' && (
                  <div className="mt-6 flex gap-3">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => window.location.href = `mailto:${userProfile?.email}`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Client
                    </Button>
                    {userProfile?.phone && (
                      <Button 
                        variant="outline"
                        className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50"
                        onClick={() => window.location.href = `tel:${userProfile?.phone}`}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    )}
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {userProfile?.recentActivity?.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-blue-600"></div>
                      <div>
                        <p className="text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Consultations */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Consultations</h2>
                <div className="space-y-4">
                  {userProfile?.upcomingConsultations?.map((consultation, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <p className="font-medium text-gray-900">{consultation.lawyer}</p>
                      <p className="text-sm text-gray-600">{consultation.date}</p>
                      <p className="text-sm text-gray-500">{consultation.topic}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Main Profile Component
const Profile = () => {
  const { userId } = useParams();
  const { userProfile, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  
  useGetUserProfile(userId);

  if (!userProfile) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  const isLoggedInUserProfile = userProfile?._id === user?._id;
  const isLawyer = userProfile?.role === 'lawyer';

  return (
    <>
      <Navbar />
      {isLawyer ? (
        <LawyerProfile userProfile={userProfile} isLoggedInUserProfile={isLoggedInUserProfile} />
      ) : (
        <ClientProfile userProfile={userProfile} isLoggedInUserProfile={isLoggedInUserProfile} />
      )}
    </>
  );
};

export default Profile;