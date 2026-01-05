import React from 'react'

const HomeContactSection = () => {
    return (
        <div className="home5-contact-section mb-120">
            <div className="container">
                <div className="row gy-5">
                    <div className="col-lg-5">
                        <div className="section-title four mb-60 wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <span>
                                <svg width={12} height={12} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.0594065 0H12.0001V2.2353L2.25745 12L0 9.76471L6.65353 3.17647L0.0594065 3.2353V0Z" />
                                    <path d="M11.9999 11.9999V4.47046L8.79199 7.64693V11.9999H11.9999Z" />
                                </svg>
                                Help &amp; Support
                            </span>
                            <h2>Get In Touch With Us.</h2>
                        </div>
                        <div className="faq-wrap two">
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item wow animate fadeInDown" data-wow-delay="200ms" data-wow-duration="1500ms">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            01. Do you provide design and Textile services?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Yes, we provide comprehensive design and textile services tailored to meet your needs.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item wow animate fadeInDown" data-wow-delay="400ms" data-wow-duration="1500ms">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            02. Is Matrik suitable for my business?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Discover if Matrik is the right fit for your business by exploring its tailored solutions for various industries and unique needs.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item wow animate fadeInDown" data-wow-delay="600ms" data-wow-duration="1500ms">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            03. What is your typical project timeline?
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Discover the typical project timeline for our construction services, outlining each phase from planning to completion, ensuring timely and efficient project delivery.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            04. How do you handle permits and inspections?
                                        </button>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            We handle all necessary permits and inspections for your project, ensuring full compliance with local regulations and smooth progress throughout the construction process.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item wow animate fadeInDown" data-wow-delay="800ms" data-wow-duration="1500ms">
                                    <h2 className="accordion-header" id="headingFive">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                            05. How do you handle waste disposal and recycling?
                                        </button>
                                    </h2>
                                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            At our construction sites, we prioritize responsible waste disposal and recycling by adhering to local regulations, implementing sustainable practices, and partnering with certified waste management services to minimize environmental impact.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 d-flex align-items-lg-end wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
                        <div className="contact-form-wrap three">
                            <form>
                                <div className="row g-4">
                                    <div className="col-md-12">
                                        <div className="form-inner">
                                            <label>Full Name *</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-inner">
                                            <label>Email *</label>
                                            <input type="email" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-inner">
                                            <label>Phone *</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-inner">
                                            <label>Subject</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-inner">
                                            <label>Message *</label>
                                            <textarea defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-inner2">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox"  id="contactCheck" />
                                                <label className="form-check-label" htmlFor="contactCheck">
                                                    I have read &amp; accepted Terms &amp; Conditions.
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="primary-btn5 two btn-hover">
                                    Submit Now
                                    <svg className="arrow" width={23} height={23} viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            <path d="M0.113861 0H22.9999V4.28425L4.32671 22.9997L0 18.7154L12.7524 6.08815L0.113861 6.20089V0Z" />
                                            <path d="M23 22.9996V8.56848L16.8516 14.6566V22.9996H23Z" />
                                        </g>
                                    </svg>
                                    <span />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default HomeContactSection
