import Image from 'next/image'
import React from 'react'

const HomeLogoSection = () => {
    return (
        <div className="logo-section two">
            <div className="container-fluid">
                <div className="logo-wrap">
                    <div className="logo-title">
                        <h6>A partner, Not A Vendor:</h6>
                    </div>
                    <div className="marquee">
                        <div className="marquee__group">
                            <a href="#"> <Image width={150} height={50} src="/assets/img/home3/partner-01.png" alt="" /></a>
                            <a href="#"><Image width={150} height={50} src="/assets/img/home3/partner-02.png" alt="" /></a>
                            <a href="#"><Image width={150} height={50} src="/assets/img/home3/partner-03.png" alt="" /></a>
                            <a href="#"><Image width={150} height={50} src="/assets/img/home3/partner-04.png" alt="" /></a>
                            <a href="#"><Image width={150} height={50} src="/assets/img/home3/partner-05.png" alt="" /></a>
                            <a href="#"><Image width={150} height={50} src="/assets/img/home3/partner-06.png" alt="" /></a>
                        </div>
                        <div aria-hidden="true" className="marquee__group">
                            <a href="#"><Image width={150} height={50} src="/assets/img/home3/partner-01.png" alt="" /></a>
                            <a href="#"><Image width={150} height={50} src="/assets/img/home3/partner-02.png" alt="" /></a>
                            <a href="#"><Image width={150} height={50} src="/assets/img/home3/partner-03.png" alt="" /></a>
                            <a href="#"><Image width={150} height={50} src="/assets/img/home3/partner-04.png" alt="" /></a>
                            <a href="#"><Image width={150} height={50} src="/assets/img/home3/partner-05.png" alt="" /></a>
                            <a href="#"><Image width={150} height={50} src="/assets/img/home3/partner-06.png" alt="" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomeLogoSection
