
import Link from 'next/link'
import React from 'react'

const HomeAboutSection = () => {
    return (
        <div className="home3-about-section mb-120">
            <div className="container">
                <div className="row gy-4 align-items-center">
                    <div className="col-lg-6 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="about-content-wrap">
                            <div className="section-title two">
                                <h2>About Our Company</h2>
                                <p>Kavalakat group of companies is a leading supplier of construction materials in the state of Kerala. Established in 1975, we have over 40 years of experience servicing the construction industry and are the preferred channel partners for major Indian brands of steel and cement with offices in Thrissur, Palakkad and Ernakulum districts. Over the years the groups’ portfolio has been expanded to incorporate construction materials like white cement, putty, sheet, pipe and paint. With our un-paralleled service, on-time delivery and competitive prices we have established ourselves as an ideal ally for major builders and contractors across the state.</p>
                            </div>
                           
                        </div>
                    </div>
                    <div className="col-lg-6 wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="about-img-wrap">
                            <div className="about-img">
                                <img width={560} height={620} src="/assets/new-images/freepik__create-a-highquality-ultrarealistic-industrial-adv__53101.jpeg" alt="" />
                            </div>
                            <div className="about-btn">
                                <Link className="primary-btn3" href="/about">
                                    <span>About Us More
                                    </span>
                                    <span>About Us More
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
                </div>
            </div>
        </div>

    )
}

export default HomeAboutSection
