"use client"
import FooterTop from '@/components/FooterTop'
import InnerPageHeader from '@/components/InnerPageHeader'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import Footer1 from '@/components/Footer'
import Breadcrumb from '@/components/common/Breadcrumb'
import Image from 'next/image'


import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { useState } from 'react'
import CompanyCard from '@/components/CompanyCard'

const ProductPage = () => {
   
   const [currentSlide, setCurrentSlide] = useState<number>(0)

  const [activeAccordion1, setActiveAccordion1] = useState<string | null>(null)
  const [activeAccordion2, setActiveAccordion2] = useState<string | null>(null)

  // ✅ Correct ref type for setInterval
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null)

  const testimonials = [
    {
      quote: 'Excellent quality production!',
      text: 'Prices were competitive compared to other steel dealers nearby. Material quality was consistent, and there were no issues during fabrication or bending.',
      author: 'Steve Mathew',
      role: 'Founder, Egenslab',
      img: '/assets/new-images/icon-person/5856.jpg',
    },
    {
      quote: 'Best communication & deliver',
      text: 'They were very transparent about steel specifications and weights. No confusion or hidden charges at all.',
      author: 'Ram Mohan',
      role: 'Founder, Triprex',
      img: '/assets/new-images/icon-person/5856.jpg',
    },
    {
      quote: 'Outstanding material quality!',
      text: 'Delivery updates were timely and accurate. Overall experience felt honest, local, and dependable.',
      author: 'Akash Menon',
      role: 'Founder, Axleo',
      img: '/assets/new-images/icon-person/5856.jpg',
    },
  ]



  const companies = [
    {
      logo: '/assets/new-images/products/steel-partens/steel1.jpg',
      logoAlt: 'Vizag Steel Logo',
      companyName: 'VIZAG',
      description:
        'RINL, VSP has been a forerunner in the exploring new technologies in steel making and stands tall in its stature being the pioneer of various new techniques in the field. Be it the use of Pulverised Coal Injection in Blast Furnace or the circular coolers in Sinter Plant, VSP ...',
    },
    {
      logo: '/assets/new-images/products/steel-partens/steel2.jpg',
      logoAlt: 'Tulsyan NEC Steel Logo',
      companyName: 'TULSYAN',
      description:
        "Tulsyan NEC Steel is one of India's leading manufacturers of Thermo Mechanically Treated (TMT) Bars. The company was initially known as the National Engineering Company until the early 90s, when it was renamed Tulsyan NEC. Today, Tulsyan is listed on the Indian stock exchange.",
    },
    {
     logo: '/assets/new-images/products/steel-partens/steel3.jpg',
      logoAlt: 'Tata Tiscon Logo',
      companyName: 'TATA',
      description:
        'The Tata group comprises over 100 operating companies in seven business sectors: communications and information technology, engineering, materials, services, energy, consumer products and chemicals.',
    },
    {
     logo: '/assets/new-images/products/steel-partens/steel4.jpg',
      logoAlt: 'Tata Tiscon Logo',
      companyName: 'SAIL',
      description:
        'Steel Authority of India Limited (SAIL) is the largest steel-making company in India and one of the seven Maharatna’s of the country’s Central Public Sector Enterprises.',
    },
    {
     logo: '/assets/new-images/products/steel-partens/steel5.jpg',
      logoAlt: 'Tata Tiscon Logo',
      companyName: 'KAIRALI TMT',
      description:
        'Kairali TMT Steel Bars is the flagship division of Kairali Ventures. Our legacy of over 125 years in the Steel Industry has secured us a top most spot as a leading producer of quality TMT Steel Bars in South India',
    },
    
    {
     logo: '/assets/new-images/products/steel-partens/steel6.jpg',
      logoAlt: 'Tata Tiscon Logo',
      companyName: 'JSW',
      description:
        'The JSW Group is known across the country as “strategic first mover”. It is a $13 billion leading conglomerate, with a presence across all the vital sectors of the Indian economy. ',
    }
    
  ];

  /* ---------------- AUTO SLIDER ---------------- */

  useEffect(() => {
    startAutoSlide()
    return () => stopAutoSlide()
  }, [])

  const startAutoSlide = () => {
    stopAutoSlide()
    autoSlideRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    }, 4000)
  }

  const stopAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current)
    }
  }

  const nextSlide = () => {
    stopAutoSlide()
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
    startAutoSlide()
  }

  const prevSlide = () => {
    stopAutoSlide()
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
    startAutoSlide()
  }

  /* ---------------- ACCORDION ---------------- */

  const toggleAccordion1 = (id: string) => {
    setActiveAccordion1(activeAccordion1 === id ? null : id)
  }

  const toggleAccordion2 = (id: string) => {
    setActiveAccordion2(activeAccordion2 === id ? null : id)
  }


    return (
        <>
            <InnerPageHeader />
          
            <Breadcrumb title="Neyy Vedhyam" subtitle="Premium Vegetarian Cuisine by the Kavalakat Group" image='/assets/new-images/bm/bm-3.jpeg' />
            
            <div className="product-details-top-area pt-120 mb-120" id="scroll-section">
                <div className="container">
                    <div className="row gy-md-5 gy-4 align-items-lg-end">
                        <div className="col-lg-8 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
  <div className="details-content">
    <h2>Neyy Vedyam – Premium Vegetarian Restaurant in Thrissur</h2>

    <p>
      Neyy Vedyam is a culinary venture under the Kavalakat Group, located in Thrissur, Kerala.
      It houses a 72-seater premium vegetarian restaurant spread across two floors,
      offering a refined and comfortable dining experience. Building on the group’s strong reputation in construction and hospitality,
      Neyy Vedyam focuses on delivering authentic, high-quality vegetarian cuisine.
      The restaurant blends traditional flavors with modern presentation,
      ensuring exceptional taste, hygiene, and customer satisfaction.
    </p>


    <p>
      Designed to provide a warm and welcoming ambiance, Neyy Vedyam is ideal
      for families, business gatherings, and special occasions, making it
      a preferred destination for premium vegetarian dining in Thrissur.
    </p>

  </div>
</div>

                        <div className="col-lg-4 wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="product-img">
                                <Image width={340} height={270} src="/assets/new-images/products/p-2.jpeg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 1: Product Details FAQ */}
            <div className="product-dt-faq-section mb-120">
                <div className="container">
                    <div className="product-dt-faq-wrapper">
                        <div className="row g-0">
                            <div className="col-lg-6 d-none d-lg-block">
                                <div className="product-dt-faq-img">
                                    <Image 
                                        width={650} 
                                        height={650} 
                                        src="/assets/new-images/about-page/steel/steel-prodect-page.png" 
                                        alt="FAQ" 
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="faq-content-area p-4">
                                    <h2 className="mb-4">Steel Products</h2>
                                    
                                    <div className="faq-wrap">
                                        <div className="accordion" id="accordionExample">
                                            {[
                                                {
                                                    id: 'collapseOne',
                                                    title: 'Discover Neyy Vedyam',
                                                    content: 'Neyy Vedyam is a culinary venture by the Kavalakat Group, located in the heart of Thrissur. It offers an authentic, premium vegetarian dining experience rooted in tradition and quality.'
                                                },
                                                {
                                                    id: 'collapseTwo',
                                                    title: 'Dining Capacity & Ambience',
                                                    content: 'The restaurant features a beautifully designed two-floor setup with a total seating capacity of 72, offering a calm and refined environment suitable for families, groups, and corporate diners.'
                                                },
                                                {
                                                    id: 'collapseThree',
                                                    title: 'Cuisine & Speciality',
                                                    content: 'Neyy Vedyam focuses on serving high-quality, authentic vegetarian cuisine with an emphasis on purity, taste, and traditional Kerala flavours.'
                                                },
                                                {
                                                    id: 'collapseFour',
                                                    title: 'Brand Legacy & Trust',
                                                    content: 'Backed by the long-standing reputation of the Kavalakat Group in construction and hospitality, Neyy Vedyam reflects the same commitment to excellence, comfort, and customer satisfaction.'
                                                },
                                                
                                                     
                                            ].map((item, index) => (
                                                <div className="accordion-item mb-3 animated-accordion" key={item.id}>
                                                    <h2 className="accordion-header">
                                                        <button 
                                                            className={`accordion-button ${activeAccordion1 === item.id ? '' : 'collapsed'}`}
                                                            type="button"
                                                            onClick={() => toggleAccordion1(item.id)}
                                                        >
                                                            {item.title}
                                                            
                                                        </button>
                                                    </h2>
                                                    <div 
                                                        className={`accordion-collapse ${activeAccordion1 === item.id ? 'show' : ''}`}
                                                        style={{
                                                            maxHeight: activeAccordion1 === item.id ? '500px' : '0',
                                                            overflow: 'hidden',
                                                            transition: 'max-height 0.4s ease-in-out'
                                                        }}
                                                    >
                                                        <div className="accordion-body">
                                                            {item.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                         <Link className="primary-btn1 black-bg" href="/contact">
                            <span>Contact With Us
                            </span>
                            <span>Contact With Us
                            </span>
                            <svg className="arrow" width={23} height={23} viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path d="M0.113861 0H22.9999V4.28425L4.32671 22.9997L0 18.7154L12.7524 6.08815L0.113861 6.20089V0Z" />
                                    <path d="M23 22.9996V8.56848L16.8516 14.6566V22.9996H23Z" />
                                </g>
                            </svg>
                        </Link>
                    </div>
                    
                </div>
                
            </div>



 
        

       
            {/* Section 2: Why Choose Us */}
{/* <div className="home2-why-choose-us-section two mb-120">
  <div className="container">
    <div className="row g-4 align-items-center justify-content-between mb-60">
      <div className="col-xl-6 col-lg-8">
        <div className="section-title">
          <span>Product Features</span>
          <h2>Cold-Rolled Coil Products</h2>
        </div>
      </div>
    </div>

    <div className="row justify-content-xl-end">
      <div className="col-xl-11">
        <div className="faq-content">
          <div className="accordion" id="accordionTravel">

            {[
              {
                id: 'travelcollapseOne',
                num: '01',
                title: 'Solutions Expert',
                img: '/assets/new-images/products/steel-partens/steel1.jpg',
                content:
                  'We provide expert solutions tailored to industry needs, ensuring efficiency, reliability, and high-performance materials for every application.'
              },
              {
                id: 'travelcollapseTwo',
                num: '02',
                title: 'Trusted Partner',
                img: '/assets/new-images/products/steel-partens/steel2.jpg',
                content:
                  'As a trusted partner, we prioritize transparency, consistency, and long-term relationships built on quality and trust.'
              },
              {
                id: 'travelcollapseThree',
                num: '03',
                title: 'Driving Innovation',
                img: '/assets/new-images/products/steel-partens/steel3.jpg',
                content:
                  'We continuously innovate through advanced processes and modern technology to deliver superior product performance.'
              },
              {
                id: 'travelcollapseFour',
                num: '04',
                title: 'Material Science Excellence',
                img: '/assets/new-images/products/steel-partens/steel4.jpg',
                content:
                  'Our focus on material science enhances durability, strength, and sustainability across all product lines.'
              },
              {
                id: 'travelcollapseFive',
                num: '05',
                title: 'Quality as Standard',
                img: '/assets/new-images/products/steel-partens/steel5.jpg',
                content:
                  'Every product meets strict quality standards, ensuring consistent performance and long-term reliability.'
              }
            ].map((item) => (
              <div className="accordion-item mb-3 animated-accordion" key={item.id}>
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${
                      activeAccordion2 === item.id ? '' : 'collapsed'
                    }`}
                    type="button"
                    onClick={() => toggleAccordion2(item.id)}
                  >
                    <span className="accordion-number">{item.num}.</span>
                    {item.title}
                  </button>
                </h2>

                <div
                  className={`accordion-collapse ${
                    activeAccordion2 === item.id ? 'show' : ''
                  }`}
                  style={{
                    maxHeight: activeAccordion2 === item.id ? '600px' : '0',
                    opacity: activeAccordion2 === item.id ? 1 : 0,
                    transform:
                      activeAccordion2 === item.id
                        ? 'translateY(0)'
                        : 'translateY(-10px)',
                    overflow: 'hidden',
                    transition: 'all 0.45s ease'
                  }}
                >
                  <div className="accordion-body">
                    <div className="content-wrapper">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={283}
                        height={170}
                        className="feature-img"
                      />

                      <div className="text-content">
                        <p>{item.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  </div>
</div> */}


          {/* Section 3: Testimonials */}
            <div className="home1-testimonial-section ">
                <div className="container-fluid">
                    <div className="row gy-5">
                        <div className="col-xl-4">
                            <div className="testimonial-title-area">
                                <div className="section-title">
                                    <span>Our Client Testimonial</span>
                                    <h2>Trusted by Our Partners.</h2>
                                    <p>Sed nisl eros, condimentum nec risus sitamet, finibus congu. Fusen fringilla est libero, sed tempus urna feugiat eu. Curabit eu feugiat ligu Suspendisse nectoraba.</p>
                                </div>
                                <ul className="rating-list mt-4">
                                    <li className="mb-3">
                                        <a href="https://clutch.co/" className="single-rating d-flex align-items-center gap-3 p-3 border rounded">
                                            <div className="review">
                                                <span className="d-block small">Review On</span>
                                                <Image width={60} height={20} src="/assets/img/home1/icon/clutch-logo.svg" alt="Clutch" />
                                            </div>
                                            <div className="rating">
                                                <ul className="star d-flex gap-1">
                                                    <li><i className="bi bi-star-fill text-warning" /></li>
                                                    <li><i className="bi bi-star-fill text-warning" /></li>
                                                    <li><i className="bi bi-star-fill text-warning" /></li>
                                                    <li><i className="bi bi-star-fill text-warning" /></li>
                                                    <li><i className="bi bi-star-half text-warning" /></li>
                                                </ul>
                                                <span className="small">(50 reviews)</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="mb-3">
                                        <a href="https://www.google.com/" className="single-rating google d-flex align-items-center gap-3 p-3 border rounded">
                                            <div className="review">
                                                <span className="d-block small">Review On</span>
                                                <Image width={60} height={20} src="/assets/img/home1/icon/google-logo.svg" alt="Google" />
                                            </div>
                                            <div className="rating">
                                                <ul className="star d-flex gap-1">
                                                    <li><i className="bi bi-star-fill text-warning" /></li>
                                                    <li><i className="bi bi-star-fill text-warning" /></li>
                                                    <li><i className="bi bi-star-fill text-warning" /></li>
                                                    <li><i className="bi bi-star-fill text-warning" /></li>
                                                    <li><i className="bi bi-star-half text-warning" /></li>
                                                </ul>
                                                <span className="small">(50 reviews)</span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-8">
                            <div className="position-relative">
                                <div className="testimonial-slider">
                                    <div className="testimonial-card bg-white p-4 rounded shadow-sm fade-in">
                                        <svg className="quote mb-3" width={46} height={42} viewBox="0 0 46 42" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M19.3074 22.4375C19.0109 24.7824 18.4898 27.0555 17.9059 28.5469C15.8664 33.7848 11.2574 38.277 5.21094 40.9184C4.07891 41.4125 3.00977 41.2418 2.37188 40.4691C2.22813 40.2895 1.64415 39.1754 1.07813 38.0074L1.07111 37.9928C0.0628121 35.8959 0.0449269 35.8587 0.0449268 35.2402C0.0539122 34.0902 0.413287 33.668 2.06641 32.8773C5.27383 31.332 7.16055 29.5801 8.40039 26.9746C8.98438 25.7438 9.28086 24.8543 9.55938 23.4707C9.73907 22.5723 9.97266 20.5867 9.97266 19.9129C9.97266 19.7422 9.87383 19.7422 6.21719 19.7422L2.46172 19.7422L1.99454 19.5086C1.73399 19.3828 1.40157 19.1313 1.25782 18.9516C1.18695 18.8658 1.12525 18.7941 1.07158 18.7167C0.703361 18.1862 0.713199 17.3932 0.736722 10.0301L0.73675 10.0223C0.763674 2.37538 0.763737 2.3573 0.952347 1.99805C1.22188 1.50391 1.58125 1.15352 2.06641 0.928908C2.47071 0.740236 2.5336 0.740236 10.2871 0.740235L18.1035 0.740235L18.4719 0.937891C18.948 1.18945 19.3344 1.57578 19.55 2.01602C19.7117 2.33945 19.7207 2.68086 19.7207 10.2188C19.7207 18.3945 19.6848 19.4996 19.3074 22.4375Z" fill="currentColor" />
                                        </svg>
                                        <span className="d-block fw-bold mb-2">{testimonials[currentSlide].quote}</span>
                                        <p className="mb-4">{testimonials[currentSlide].text}</p>
                                        <div className="author-area d-flex align-items-center gap-3">
                                            <div className="author-img">
                                                <Image width={50} height={50} src={testimonials[currentSlide].img} alt={testimonials[currentSlide].author} className="rounded-circle" />
                                            </div>
                                            <div className="author-content">
                                                <h5 className="mb-0">{testimonials[currentSlide].author}</h5>
                                                <span className="small text-muted">{testimonials[currentSlide].role}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Enhanced Navigation Buttons */}
                                <div className="slider-btn-grp d-flex gap-3 mt-4 justify-content-center">
                                    <button 
                                        className="slider-btn testimonial-slider-prev"
                                        onClick={prevSlide}
                                        aria-label="Previous testimonial"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                    
                                    {/* Slide Indicators */}
                                    <div className="d-flex align-items-center gap-2">
                                        {testimonials.map((_, index) => (
                                            <button
                                                key={index}
                                                className={`slide-indicator ${currentSlide === index ? 'active' : ''}`}
                                               onClick={() => {
  stopAutoSlide()
  setCurrentSlide(index)
  startAutoSlide()
}}

                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                    
                                    <button 
                                        className="slider-btn testimonial-slider-next"
                                        onClick={nextSlide}
                                        aria-label="Next testimonial"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <style>
    {`
    /* Layout */
.content-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 24px;
}

.feature-img {
  border-radius: 10px;
  flex-shrink: 0;
}

/* Text animation */
.text-content {
  opacity: 0;
  transform: translateX(30px);
  transition: all 0.4s ease;
}

.accordion-collapse.show .text-content {
  opacity: 1;
  transform: translateX(0);
}

/* Image animation */
.animated-accordion .feature-img {
  transform: scale(0.95);
  transition: transform 0.4s ease;
}

.animated-accordion .accordion-collapse.show .feature-img {
  transform: scale(1);
}

/* Mobile */
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
  }
}


.testimonial-card {
  animation: fadeSlide 0.6s ease;
}

@keyframes fadeSlide {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

`}
</style>

          
            <FooterTop />
            <Footer1 />
        </>
    )
}

export default ProductPage