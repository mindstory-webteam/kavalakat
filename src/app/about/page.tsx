// about/page.tsx
import React from "react";
import InnerPageHeader from "@/components/InnerPageHeader";
import Breadcrumb from "@/components/common/Breadcrumb";
import HomePageAboutSection from "@/components/HomePageAboutSection";
import HomeWhyChooseUsSection from "@/components/HomeWhyChooseUsSection";
import HomePageAboutFeatureSection from "@/components/HomePageAboutFeatureSection";
import HomaPageVideoSection from "@/components/HomaPageVideoSection";
import HomePageCounterSection from "@/components/HomePageCounterSection";
import HomePageTeamSection from "@/components/HomePageTeamSection";
import HomepageBlogSection from "@/components/HomepageBlogSection";
import FooterTop from "@/components/FooterTop";
import Footer from "@/components/Footer";



const AboutPage: React.FC = () => {
  return (
    <>
      <InnerPageHeader />
            <Breadcrumb title="About Us" subtitle="Our Story of Manufacturing Excellence Built on."  image="/assets/new-images/about-page/banner/b-1.jpeg"  />
            <HomePageAboutSection />
            <HomeWhyChooseUsSection />
            <HomePageAboutFeatureSection />
             <HomaPageVideoSection />
      <HomePageCounterSection />
      <HomePageTeamSection />
      <HomepageBlogSection />
      <FooterTop />
      <Footer />

     
    </>
  );
};

export default AboutPage;
