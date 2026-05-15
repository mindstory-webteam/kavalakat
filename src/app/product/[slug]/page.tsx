"use client"
import FooterTop from '@/components/FooterTop'
import InnerPageHeader from '@/components/InnerPageHeader'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Footer1 from '@/components/Footer'
import Breadcrumb from '@/components/common/Breadcrumb'
import Image from 'next/image'
import CompanyCard from '@/components/CompanyCard'
import { useParams } from 'next/navigation'

const API = process.env.NEXT_PUBLIC_API_URL || "https://kavalakat-api.onrender.com/api"

// ─── Types ────────────────────────────────────────────────────────────────

interface Feature    { id: string; title: string; content: string }
interface Brand      { logo?: string; logoAlt?: string; companyName: string; description: string }
interface Testimonial { quote: string; text: string; author: string; role: string; img: string }

interface PortfolioItem {
  id: number
  name: string
  description: string
  image_url: string
  banner_image_url: string
  hero_title: string
  about_title: string
  about_description: string
  about_image_url: string
  features_title: string
  features_image_url: string
  features_json: string
  features: Feature[]
  brands_heading: string
  brands_json: string
  brands: Brand[]
  testimonials_json: string
  testimonials: Testimonial[]
  category_name: string
  category_slug: string
}

// ─── Slug → display name map ──────────────────────────────────────────────

const SLUG_TO_NAME: Record<string, string> = {
  'cement':                          'Cement',
  'steel':                           'Steel',
  'steels':                          'Steel',
  'white-cement-paint':              'White Cement & Paint',
  'white-cement-&-paint':            'White Cement & Paint',
  'roofing-solutions':               'Roofing Solutions',
  'roofing':                         'Roofing Solutions',
  'construction-chemicals':          'Construction Chemicals',
  'abrasives-construction-chemicals':'Construction Chemicals',
  'hardware-tools':                  'Hardware & Tools',
  'hardware-&-tools':                'Hardware & Tools',
  'sheet-pipe':                      'Sheet & Pipe',
  'sheet-&-pipe':                    'Sheet & Pipe',
}

// ─── Fallback data (shown instantly if API fails) ─────────────────────────

