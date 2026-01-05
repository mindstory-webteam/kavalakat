import FooterTop from '@/components/FooterTop'
import HomepageBlogSection from '@/components/HomepageBlogSection'
import InnerPageHeader from '@/components/InnerPageHeader'
import React from 'react'
import Footer1 from '@/components/Footer'
import Breadcrumb from '@/components/common/Breadcrumb'
import Image from 'next/image'

const page = () => {
    return (
        <>
            <InnerPageHeader />
            <Breadcrumb title="Our Clients" subtitle="Trusted By Leading Industry Partners Relationships." />

            <div className="our-client-page pt-120 mb-120" id="scroll-section">
                <div className="container-fluid">
                    <div className="section-title two text-center mb-80">
                        <h2>Our Global Client</h2>
                    </div>
                    <div className="row g-xl-4 g-lg-3 g-4">
                        <div className="col-lg-4 d-lg-block d-none wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="our-client-img-area">
                                <Image width={540} height={7750} src="/assets/img/innerpages/our-client-img.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="row g-xl-4 g-lg-3 g-4 gy-md-5">
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo1.png" alt="" />
                                        <span>www.qzency.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="300ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo2.png" alt="" />
                                        <span>www.vernex.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo3.png" alt="" />
                                        <span>www.physical.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="500ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo4.png" alt="" />
                                        <span>www.qzency.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo5.png" alt="" />
                                        <span>www.vernex.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="700ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo6.png" alt="" />
                                        <span>www.physical.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo7.png" alt="" />
                                        <span>www.qzency.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo8.png" alt="" />
                                        <span>www.vernex.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="700ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo9.png" alt="" />
                                        <span>www.physical.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo10.png" alt="" />
                                        <span>www.qzency.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="500ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo11.png" alt="" />
                                        <span>www.vernex.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo12.png" alt="" />
                                        <span>www.physical.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="300ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo13.png" alt="" />
                                        <span>www.egenslab.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo14.png" alt="" />
                                        <span>www.egenstheme.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo15.png" alt="" />
                                        <span>www.egenslab.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="300ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo16.png" alt="" />
                                        <span>www.egenslab.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo17.png" alt="" />
                                        <span>www.egenstheme.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 wow animate fadeInDown" data-wow-delay="500ms" data-wow-duration="1500ms">
                                    <div className="client-card magnetic-item">
                                        <Image width={120} height={50} src="/assets/img/innerpages/client-logo18.png" alt="" />
                                        <span>www.egenslab.com</span>
                                        <svg width={35} height={35} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.173267 0H34.9999V6.51953L6.58414 34.9996L0 28.4801L19.4059 9.2646L0.173267 9.43616V0Z" />
                                            <path d="M34.999 34.9996V13.0391L25.6426 22.3037V34.9996H34.999Z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HomepageBlogSection />


            <FooterTop />
            <Footer1 />
        </>
    )
}

export default page
