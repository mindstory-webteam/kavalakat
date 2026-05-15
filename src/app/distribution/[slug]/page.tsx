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

interface Feature    { id: string; title: string; content: string }
interface Brand      { logo?: string; logoAlt?: string; companyName: string; description: string }
interface Testimonial { quote: string; text: string; author: string; role: string; img: string }

interface PortfolioItem {
  id: number; name: string; description: string; image_url: string
  banner_image_url: string; hero_title: string; about_title: string
  about_description: string; about_image_url: string; features_title: string
  features_image_url: string; features: Feature[]; features_json: string
  brands_heading: string; brands: Brand[]; brands_json: string
  testimonials: Testimonial[]; testimonials_json: string
  category_name: string; category_slug: string
}

const SLUG_TO_NAME: Record<string, string> = {
  'ultratech':    'UltraTech',
  'jk-cement':    'JK Cement',
  'tata-steel':   'Tata Steel',
  'jsw-steel':    'JSW Steel',
  'asian-paints': 'Asian Paints',
  'berger-paints':'Berger Paints',
}

const FALLBACK: Record<string, Partial<PortfolioItem>> = {
  'ultratech': {
    name:'UltraTech', hero_title:'Kavalakat — Authorized UltraTech Distributor in Kerala',
    about_description:"Kavalakat is an authorized distributor of UltraTech Cement in Kerala, ensuring consistent and timely supply of India's largest selling cement brand for residential, commercial, and infrastructure projects across Thrissur, Ernakulam, and surrounding districts.\n\nWith a consolidated capacity of over 102 MTPA and a pan-India presence, UltraTech is the preferred choice of engineers, contractors, and builders who demand nothing but the best.",
    about_image_url:'/assets/new-images/products/p-1.jpeg',
    features_title:'UltraTech Products',
    features_image_url:'/assets/new-images/about-page/cement/cement-prodect-page.png',
    features:[
      {id:'ut1',title:'Authorized Regional Distributor',content:'Officially authorized UltraTech distributor in Kerala, ensuring customers receive genuine, quality-certified products with full manufacturer backing.'},
      {id:'ut2',title:'Wide Grade Availability',content:'All popular grades including OPC 43, OPC 53, PPC, and PSC for foundations, columns, plastering, and specialized construction needs.'},
      {id:'ut3',title:'Bulk & Retail Supply',content:'From a few bags for a residential project to bulk quantities for a commercial site — managed efficiently with minimal lead time.'},
      {id:'ut4',title:'Reliable Logistics Network',content:'Established logistics setup ensures timely and undamaged delivery to construction sites across Thrissur, Ernakulam, and surrounding districts.'},
    ],
    brands_heading:'UltraTech Products We Supply',
    brands:[
      {logo:'/assets/new-images/products/cement-parterns/download (1).png',logoAlt:'UltraTech OPC 53',companyName:'UltraTech OPC 53',description:'Ideal for high-strength structural work including columns, beams, and foundations requiring superior compressive strength.'},
      {logo:'/assets/new-images/products/cement-parterns/download (1).png',logoAlt:'UltraTech PPC',companyName:'UltraTech PPC',description:'Portland Pozzolana Cement for general construction — better workability, durability, and sulphate attack resistance.'},
      {logo:'/assets/new-images/products/cement-parterns/download (1).png',logoAlt:'UltraTech PSC',companyName:'UltraTech PSC',description:'Portland Slag Cement ideal for marine and underground structures — excellent durability in aggressive environments.'},
    ],
    testimonials:[
      {quote:'Outstanding Supply Chain!',text:"Kavalakat ensures we never run out of UltraTech at our site. Their bulk delivery system is seamless and their team is always responsive.",author:'Arun Menon',role:'Site Engineer, Thrissur',img:'/assets/new-images/icon-person/5856.jpg'},
      {quote:'Quality You Can Trust',text:"Every bag of UltraTech from Kavalakat is genuine and properly stored. We've been their client for 5 years and never had a quality issue.",author:'Suresh Pillai',role:'Contractor, Ernakulam',img:'/assets/new-images/icon-person/5856.jpg'},
      {quote:'Best Pricing in Region',text:'Competitive pricing combined with on-time delivery makes Kavalakat our go-to distributor for all UltraTech requirements.',author:'Rajan Nair',role:'Builder, Palakkad',img:'/assets/new-images/icon-person/5856.jpg'},
    ],
    banner_image_url:'/assets/new-images/bm/bm-3.jpeg',
  },
  'jk-cement':{
    name:'JK Cement',hero_title:'Kavalakat — Trusted JK Cement Partner in Kerala',
    about_description:"Kavalakat distributes JK Cement across Kerala, bringing one of India's most trusted multi-product cement brands directly to builders and contractors in the region.\n\nJK Cement's commitment to quality and innovation makes it a top choice for structural, finishing, and specialized construction applications at every scale.",
    about_image_url:'/assets/new-images/products/p-1.jpeg',
    features_title:'JK Cement Products',features_image_url:'/assets/new-images/about-page/cement/cement-prodect-page.png',
    features:[
      {id:'jk1',title:'Authorized JK Cement Partner',content:'Certified JK Cement distribution partner ensuring customers access genuine products with complete quality assurance and manufacturer support.'},
      {id:'jk2',title:'Multiple Product Grades',content:'From OPC to specialty cements for white cement and wall putty applications — full JK Cement product range stocked.'},
      {id:'jk3',title:'Project-Scale Supply',content:'We handle large project orders with dedicated scheduling to ensure uninterrupted material availability throughout construction phases.'},
      {id:'jk4',title:'Technical Support',content:'Our team provides guidance on product selection, usage ratios, and application methods for optimal construction outcomes.'},
    ],
    brands_heading:'JK Cement Products We Supply',
    brands:[
      {logo:'/assets/new-images/products/cement-parterns/ACC.jfif',logoAlt:'JK Super Cement OPC',companyName:'JK Super Cement OPC',description:'High-strength OPC for all structural applications, known for consistent quality and superior compressive performance.'},
      {logo:'/assets/new-images/products/cement-parterns/ACC.jfif',logoAlt:'JK Lakshmi PPC',companyName:'JK Lakshmi PPC',description:'Popular PPC grade offering excellent workability and long-term durability for general construction and finishing.'},
      {logo:'/assets/new-images/products/cement-parterns/ACC.jfif',logoAlt:'JK White Cement',companyName:'JK White Cement',description:'Premium white cement for decorative finishes, tiles, and aesthetic applications requiring bright, consistent color.'},
    ],
    testimonials:[
      {quote:'Consistent & Reliable!',text:'JK Cement through Kavalakat has been our primary material for two large housing projects. Quality is consistent and supply is always on time.',author:'Manoj Kumar',role:'Project Manager, Thrissur',img:'/assets/new-images/icon-person/5856.jpg'},
      {quote:'Great Product Range',text:'The variety of JK Cement grades available at Kavalakat helps us choose the right product for each phase of construction.',author:'Priya Nambiar',role:'Architect, Kochi',img:'/assets/new-images/icon-person/5856.jpg'},
      {quote:'Excellent Service',text:'Prompt delivery and courteous staff make Kavalakat our preferred distributor for all JK Cement procurement.',author:'Biju Thomas',role:'Contractor, Ernakulam',img:'/assets/new-images/icon-person/5856.jpg'},
    ],
    banner_image_url:'/assets/new-images/bm/bm-3.jpeg',
  },
  'tata-steel':{
    name:'Tata Steel',hero_title:'Kavalakat — Certified Tata Steel Distributor in Kerala',
    about_description:"Kavalakat is a trusted distributor of Tata Steel products in Kerala, offering high-quality structural steel to builders, contractors, and fabricators across the region.\n\nTata Steel's global manufacturing standards and commitment to sustainability make it the preferred steel brand for projects demanding performance, reliability, and longevity.",
    about_image_url:'/assets/new-images/products/p-2.jpeg',
    features_title:'Tata Steel Products',features_image_url:'/assets/new-images/about-page/cement/cement-prodect-page.png',
    features:[
      {id:'ts1',title:'Certified Tata Steel Distributor',content:'Officially certified Tata Steel distributor — all products are authentic, quality-tested, and traceable to the source.'},
      {id:'ts2',title:'Full Range of Steel Products',content:'TMT bars, structural sections, plates, and coils — covering all requirements from housing to heavy civil construction.'},
      {id:'ts3',title:'Cut-to-Length & Custom Orders',content:'Custom cut-to-length orders to reduce on-site wastage, saving time and cost for project execution teams.'},
      {id:'ts4',title:'Earthquake-Resistant TMT',content:'Tata Tiscon TMT bars feature superior ductility and bend-rebend properties for structures resilient in seismic zones.'},
    ],
    brands_heading:'Tata Steel Products We Supply',
    brands:[
      {logo:'/assets/new-images/products/cement-parterns/Bharathi.png',logoAlt:'Tata Tiscon TMT',companyName:'Tata Tiscon TMT',description:"India's most trusted TMT bar brand — superior strength, earthquake resistance, and excellent bonding properties."},
      {logo:'/assets/new-images/products/cement-parterns/Bharathi.png',logoAlt:'Tata Structura',companyName:'Tata Structura',description:'Pre-engineered hollow sections for modern construction — versatility, aesthetics, and structural efficiency.'},
      {logo:'/assets/new-images/products/cement-parterns/Bharathi.png',logoAlt:'Tata Steel Plates',companyName:'Tata Steel Plates',description:'High-strength steel plates for industrial applications and heavy-duty structural requirements with certified quality.'},
    ],
    testimonials:[
      {quote:'Premium Steel Quality!',text:'Tata Tiscon from Kavalakat has been the backbone of our structural work. Consistent quality and certified material every time.',author:'Rajesh Varma',role:'Structural Engineer, Thrissur',img:'/assets/new-images/icon-person/5856.jpg'},
      {quote:'On-Time Delivery Always',text:'We depend on Kavalakat for all our Tata Steel needs. Their logistics team ensures material reaches our sites without delays.',author:'Santhosh Kumar',role:'Builder, Palakkad',img:'/assets/new-images/icon-person/5856.jpg'},
      {quote:'Best TMT in Market',text:"Nothing compares to Tata Tiscon for earthquake-resistant construction. Kavalakat's pricing and service make the deal even better.",author:'Anoop Krishnan',role:'Contractor, Ernakulam',img:'/assets/new-images/icon-person/5856.jpg'},
    ],
    banner_image_url:'/assets/new-images/bm/bm-3.jpeg',
  },
  'jsw-steel':{
    name:'JSW Steel',hero_title:'Kavalakat — Authorized JSW Steel Partner in Kerala',
    about_description:"Kavalakat distributes JSW Steel products across Kerala, connecting builders and project teams with one of India's most technologically advanced steel manufacturers.\n\nJSW Steel's state-of-the-art Nandyal plant and automated production systems deliver consistent quality for residential, commercial, and infrastructure projects.",
    about_image_url:'/assets/new-images/products/p-2.jpeg',
    features_title:'JSW Steel Products',features_image_url:'/assets/new-images/about-page/cement/cement-prodect-page.png',
    features:[
      {id:'jsw1',title:'Authorized JSW Steel Partner',content:'Authorized JSW Steel distributor ensuring product authenticity, quality certification, and manufacturer warranty on all supplies.'},
      {id:'jsw2',title:'TMT, Coils & Sheets',content:'JSW Neosteel TMT bars, hot-rolled coils, cold-rolled sheets, and galvanized products for diverse construction and fabrication needs.'},
      {id:'jsw3',title:'Superior Corrosion Resistance',content:"JSW's advanced manufacturing processes produce steel with superior corrosion resistance and longer structural life."},
      {id:'jsw4',title:'Energy-Efficient Production',content:"JSW Steel's award-winning energy-saving processes mean premium quality steel produced with minimal environmental impact."},
    ],
    brands_heading:'JSW Steel Products We Supply',
    brands:[
      {logo:'/assets/new-images/products/cement-parterns/Jws-logo.png',logoAlt:'JSW Neosteel TMT',companyName:'JSW Neosteel TMT',description:'High-performance TMT bars with excellent tensile strength, ductility, and corrosion resistance for long-lasting structures.'},
      {logo:'/assets/new-images/products/cement-parterns/Jws-logo.png',logoAlt:'JSW Hot Rolled Coils',companyName:'JSW Hot Rolled Coils',description:'Wide range of HR coils for fabrication, industrial applications, and structural components requiring consistent quality.'},
      {logo:'/assets/new-images/products/cement-parterns/Jws-logo.png',logoAlt:'JSW Galvanized Sheets',companyName:'JSW Galvanized Sheets',description:'Corrosion-resistant galvanized sheets ideal for roofing, cladding, and industrial construction with long service life.'},
    ],
    testimonials:[
      {quote:'Exceptional Steel Quality!',text:'JSW Neosteel has transformed the way we build. Superior strength and workability — Kavalakat ensures we always have it in stock.',author:'Vivek Menon',role:'Civil Engineer, Kochi',img:'/assets/new-images/icon-person/5856.jpg'},
      {quote:'Reliable Distribution',text:"Kavalakat's distribution network for JSW Steel is impressive. We've never faced a shortage even during peak construction seasons.",author:'George Mathew',role:'Project Director, Thrissur',img:'/assets/new-images/icon-person/5856.jpg'},
      {quote:'Great Value for Money',text:"JSW through Kavalakat offers the best price-to-quality ratio we've found. Highly recommended for large projects.",author:'Deepak Nair',role:'Contractor, Malappuram',img:'/assets/new-images/icon-person/5856.jpg'},
    ],
    banner_image_url:'/assets/new-images/bm/bm-3.jpeg',
  },
  'asian-paints':{
    name:'Asian Paints',hero_title:'Kavalakat — Authorized Asian Paints Distributor in Kerala',
    about_description:"Kavalakat distributes Asian Paints across Kerala, bringing Asia's leading decorative and industrial coatings brand to homes, offices, and construction projects throughout the region.\n\nFrom interior emulsions and exterior finishes to industrial coatings and waterproofing solutions, Asian Paints covers every aesthetic and protection need.",
    about_image_url:'/assets/new-images/products/p-3.jpeg',
    features_title:'Asian Paints Products',features_image_url:'/assets/new-images/about-page/cement/cement-prodect-page.png',
    features:[
      {id:'ap1',title:'Authorized Asian Paints Dealer',content:'Officially authorized Asian Paints distributor ensuring customers receive genuine products with full brand warranty and technical support.'},
      {id:'ap2',title:'Complete Product Portfolio',content:'Interior emulsions, exterior finishes, enamels, primers, wood coatings, waterproofing, and SmartCare products — all stocked.'},
      {id:'ap3',title:'Color Consultation Service',content:'Our trained team assists with color selection, finish recommendations, and product pairing for any space.'},
      {id:'ap4',title:'Bulk Project Supply',content:'For large residential complexes, commercial buildings, and institutional projects — competitive pricing and scheduled bulk delivery.'},
    ],
    brands_heading:'Asian Paints Products We Supply',
    brands:[
      {logo:'/assets/new-images/products/cement-parterns/AMBUJA-CEMENT-1.jfif',logoAlt:'Royale Interior Emulsion',companyName:'Royale Interior Emulsion',description:'Premium smooth finish emulsion offering rich colors, washability, and a luxurious look for interior walls.'},
      {logo:'/assets/new-images/products/cement-parterns/AMBUJA-CEMENT-1.jfif',logoAlt:'Apex Exterior Emulsion',companyName:'Apex Exterior Emulsion',description:'Weather-resistant exterior finish that protects against rain, UV rays, and algae for long-lasting kerb appeal.'},
      {logo:'/assets/new-images/products/cement-parterns/AMBUJA-CEMENT-1.jfif',logoAlt:'SmartCare Waterproofing',companyName:'SmartCare Waterproofing',description:'Advanced waterproofing for roofs, bathrooms, and basements — durable protection against water ingress.'},
    ],
    testimonials:[
      {quote:'Beautiful Finish Every Time!',text:"We use Asian Paints Royale for all our premium residential projects. Kavalakat's supply is consistent and the colors are always true to swatch.",author:'Meera Krishnan',role:'Interior Designer, Kochi',img:'/assets/new-images/icon-person/5856.jpg'},
      {quote:'Best Paint Distributor',text:"Kavalakat has one of the widest selections of Asian Paints products we've seen. Great pricing, helpful staff, and excellent stock.",author:'Shaji Abraham',role:'Painting Contractor, Thrissur',img:'/assets/new-images/icon-person/5856.jpg'},
      {quote:'Durable & Weather-Proof',text:"The Apex exterior range has held up perfectly through three monsoon seasons. Supplied by Kavalakat — quality guaranteed.",author:'Pradeep Varghese',role:'Builder, Ernakulam',img:'/assets/new-images/icon-person/5856.jpg'},
    ],
    banner_image_url:'/assets/new-images/bm/bm-3.jpeg',
  },
}

function parseArr<T>(raw: any, fallback: T[] = []): T[] {
  if (Array.isArray(raw)) return raw
  if (!raw) return fallback
  try { const p = JSON.parse(raw); return Array.isArray(p) ? p : fallback } catch { return fallback }
}

const DistributionDetailPage = () => {
  const params = useParams()
  const slug   = params?.slug as string

  const [item,         setItem]         = useState<PortfolioItem | null>(null)
  const [loading,      setLoading]      = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeAcc,    setActiveAcc]    = useState<string | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const targetName = SLUG_TO_NAME[slug] ?? slug.replace(/-/g, ' ')

      try {
        let allItems: any[] = []
        for (const url of [`${API}/portfolio/items/`, `${API}/portfolio/`]) {
          try {
            const res  = await fetch(url)
            if (!res.ok) continue
            const data = await res.json()
            const list = Array.isArray(data) ? data : (data.results ?? data.items ?? [])
            if (list.length > 0) { allItems = list; break }
          } catch { /* next */ }
        }

        const found = allItems.find(
          (i: any) => i.name?.toLowerCase().trim() === targetName.toLowerCase().trim()
        )

        if (found) {
          found.features     = parseArr<Feature>(found.features     ?? found.features_json)
          found.brands       = parseArr<Brand>(found.brands         ?? found.brands_json)
          found.testimonials = parseArr<Testimonial>(found.testimonials ?? found.testimonials_json)
          setItem(found as PortfolioItem)
        } else throw new Error('not found')
      } catch {
        setItem((FALLBACK[slug] ?? null) as PortfolioItem | null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  const testimonials = item?.testimonials ?? []
  const features     = item?.features     ?? []
  const brands       = item?.brands       ?? []

  useEffect(() => {
    if (!testimonials.length) return
    timerRef.current = setInterval(() => setCurrentSlide(p => (p+1) % testimonials.length), 4000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [testimonials.length, slug])

  const stopTimer  = () => { if (timerRef.current) clearInterval(timerRef.current) }
  const startTimer = () => { stopTimer(); if (testimonials.length) timerRef.current = setInterval(() => setCurrentSlide(p => (p+1) % testimonials.length), 4000) }
  const next = () => { stopTimer(); setCurrentSlide(p => (p+1) % testimonials.length); startTimer() }
  const prev = () => { stopTimer(); setCurrentSlide(p => (p-1+testimonials.length) % testimonials.length); startTimer() }

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
        <h2>Brand Not Found</h2>
        <Link href="/product" className="primary-btn1 black-bg mt-4 d-inline-flex">
          <span>Back to Portfolio</span><span>Back to Portfolio</span>
        </Link>
      </div>
      <FooterTop /><Footer1 />
    </>
  )

  const heroParas = (item.about_description || '').split('\n\n').filter(Boolean)

  return (
    <>
      <InnerPageHeader />
      <Breadcrumb title={`${item.name} Distribution`} subtitle={`Authorized ${item.name} Distributor in Kerala`} image={item.banner_image_url || '/assets/new-images/bm/bm-3.jpeg'} />

      {/* Hero */}
      <div className="product-details-top-area pt-120 mb-120" id="scroll-section">
        <div className="container">
          <div className="row gy-md-5 gy-4 align-items-lg-end">
            <div className="col-lg-8 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="details-content">
                <h2>{item.hero_title || item.about_title}</h2>
                {heroParas.map((p,i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="col-lg-4 wow animate fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="product-img">
                <Image width={340} height={270} src={item.about_image_url||item.image_url||'/assets/new-images/products/p-1.jpeg'} alt={item.name}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      {features.length > 0 && (
        <div className="product-dt-faq-section mb-120">
          <div className="container">
            <div className="product-dt-faq-wrapper">
              <div className="row g-0">
                <div className="col-lg-6 d-none d-lg-block">
                  <div className="product-dt-faq-img">
                    <Image width={650} height={650} src={item.features_image_url||'/assets/new-images/about-page/cement/cement-prodect-page.png'} alt="Features"/>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="faq-content-area p-4">
                    <h2 className="mb-4">{item.features_title || `${item.name} Products`}</h2>
                    <div className="accordion">
                      {features.map(feat => (
                        <div className="accordion-item mb-3 animated-accordion" key={feat.id}>
                          <h2 className="accordion-header">
                            <button className={`accordion-button ${activeAcc===feat.id?'':'collapsed'}`} type="button"
                              onClick={()=>setActiveAcc(activeAcc===feat.id?null:feat.id)}>{feat.title}</button>
                          </h2>
                          <div className={`accordion-collapse ${activeAcc===feat.id?'show':''}`}
                            style={{maxHeight:activeAcc===feat.id?'500px':'0',overflow:'hidden',transition:'max-height .4s ease-in-out'}}>
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

      {/* Brands */}
      {brands.length > 0 && (
        <div className="steel-partners-section mb-120">
          <div className="container">
            <div className="row mb-50"><div className="col-12"><h2 className="section-main-title">{item.brands_heading || `${item.name} Products We Supply`}</h2></div></div>
            <div className="row g-4 justify-content-center">
              {brands.map((b,i) => (
                <div key={i} className="col-lg-4 col-md-6 col-sm-12">
                  <div className="card-wrapper-small">
                    <CompanyCard logo={b.logo||''} logoAlt={b.logoAlt||b.companyName} companyName={b.companyName} description={b.description}/>
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

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <div className="home1-testimonial-section">
          <div className="container-fluid">
            <div className="row gy-5">
              <div className="col-xl-4">
                <div className="testimonial-title-area">
                  <div className="section-title"><span>Our Client Testimonial</span><h2>Trusted by Our Partners.</h2></div>
                  <ul className="rating-list mt-4">
                    {[['clutch-logo','https://clutch.co/'],['google-logo','https://www.google.com/']].map(([logo,href])=>(
                      <li className="mb-3" key={logo}><a href={href} className="single-rating d-flex align-items-center gap-3 p-3 border rounded">
                        <div className="review"><span className="d-block small">Review On</span><Image width={60} height={20} src={`/assets/img/home1/icon/${logo}.svg`} alt={logo}/></div>
                        <div className="rating"><ul className="star d-flex gap-1">{[...Array(4)].map((_,i)=><li key={i}><i className="bi bi-star-fill text-warning"/></li>)}<li><i className="bi bi-star-half text-warning"/></li></ul><span className="small">(50 reviews)</span></div>
                      </a></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="position-relative">
                  <div className="testimonial-slider">
                    <div className="testimonial-card bg-white p-4 rounded shadow-sm fade-in">
                      <svg className="quote mb-3" width={46} height={42} viewBox="0 0 46 42" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M19.3074 22.4375C19.0109 24.7824 18.4898 27.0555 17.9059 28.5469C15.8664 33.7848 11.2574 38.277 5.21094 40.9184C4.07891 41.4125 3.00977 41.2418 2.37188 40.4691C2.22813 40.2895 1.64415 39.1754 1.07813 38.0074L1.07111 37.9928C0.0628121 35.8959 0.0449269 35.8587 0.0449268 35.2402C0.0539122 34.0902 0.413287 33.668 2.06641 32.8773C5.27383 31.332 7.16055 29.5801 8.40039 26.9746C8.98438 25.7438 9.28086 24.8543 9.55938 23.4707C9.73907 22.5723 9.97266 20.5867 9.97266 19.9129C9.97266 19.7422 9.87383 19.7422 6.21719 19.7422L2.46172 19.7422L1.99454 19.5086C1.73399 19.3828 1.40157 19.1313 1.25782 18.9516C1.18695 18.8658 1.12525 18.7941 1.07158 18.7167C0.703361 18.1862 0.713199 17.3932 0.736722 10.0301L0.73675 10.0223C0.763674 2.37538 0.763737 2.3573 0.952347 1.99805C1.22188 1.50391 1.58125 1.15352 2.06641 0.928908C2.47071 0.740236 2.5336 0.740236 10.2871 0.740235L18.1035 0.740235L18.4719 0.937891C18.948 1.18945 19.3344 1.57578 19.55 2.01602C19.7117 2.33945 19.7207 2.68086 19.7207 10.2188C19.7207 18.3945 19.6848 19.4996 19.3074 22.4375Z" fill="currentColor"/></svg>
                      <span className="d-block fw-bold mb-2">{testimonials[currentSlide]?.quote}</span>
                      <p className="mb-4">{testimonials[currentSlide]?.text}</p>
                      <div className="author-area d-flex align-items-center gap-3">
                        <Image width={50} height={50} src={testimonials[currentSlide]?.img||'/assets/new-images/icon-person/5856.jpg'} alt={testimonials[currentSlide]?.author||''} className="rounded-circle"/>
                        <div><h5 className="mb-0">{testimonials[currentSlide]?.author}</h5><span className="small text-muted">{testimonials[currentSlide]?.role}</span></div>
                      </div>
                    </div>
                  </div>
                  <div className="slider-btn-grp d-flex gap-3 mt-4 justify-content-center">
                    <button className="slider-btn testimonial-slider-prev" onClick={prev} aria-label="Previous"><svg width={20} height={20} viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                    <div className="d-flex align-items-center gap-2">
                      {testimonials.map((_,i)=>(<button key={i} className={`slide-indicator ${currentSlide===i?'active':''}`} onClick={()=>{stopTimer();setCurrentSlide(i);startTimer()}} aria-label={`Slide ${i+1}`}/>))}
                    </div>
                    <button className="slider-btn testimonial-slider-next" onClick={next} aria-label="Next"><svg width={20} height={20} viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`.testimonial-card{animation:fadeSlide .6s ease}@keyframes fadeSlide{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <FooterTop /><Footer1 />
    </>
  )
}

export default DistributionDetailPage