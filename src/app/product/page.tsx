import FooterTop from '@/components/FooterTop'

import InnerPageHeader from '@/components/InnerPageHeader'
import Link from 'next/link'
import React from 'react'
import Footer1 from '@/components/Footer'
import Breadcrumb from '@/components/common/Breadcrumb'
import Image from 'next/image'

const ProductPage = () => {
    return (
        <>
            <InnerPageHeader />
            <Breadcrumb title="Our Product" subtitle="Products Power Progress Explore Our Offer." image='/assets/new-images/bm/bm-2.jpeg' />
         

            <div className="product-page pt-120 mb-120" id="scroll-section">
                <div className="container">
                    <div className="product-card-wrap mb-70">
                        <div className="row g-0">
                            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                <div className="product-card">
                                    <div className="product-img">
                                        <Image width={340} height={270} src="/assets/new-images/products/p-1.jpeg" alt="" />
                                        <Link href="/product/cement" className="arrow">
                                            <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
                                                <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h4><Link href="/product/cement">Cement</Link></h4>
                                        <p>Supplied from trusted brands with efficient handling and timely dispatch to support strong and consistent construction timelines.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                                <div className="product-card">
                                    <div className="product-img">
                                        <Image width={340} height={270} src="/assets/new-images/products/p-2.jpeg" alt="" />
                                        <Link href="/product/steel" className="arrow">
                                            <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
                                                <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h4><Link href="/product/steel">Steel</Link></h4>
                                        <p>High-quality, certified steel processed and delivered through streamlined operations for structural reliability and project efficiency.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                                <div className="product-card">
                                    <div className="product-img">
                                        <Image width={340} height={270} src="/assets/new-images/products/p-3.jpeg" alt="" />
                                        <Link href="/product/white-cement-paint" className="arrow">
                                            <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
                                                <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h4><Link href="/product/white-cement-paint">White Cement & Paint</Link></h4>
                                        <p>Carefully stored and managed to maintain quality, ensuring smooth supply for finishing and aesthetic construction needs.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                                <div className="product-card">
                                    <div className="product-img">
                                        <Image width={340} height={270} src="/assets/new-images/products/p-4.jpeg" alt="" />
                                        <Link href="/product/sheet-pipe" className="arrow">
                                            <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
                                                <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h4><Link href="/product/sheet-pipe">Sheet & Pipe</Link></h4>
                                        <p>Handled with precision and organized dispatch systems to ensure damage-free delivery and site-ready usage.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                                <div className="product-card">
                                    <div className="product-img">
                                        <Image width={340} height={270} src="/assets/new-images/products/p-5.jpeg" alt="" />
                                        <Link href="/product/abrasives-construction-chemicals" className="arrow">
                                            <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
                                                <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h4><Link href="/product/abrasives-construction-chemicals">Abrasives & Construction Chemicals</Link></h4>
                                        <p>Specialty products managed through controlled workflows to ensure safety, accuracy, and performance consistency.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                                <div className="product-card">
                                    <div className="product-img">
                                        <Image width={340} height={270} src="/assets/new-images/products/p-6.jpeg" alt="" />
                                        <Link href="/product/logistics" className="arrow">
                                            <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
                                                <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h4><Link href="/product/logistics">Logistics</Link></h4>
                                        <p>Integrated logistics support with planned routing and on-time delivery, ensuring uninterrupted material flow to project sites.</p>
                                    </div>
                                </div>
                            </div>
                           
                           
                        </div>
                    </div>
                    <div className="row bounce_up">
                       
                    </div>
                </div>
            </div>

            <FooterTop />
            <Footer1 />
        </>
    )
}

export default ProductPage