const FALLBACK: Record<string, Partial<PortfolioItem>> = {
  'cement': {
    name: 'Cement',
    hero_title: 'Kavalakat Reliable Cement Supplier in Kerala',
    about_description: "We handle 11,000–13,000 MT of cement every month across trade and C&F operations. As C&F agents for JSW Cement (Palakkad) and distributors for Chettinad Anjani Cement (Thrissur & Idukki), we ensure uninterrupted cement supply across Kerala.\n\nWe function as both C&F Agent and Distributor for Ultratech Building Products Division (Construction Chemicals) in Thrissur.",
    about_image_url: '/assets/new-images/products/p-1.jpeg',
    features_title: 'Cement Products',
    features_image_url: '/assets/new-images/about-page/cement/cement-prodect-page.png',
    features: [
      { id:'c1', title:'Top-Rated Dealer', content:'Recognized as a leading dealer in the region, known for consistent performance, strong market presence, and long-standing relationships.' },
      { id:'c2', title:'Customer-Focused Communication', content:'We maintain excellent cooperation and transparent communication with customers, ensuring smooth coordination at every stage.' },
      { id:'c3', title:'Trust & Commitment in Service', content:'Our business is built on trust, reliability, and a strong commitment to service excellence in every transaction.' },
      { id:'c4', title:'Best Quality Products', content:'Associated with top-rated brands, we supply high-quality products that meet industry standards for strength, durability, and performance.' },
    ],
    brands_heading: 'Trusted Cement Brands We Supply',
    brands: [
      { logo:'/assets/new-images/products/cement-parterns/download (1).png', logoAlt:'UltraTech', companyName:'ULTRATECH', description:'102.75 MTPA consolidated capacity with 20 integrated plants and a pan-India presence.' },
      { logo:'/assets/new-images/products/cement-parterns/ACC.jfif', logoAlt:'ACC', companyName:'ACC', description:"One of the foremost companies in the Indian cement and concrete industry." },
      { logo:'/assets/new-images/products/cement-parterns/Bharathi.png', logoAlt:'Bharathi', companyName:'Bharathi', description:"Vicat Group's Indian operation — pioneer in cement manufacturing since 1817." },
      { logo:'/assets/new-images/products/cement-parterns/Dalmia.jfif', logoAlt:'Dalmia', companyName:'Dalmia', description:"World-class manufacturing plants with a constant ability to innovate." },
      { logo:'/assets/new-images/products/cement-parterns/Jws-logo.png', logoAlt:'JSW', companyName:'JSW', description:"Flagship Nandyal plant uses world-class Combi Finish Mode Roller Press technology." },
      { logo:'/assets/new-images/products/cement-parterns/AMBUJA-CEMENT-1.jfif', logoAlt:'Ambuja', companyName:'AMBUJA CEMENT', description:"One of India's most trusted cement brands — strength, durability, and sustainability." },
    ],
    testimonials: [
      { quote:'Excellent quality production!', text:'I ordered cement for my home build and the team made everything easy — clear pricing, friendly service, and delivery was right on schedule.', author:'Raj Kumar', role:'Founder, Egenslab', img:'/assets/new-images/icon-person/5856.jpg' },
      { quote:'Best communication & delivery', text:'Bought bulk cement bags here for our contractor. Staff were patient answering questions and helped me choose the right grade.', author:'David Thomas', role:'Founder, Triprex', img:'/assets/new-images/icon-person/5856.jpg' },
      { quote:'Outstanding material quality!', text:'The team was professional and courteous. Cement quality was solid and consistent, just what we needed for our foundation work.', author:'Swaraj Banu', role:'Founder, Axleo', img:'/assets/new-images/icon-person/5856.jpg' },
    ],
    banner_image_url: '/assets/new-images/bm/bm-3.jpeg',
  },
  'steel': {
    name: 'Steel',
    hero_title: 'Kavalakat — Premium Steel Supplier in Kerala',
    about_description: "We supply high-quality structural steel and TMT bars to builders, contractors, and fabricators across Kerala. As a trusted partner for leading steel brands, we ensure consistent quality, competitive pricing, and timely delivery.\n\nOur steel division handles bulk and retail orders with a reliable logistics network covering Thrissur, Ernakulam, and surrounding districts.",
    about_image_url: '/assets/new-images/products/p-2.jpeg',
    features_title: 'Steel Products',
    features_image_url: '/assets/new-images/about-page/steel/steel-prodect-page.png',
    features: [
      { id:'s1', title:'Certified Quality Steel', content:'All steel products are sourced from certified manufacturers and undergo quality checks for structural integrity.' },
      { id:'s2', title:'Wide Range of Grades', content:'TMT bars, structural sections, plates, coils, and sheets in all standard grades for any project scale.' },
      { id:'s3', title:'Bulk & Custom Orders', content:'We handle bulk procurement and custom cut-to-length orders to minimize wastage and streamline execution.' },
      { id:'s4', title:'Reliable Delivery Network', content:'Our logistics team ensures timely, damage-free delivery to construction sites across Kerala.' },
    ],
    brands_heading: 'Trusted Steel Brands We Supply',
    brands: [
      { logo:'/assets/new-images/products/cement-parterns/Bharathi.png', logoAlt:'Tata Steel', companyName:'Tata Steel', description:"One of the world's most geographically diversified steel producers." },
      { logo:'/assets/new-images/products/cement-parterns/Jws-logo.png', logoAlt:'JSW Steel', companyName:'JSW Steel', description:"India's leading integrated steel manufacturer with world-class technology." },
    ],
    testimonials: [
      { quote:'Premium Steel Quality!', text:'Tata Tiscon from Kavalakat has been the backbone of our structural work. Consistent quality and certified material every time.', author:'Rajesh Varma', role:'Structural Engineer, Thrissur', img:'/assets/new-images/icon-person/5856.jpg' },
      { quote:'On-Time Delivery Always', text:'We depend on Kavalakat for all our steel needs. Their logistics team ensures material reaches our sites without delays.', author:'Santhosh Kumar', role:'Builder, Palakkad', img:'/assets/new-images/icon-person/5856.jpg' },
    ],
    banner_image_url: '/assets/new-images/bm/bm-3.jpeg',
  },
}

// ─── JSON helper ──────────────────────────────────────────────────────────

function parseArr<T>(raw: any, fallback: T[] = []): T[] {
  if (Array.isArray(raw)) return raw
  if (!raw) return fallback
  try { const p = JSON.parse(raw); return Array.isArray(p) ? p : fallback }
  catch { return fallback }
}

// ─── Component ────────────────────────────────────────────────────────────

const TradingDetailPage = () => {
  const params = useParams()
  const slug   = params?.slug as string

  const [item,          setItem]          = useState<PortfolioItem | null>(null)
  const [loading,       setLoading]       = useState(true)
  const [usingFallback, setUsingFallback] = useState(false)
  const [currentSlide,  setCurrentSlide]  = useState(0)
  const [activeAcc,     setActiveAcc]     = useState<string | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setUsingFallback(false)

      // Target name from URL slug
      const targetName = SLUG_TO_NAME[slug] ?? slug.replace(/-/g, ' ')

      try {
        // Fetch all items (try /portfolio/items/ then /portfolio/)
        let allItems: any[] = []
        for (const url of [`${API}/portfolio/items/`, `${API}/portfolio/`]) {
          try {
            const res = await fetch(url)
            if (!res.ok) continue
            const data = await res.json()
            const list = Array.isArray(data) ? data : (data.results ?? data.items ?? [])
            if (list.length > 0) { allItems = list; break }
          } catch { /* next */ }
        }

        // Find by name (case-insensitive, any category)
        const found = allItems.find(
          (i: any) => i.name?.toLowerCase().trim() === targetName.toLowerCase().trim()
        )

        if (found) {
          found.features     = parseArr<Feature>(found.features     ?? found.features_json)
          found.brands       = parseArr<Brand>(found.brands         ?? found.brands_json)
          found.testimonials = parseArr<Testimonial>(found.testimonials ?? found.testimonials_json)
          setItem(found as PortfolioItem)
        } else {
          throw new Error('Item not in API')
        }
      } catch {
        // Use built-in fallback
        const fbKey = Object.keys(FALLBACK).find(k =>
          targetName.toLowerCase().includes(k) || k.includes(targetName.toLowerCase().split(' ')[0])
        ) || Object.keys(FALLBACK)[0]
        setItem(FALLBACK[fbKey] as PortfolioItem)
        setUsingFallback(true)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  // ── Testimonial slider ─────────────────────────────────────────────────
  const testimonials = item?.testimonials ?? []
  useEffect(() => {
    if (!testimonials.length) return
    timerRef.current = setInterval(() => setCurrentSlide(p => (p+1) % testimonials.length), 4000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [testimonials.length, slug])

  const stopTimer  = () => { if (timerRef.current) clearInterval(timerRef.current) }
  const startTimer = () => {
    stopTimer()
    if (testimonials.length) timerRef.current = setInterval(() => setCurrentSlide(p => (p+1) % testimonials.length), 4000)
  }
  const next = () => { stopTimer(); setCurrentSlide(p => (p+1) % testimonials.length); startTimer() }
  const prev = () => { stopTimer(); setCurrentSlide(p => (p-1+testimonials.length) % testimonials.length); startTimer() }

  const features = item?.features     ?? []
  const brands   = item?.brands       ?? []

  // ── Loading state ──────────────────────────────────────────────────────
  if (loading) return (
    <>
      <InnerPageHeader />
      <div style={{minHeight:'60vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div className="kv-loader"><div/><div/><div/></div>
      </div>
      <FooterTop /><Footer1 />
      <style>{`.kv-loader{display:flex;gap:8px;align-items:flex-end}.kv-loader div{width:6px;background:#000;border-radius:3px;animation:kvb .8s ease infinite}.kv-loader div:nth-child(1){height:20px;animation-delay:0s}.kv-loader div:nth-child(2){height:32px;animation-delay:.15s}.kv-loader div:nth-child(3){height:20px;animation-delay:.3s}@keyframes kvb{0%,100%{opacity:.3}50%{opacity:1}}`}</style>
    </>
  )

  if (!item) return (
    <>
      <InnerPageHeader />
      <div className="container pt-120 mb-120 text-center">
        <h2>Product Not Found</h2>
        <Link href="/product" className="primary-btn1 black-bg mt-4 d-inline-flex">
          <span>Back to Portfolio</span><span>Back to Portfolio</span>
        </Link>
      </div>
      <FooterTop /><Footer1 />
    </>
  )

  const heroParas = (item.about_description || item.description || '')
    .split('\n\n').filter(Boolean)

  return (
    <>
      <InnerPageHeader />
      <Breadcrumb
        title={item.name}
        subtitle={`${item.category_name || 'Trading'} — ${item.name}`}
        image={item.banner_image_url || '/assets/new-images/bm/bm-3.jpeg'}
      />

      {/* ── Hero ── */}
      <div className="product-details-top-area pt-120 mb-120" id="scroll-section">
        <div className="container">
          <div className="row gy-md-5 gy-4 align-items-lg-end">
            <div className="col-lg-8 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="details-content">
                <h2>{item.hero_title || item.about_title || `Kavalakat — ${item.name} Supplier`}</h2>
                {heroParas.length
                  ? heroParas.map((p, i) => <p key={i} style={{textAlign:'justify'}}>{p}</p>)
                  : <p style={{textAlign:'justify'}}>{item.description}</p>
                }
              </div>
            </div>
            <div className="col-lg-4 wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="product-img">
                <Image width={340} height={270}
                  src={item.about_image_url || item.image_url || '/assets/new-images/products/p-1.jpeg'}
                  alt={item.name}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Features / FAQ ── */}
      {features.length > 0 && (
        <div className="product-dt-faq-section mb-120">
          <div className="container">
            <div className="product-dt-faq-wrapper">
              <div className="row g-0">
                <div className="col-lg-6 d-none d-lg-block">
                  <div className="product-dt-faq-img">
                    <Image width={650} height={650}
                      src={item.features_image_url || '/assets/new-images/about-page/cement/cement-prodect-page.png'}
                      alt="Features"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="faq-content-area p-4">
                    <h2 className="mb-4">{item.features_title || `${item.name} Products`}</h2>
                    <div className="accordion" id="accordionExample">
                      {features.map(feat => (
                        <div className="accordion-item mb-3 animated-accordion" key={feat.id}>
                          <h2 className="accordion-header">
                            <button
                              className={`accordion-button ${activeAcc === feat.id ? '' : 'collapsed'}`}
                              type="button"
                              onClick={() => setActiveAcc(activeAcc === feat.id ? null : feat.id)}
                            >{feat.title}</button>
                          </h2>
                          <div className={`accordion-collapse ${activeAcc === feat.id ? 'show' : ''}`}
                            style={{maxHeight: activeAcc === feat.id ? '500px' : '0', overflow:'hidden', transition:'max-height .4s ease-in-out'}}>
                            <div className="accordion-body">{feat.content}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Link className="primary-btn1 black-bg" href="/contact">
                <span>Contact With Us</span><span>Contact With Us</span>
                <svg className="arrow" width={23} height={23} viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"><g><path d="M0.113861 0H22.9999V4.28425L4.32671 22.9997L0 18.7154L12.7524 6.08815L0.113861 6.20089V0Z"/><path d="M23 22.9996V8.56848L16.8516 14.6566V22.9996H23Z"/></g></svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── Brands ── */}
      {brands.length > 0 && (
        <div className="steel-partners-section mb-120">
          <div className="container">
            <div className="row mb-50">
              <div className="col-12">
                <h2 className="section-main-title">{item.brands_heading || `${item.name} Brands We Supply`}</h2>
              </div>
            </div>
            <div className="row g-4 justify-content-center">
              {brands.map((brand, i) => (
                <div key={i} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="card-wrapper-small">
                    <CompanyCard logo={brand.logo||''} logoAlt={brand.logoAlt||brand.companyName} companyName={brand.companyName} description={brand.description} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            .steel-partners-section{background:#fff;padding:80px 0}
            .section-main-title{font-size:3rem;font-weight:800;color:#000;margin:0 0 40px;line-height:1.2;letter-spacing:-.5px}
            .card-wrapper-small{height:420px;width:100%}
            @media(max-width:992px){.card-wrapper-small{height:400px}.section-main-title{font-size:2.5rem}}
            @media(max-width:768px){.card-wrapper-small{height:380px}.steel-partners-section{padding:60px 0}.section-main-title{font-size:2rem;text-align:center}}
            @media(max-width:576px){.card-wrapper-small{height:auto;min-height:360px}.section-main-title{font-size:1.75rem}}
          `}</style>
        </div>
      )}

      {/* ── Testimonials ── */}
      {testimonials.length > 0 && (
        <div className="home1-testimonial-section">
          <div className="container-fluid">
            <div className="row gy-5">
              <div className="col-xl-4">
                <div className="testimonial-title-area">
                  <div className="section-title">
                    <span>Our Client Testimonial</span>
                    <h2>Trusted by Our Partners.</h2>
                  </div>
                  <ul className="rating-list mt-4">
                    {[['clutch-logo','https://clutch.co/'],['google-logo','https://www.google.com/']].map(([logo, href]) => (
                      <li className="mb-3" key={logo}>
                        <a href={href} className={`single-rating${logo.includes('google')?'google':''} d-flex align-items-center gap-3 p-3 border rounded`}>
                          <div className="review"><span className="d-block small">Review On</span><Image width={60} height={20} src={`/assets/img/home1/icon/${logo}.svg`} alt={logo}/></div>
                          <div className="rating">
                            <ul className="star d-flex gap-1">
                              {[...Array(4)].map((_,i)=><li key={i}><i className="bi bi-star-fill text-warning"/></li>)}
                              <li><i className="bi bi-star-half text-warning"/></li>
                            </ul>
                            <span className="small">(50 reviews)</span>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="position-relative">
                  <div className="testimonial-slider">
                    <div className="testimonial-card bg-white p-4 rounded shadow-sm fade-in">
                      <svg className="quote mb-3" width={46} height={42} viewBox="0 0 46 42" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M19.3074 22.4375C19.0109 24.7824 18.4898 27.0555 17.9059 28.5469C15.8664 33.7848 11.2574 38.277 5.21094 40.9184C4.07891 41.4125 3.00977 41.2418 2.37188 40.4691C2.22813 40.2895 1.64415 39.1754 1.07813 38.0074L1.07111 37.9928C0.0628121 35.8959 0.0449269 35.8587 0.0449268 35.2402C0.0539122 34.0902 0.413287 33.668 2.06641 32.8773C5.27383 31.332 7.16055 29.5801 8.40039 26.9746C8.98438 25.7438 9.28086 24.8543 9.55938 23.4707C9.73907 22.5723 9.97266 20.5867 9.97266 19.9129C9.97266 19.7422 9.87383 19.7422 6.21719 19.7422L2.46172 19.7422L1.99454 19.5086C1.73399 19.3828 1.40157 19.1313 1.25782 18.9516C1.18695 18.8658 1.12525 18.7941 1.07158 18.7167C0.703361 18.1862 0.713199 17.3932 0.736722 10.0301L0.73675 10.0223C0.763674 2.37538 0.763737 2.3573 0.952347 1.99805C1.22188 1.50391 1.58125 1.15352 2.06641 0.928908C2.47071 0.740236 2.5336 0.740236 10.2871 0.740235L18.1035 0.740235L18.4719 0.937891C18.948 1.18945 19.3344 1.57578 19.55 2.01602C19.7117 2.33945 19.7207 2.68086 19.7207 10.2188C19.7207 18.3945 19.6848 19.4996 19.3074 22.4375Z" fill="currentColor"/>
                      </svg>
                      <span className="d-block fw-bold mb-2">{testimonials[currentSlide]?.quote}</span>
                      <p className="mb-4">{testimonials[currentSlide]?.text}</p>
                      <div className="author-area d-flex align-items-center gap-3">
                        <Image width={50} height={50} src={testimonials[currentSlide]?.img||'/assets/new-images/icon-person/5856.jpg'} alt={testimonials[currentSlide]?.author||''} className="rounded-circle"/>
                        <div><h5 className="mb-0">{testimonials[currentSlide]?.author}</h5><span className="small text-muted">{testimonials[currentSlide]?.role}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="slider-btn-grp d-flex gap-3 mt-4 justify-content-center">
                    <button className="slider-btn testimonial-slider-prev" onClick={prev} aria-label="Previous">
                      <svg width={20} height={20} viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                    <div className="d-flex align-items-center gap-2">
                      {testimonials.map((_,i)=>(
                        <button key={i} className={`slide-indicator ${currentSlide===i?'active':''}`}
                          onClick={()=>{stopTimer();setCurrentSlide(i);startTimer()}} aria-label={`Slide ${i+1}`}/>
                      ))}
                    </div>
                    <button className="slider-btn testimonial-slider-next" onClick={next} aria-label="Next">
                      <svg width={20} height={20} viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .testimonial-card{animation:fadeSlide .6s ease}
        @keyframes fadeSlide{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .animated-accordion .feature-img{transform:scale(.95);transition:transform .4s ease}
        .animated-accordion .accordion-collapse.show .feature-img{transform:scale(1)}
      `}</style>

      <FooterTop />
      <Footer1 />
    </>
  )
}

export default TradingDetailPage