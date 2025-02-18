import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestLawyers from './LatestLawyers'
import Footer from './shared/Footer'
import useGetAllLawyers from '@/hooks/useGetAllLawyers'
import { useSelector } from 'react-redux'

const About = () => {
  useGetAllLawyers();
  const { user } = useSelector(store => store.auth);
  
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestLawyers />
      <Footer />
    </div>
  )
}

export default About