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
            <Breadcrumb title="Our Product" subtitle="Products Power Progress Explore Our Offer." />
         

            <div className="product-page pt-120 mb-120" id="scroll-section">
                <div className="container">
                    <div className="product-card-wrap mb-70">
                        <div className="row g-0">
                            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                <div className="product-card">
                                    <div className="product-img">
                                        <Image width={340} height={270} src="/assets/img/home4/product-img1.jpg" alt="" />
                                        <Link href="/product/details" className="arrow">
                                            <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
                                                <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h4><Link href="/product/details">Steel Sheets &amp; Plates</Link></h4>
                                        <p>Sed nisl eros, condimentum nec risusit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                                <div className="product-card">
                                    <div className="product-img">
                                        <Image width={340} height={270} src="/assets/img/home4/product-img2.jpg" alt="" />
                                        <Link href="/product/details" className="arrow">
                                            <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
                                                <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h4><Link href="/product/details">Copper Pipes &amp; Tubes</Link></h4>
                                        <p>Sed nisl eros, condimentum nec risusit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                                <div className="product-card">
                                    <div className="product-img">
                                        <Image width={340} height={270} src="/assets/img/home4/product-img3.jpg" alt="" />
                                        <Link href="/product/details" className="arrow">
                                            <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
                                                <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h4><Link href="/product/details">Stainless Steel Coils</Link></h4>
                                        <p>Sed nisl eros, condimentum nec risusit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                                <div className="product-card">
                                    <div className="product-img">
                                        <Image width={340} height={270} src="/assets/img/home4/product-img4.jpg" alt="" />
                                        <Link href="/product/details" className="arrow">
                                            <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
                                                <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h4><Link href="/product/details">Brass Rods &amp; Sheets</Link></h4>
                                        <p>Sed nisl eros, condimentum nec risusit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                                <div className="product-card">
                                    <div className="product-img">
                                        <Image width={340} height={270} src="/assets/img/innerpages/product-img1.jpg" alt="" />
                                        <Link href="/product/details" className="arrow">
                                            <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
                                                <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h4><Link href="/product/details">High-Strength Rebar</Link></h4>
                                        <p>Sed nisl eros, condimentum nec risusit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                                <div className="product-card">
                                    <div className="product-img">
                                        <Image width={340} height={270} src="/assets/img/innerpages/product-img2.jpg" alt="" />
                                        <Link href="/product/details" className="arrow">
                                            <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
                                                <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h4><Link href="/product/details">Precision Metal</Link></h4>
                                        <p>Sed nisl eros, condimentum nec risusit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                                <div className="product-card">
                                    <div className="product-img">
                                        <Image width={340} height={270} src="/assets/img/innerpages/product-img3.jpg" alt="" />
                                        <Link href="/product/details" className="arrow">
                                            <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
                                                <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h4><Link href="/product/details">Factory Aluminum</Link></h4>
                                        <p>Sed nisl eros, condimentum nec risusit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                <div className="product-card">
                                    <div className="product-img">
                                        <Image width={340} height={270} src="/assets/img/innerpages/product-img4.jpg" alt="" />
                                        <Link href="/product/details" className="arrow">
                                            <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
                                                <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h4><Link href="/product/details">Pre-Stress Steel Beam</Link></h4>
                                        <p>Sed nisl eros, condimentum nec risusit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                <div className="product-card">
                                    <div className="product-img">
                                        <Image width={340} height={270} src="/assets/img/innerpages/product-img5.jpg" alt="" />
                                        <Link href="/product/details" className="arrow">
                                            <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
                                                <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="product-content">
                                        <h4><Link href="/product/details">Reinforced Concrete</Link></h4>
                                        <p>Sed nisl eros, condimentum nec risusit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row bounce_up">
                        <div className="col-lg-12 d-flex justify-content-center">
                            <a className="primary-btn1 black-bg" href="#">
                                <span>Load More
                                </span>
                                <span>Load More
                                </span>
                                <svg className="arrow" width={23} height={23} viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <path d="M0.113861 0H22.9999V4.28425L4.32671 22.9997L0 18.7154L12.7524 6.08815L0.113861 6.20089V0Z" />
                                        <path d="M23 22.9996V8.56848L16.8516 14.6566V22.9996H23Z" />
                                    </g>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <FooterTop />
            <Footer1 />
        </>
    )
}

export default ProductPage
