import Image from 'next/image'
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
                                <h2>About Our Company Mission &amp; Vision</h2>
                                <p>We understand your needs and deliver digital marketing through unique selling proposition. Our team of experts is passionate about helping you SEO company. Choose us and experience the difference! Looking for something different?  We challenge the status quo with innovative solutions and a [company culture adjective] approach.  Let us show you how we can help you achieve desired outcome in a way you won't expect.</p>
                            </div>
                            <ul>
                                <li>
                                    <div className="single-content">
                                        <h6>WHO WE ARE</h6>
                                        <p>Sed nisl eros, condimentum nec risussit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                                    </div>
                                </li>
                                <li>
                                    <svg width={100} height={74} viewBox="0 0 100 74" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.8338 3.5C3.8338 4.97276 5.02771 6.16667 6.50046 6.16667C7.97322 6.16667 9.16713 4.97276 9.16713 3.5C9.16713 2.02724 7.97322 0.833333 6.50046 0.833333C5.02771 0.833333 3.8338 2.02724 3.8338 3.5ZM15.0001 53L14.9241 53.4942L15.0001 53ZM98.4667 73.4989C98.7423 73.5173 98.9805 73.3088 98.9989 73.0333L99.2982 68.5432C99.3166 68.2677 99.1081 68.0294 98.8326 68.0111C98.557 67.9927 98.3188 68.2012 98.3004 68.4767L98.0344 72.4678L94.0432 72.2018C93.7677 72.1834 93.5294 72.3919 93.5111 72.6674C93.4927 72.943 93.7012 73.1812 93.9767 73.1996L98.4667 73.4989ZM6.0559 3.27118C3.09924 9.01554 0.00693369 20.6738 0.262935 31.312C0.391006 36.6341 1.35778 41.7518 3.64242 45.7571C5.93936 49.7839 9.56135 52.6692 14.9241 53.4942L15.0761 52.5058C10.0389 51.7309 6.66924 49.0452 4.51104 45.2616C2.34055 41.4565 1.38865 36.5243 1.26265 31.288C1.01049 20.8095 4.06836 9.31779 6.94503 3.72882L6.0559 3.27118ZM14.9241 53.4942C21.4708 54.5014 28.4469 54.4999 35.5791 54.3749C42.7244 54.2497 50.0243 54.0007 57.2782 54.4988C71.7615 55.4934 85.9903 59.4625 98.1237 73.3293L98.8763 72.6707C86.5096 58.5375 71.9884 54.5066 57.3468 53.5012C50.0382 52.9993 42.682 53.2503 35.5616 53.3751C28.4283 53.5001 21.5294 53.4986 15.0761 52.5058L14.9241 53.4942Z" />
                                    </svg>
                                    <div className="single-content">
                                        <h6>OUR MISSION</h6>
                                        <p>Sed nisl eros, condimentum nec risussit amet finibus cons sem fusce. Advantage of thes limited-time offers &amp; start.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="about-img-wrap">
                            <div className="about-img">
                                <Image width={560} height={620} src="/assets/img/home3/about-img.jpg" alt="" />
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
