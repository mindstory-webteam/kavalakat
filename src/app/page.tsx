import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import HomeAboutSection from '../components/HomeAboutSection';  
import HomeServiceSection from '@/components/HomeServiceSection';
import HomePageFeatureSection from '@/components/HomePageFeatureSection';
import HomeVideoSection from '@/components/HomeVideoSection';
import HomePageProjectSection from '@/components/HomePageProjectSection';
import HomeLogoSection from '@/components/HomeLogoSection';
import HomeTestimonialSection from '@/components/HomeTestimonialSection';
import HomeContactSection from '@/components/HomeContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
    <Header />
    <Banner />
    <HomeAboutSection />
    <HomeServiceSection />
    <HomePageFeatureSection />
    <HomeVideoSection />
    <HomePageProjectSection />
    <HomeLogoSection />
    <HomeTestimonialSection />
    <HomeContactSection />
    <Footer />
    
    </>
  );
}
