
"use client"
import { useCircularTextByClass } from '@/customHooks/useCircularTextByClass';
import Link from 'next/link';
import React, { useEffect } from 'react'
import CircularText from '@/components/common/CircularText';

const Banner = () => {
     useCircularTextByClass("circular-text");
 
    return (
        <>
            <div className="home1-banner-section mb-120">
                <div className="container-fluid">
                    <div className="banner-wrapper">
                        <div className="banner-content-wrap">
                            <div className="banner-content wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                                <h1>Modern Factory Operation Innovative Facility.</h1>
                                <div className="btn-grp">
                                    <Link className="primary-btn1" href="/project">
                                        <span>Start A Project
                                        </span>
                                        <span>Start A Project
                                        </span>
                                        <svg className="arrow" width={23} height={23} viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                                            <g>
                                                <path d="M0.113861 0H22.9999V4.28425L4.32671 22.9997L0 18.7154L12.7524 6.08815L0.113861 6.20089V0Z" />
                                                <path d="M23 22.9996V8.56848L16.8516 14.6566V22.9996H23Z" />
                                            </g>
                                        </svg>
                                    </Link>
                                    <Link className="discuss-btn" href="/contact">
                                        Let’s Discuss
                                        <svg width={9} height={9} viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z" />
                                            <path d="M9.0002 8.99999V3.35294L6.59424 5.73529V8.99999H9.0002Z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <CircularText />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner
