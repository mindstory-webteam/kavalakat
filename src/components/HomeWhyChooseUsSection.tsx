"use client";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Accordion } from 'react-bootstrap'

const HomeWhyChooseUsSection: React.FC = () => {
    return (
        <>
            <div className="home2-why-choose-us-section mb-120">
                <div className="container">
                    <div className="row g-4 align-items-center justify-content-between mb-60">
                        <div className="col-xl-6 col-lg-8 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="section-title two">
                                <span>Why Work With Us</span>
                                <h2>Why We’re the Right Choice Industry</h2>
                            </div>
                        </div>
                        <div className="col-lg-3 d-flex justify-content-lg-end btn_wrapper">
                            <Link href="/contact" className="contact-btn">
                                <div className="primary-btn2 two">
                                    <span>Contact Now</span>
                                    <svg className="arrow" width={23} height={23} viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path d="M0.113861 0H22.9999V4.28425L4.32671 22.9997L0 18.7154L12.7524 6.08815L0.113861 6.20089V0Z" />
                                            <path d="M23 22.9996V8.56848L16.8516 14.6566V22.9996H23Z" />
                                        </g>
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="row justify-content-xl-end">
                        <div className="col-xl-11">
                            <div className="faq-content">
                               <div className="row justify-content-xl-end">
      <div className="col-xl-11">
        <div className="faq-content">
          <Accordion defaultActiveKey="0">
            {/* 01 */}
            <Accordion.Item
              eventKey="0"
              className="wow animate fadeInDown"
              data-wow-delay="200ms"
              data-wow-duration="1500ms"
            >
              <Accordion.Header>
                <span>01.</span> Solutions Expert
              </Accordion.Header>
              <Accordion.Body>
                <Image
                  width={283}
                  height={171}
                  src="/assets/img/home2/why-choose-img1.jpg"
                  alt="choose-img1"
                />
                Spanish mackerel yellow weaver sigils. Sunporch flying fish
                yellowfin cutthroat trout grouper whitebait oneamt horsefish
                bullhead shark California smoothtongue, striped burrfish
                threadtail saber-toothed blenny Red Seden ut perspiciatis unde
                omnis iste natus ut perspic iatis unde omnis iste perspiciatis
                ut perspiciatis unde omnison iste natus we are work industry
                very fast and worked smoothly.
              </Accordion.Body>
            </Accordion.Item>

            {/* 02 */}
            <Accordion.Item
              eventKey="1"
              className="wow animate fadeInDown"
              data-wow-delay="400ms"
              data-wow-duration="1500ms"
            >
              <Accordion.Header>
                <span>02.</span> Trusted Partner
              </Accordion.Header>
              <Accordion.Body>
                <Image
                  width={283}
                  height={171}
                  src="/assets/img/home2/why-choose-img2.jpg"
                  alt="choose-img2"
                />
                A trusted partner is a reliable and dependable collaborator who
                consistently delivers quality, integrity, and support in a
                professional relationship. They prioritize transparency,
                effective communication, and shared goals, ensuring long-term
                success and mutual growth. Whether in business or personal
                relationships, a trusted partner fosters confidence,
                accountability, and a strong foundation for collaboration.
              </Accordion.Body>
            </Accordion.Item>

            {/* 03 */}
            <Accordion.Item
              eventKey="2"
              className="wow animate fadeInDown"
              data-wow-delay="600ms"
              data-wow-duration="1500ms"
            >
              <Accordion.Header>
                <span>03.</span> Driving Innovation
              </Accordion.Header>
              <Accordion.Body>
                <Image
                  width={283}
                  height={171}
                  src="/assets/img/home2/why-choose-img3.jpg"
                  alt="choose-img3"
                />
                Driving Innovation means continuously exploring new ideas,
                technologies, and strategies to improve products, services, and
                processes. It involves creativity, problem-solving, and adapting
                to changing market needs to stay ahead of the competition. By
                fostering a culture of innovation, businesses can enhance
                efficiency, meet customer demands, and drive long-term success.
              </Accordion.Body>
            </Accordion.Item>

            {/* 04 */}
            <Accordion.Item
              eventKey="3"
              className="wow animate fadeInDown"
              data-wow-delay="800ms"
              data-wow-duration="1500ms"
            >
              <Accordion.Header>
                <span>04.</span> Pushing The Boundaries of Material Science
              </Accordion.Header>
              <Accordion.Body>
                <Image
                  width={283}
                  height={171}
                  src="/assets/img/home2/why-choose-img4.jpg"
                  alt="choose-img4"
                />
                Exploring new materials and technologies to improve strength,
                durability, and sustainability. It involves innovative research,
                advanced manufacturing techniques, and the development of
                smarter, more efficient materials for various industries. This
                progress drives breakthroughs in aerospace, healthcare,
                construction, and more, shaping the future with stronger,
                lighter, and more eco-friendly solutions.
              </Accordion.Body>
            </Accordion.Item>

            {/* 05 */}
            <Accordion.Item
              eventKey="4"
              className="wow animate fadeInDown"
              data-wow-delay="1000ms"
              data-wow-duration="1500ms"
            >
              <Accordion.Header>
                <span>05.</span> Aerospace Quality as Standard
              </Accordion.Header>
              <Accordion.Body>
                <Image
                  width={283}
                  height={171}
                  src="/assets/img/home2/why-choose-img5.jpg"
                  alt="choose-img5"
                />
                Aerospace quality as standard means that products or services
                meet the high safety, precision, and reliability standards
                required in the aerospace industry. These standards ensure
                exceptional performance and compliance with strict regulations,
                guaranteeing top-notch quality, durability, and safety for
                critical applications in aviation and aerospace systems.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeWhyChooseUsSection
