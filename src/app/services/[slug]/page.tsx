"use client"
import FooterTop from '@/components/FooterTop'
import InnerPageHeader from '@/components/InnerPageHeader'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import Footer1 from '@/components/Footer'
import Breadcrumb from '@/components/common/Breadcrumb'
import Image from 'next/image'
import { useParams } from 'next/navigation'

/* ─────────────── TYPES ─────────────── */
interface ServiceFeature {
  id: string
  title: string
  content: string
}

interface ServiceBrand {
  logo?: string
  logoAlt?: string
  companyName: string
  description: string
  icon?: string
}

interface ServiceTestimonial {
  quote: string
  text: string
  author: string
  role: string
  img: string
}

interface ServiceItem {
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
  features: ServiceFeature[]
  brands_heading: string
  brands: ServiceBrand[]
  testimonials: ServiceTestimonial[]
}

/* ─────────────── SLUG MAP ─────────────── */
const SLUG_TO_NAME: Record<string, string> = {
  'kavalakat-group': 'Kavalakat Group',
  'alite-enclaves': 'Alite Enclaves',
  'neyy-vedyam': 'Neyy Vedyam',
}

/* ─────────────── FALLBACK DATA ─────────────── */
const FALLBACK: Record<string, Partial<ServiceItem>> = {
  'alite-enclaves': {
    name: 'Alite Enclaves',
    hero_title: 'Your Home Away from Home in Thrissur',
    about_title: 'Kavalakat Hospitality',
    about_description: "Alite Enclaves is a premium hospitality venture by the Kavalakat Group, offering fully furnished Service Apartments, Premium Rooms, Villas, and a Mini Meeting Hall in the heart of Thrissur, Kerala.\n\nStrategically located near Thrissur Railway Station, Sakthan Thampuran Bus Stand, and Vadakkumnathan Temple — ideal for families, pilgrims, business travelers, and long-stay guests.",
    about_image_url: '/assets/new-images/bm/bm-Alite-Enclaves.png',
    features_title: 'Room & Stay Options',
    features_image_url: '/assets/new-images/about-page/steel/steel-prodect-page.png',
    features: [
      { id: 'a1', title: 'Service Apartments (1 BHK & 2 BHK)', content: 'Fully furnished apartments with separate living and sleeping areas, private kitchenette, washing machine, satellite TV, and balcony with city views — ideal for long-stay guests and families.' },
      { id: 'a2', title: 'Premium Rooms', content: 'Air-conditioned premium rooms with modern furnishings, en-suite bathrooms, and all essential amenities. Perfect for business travelers and short-term stays.' },
      { id: 'a3', title: 'Villas (4 BHK)', content: 'Expansive 4 BHK villas offering maximum space, privacy, and luxury. Ideal for large families, extended stays, or group travel.' },
      { id: 'a4', title: 'Mini Meeting Hall', content: 'A well-equipped meeting space for business gatherings, training sessions, and conferences — with AV support and catering on request.' },
    ],
    brands_heading: 'What We Offer',
    brands: [
      { icon: '🛋️', companyName: 'Fully Furnished Apartments', description: 'Spacious 1 BHK, 2 BHK, and 4 BHK villas with premium furnishings and modern interiors.' },
      { icon: '🍽️', companyName: 'Private Kitchenettes', description: 'Fully equipped kitchens with cooking essentials, refrigerator, and dining area for self-catering stays.' },
      { icon: '📶', companyName: 'High-Speed Wi-Fi', description: 'Complimentary high-speed internet across all rooms and common areas for work and leisure.' },
      { icon: '🅿️', companyName: 'Dedicated Parking', description: 'Secure private parking facilities available for all guests with 24-hour CCTV surveillance.' },
      { icon: '🏢', companyName: 'Mini Meeting Hall', description: 'Well-equipped meeting room ideal for small business gatherings, conferences, and presentations.' },
      { icon: '🔒', companyName: '24/7 Security', description: 'Round-the-clock security staff, CCTV monitoring, and elevator access for complete guest safety.' },
    ],
    testimonials: [
      { quote: 'Perfect Stay for Business Travel!', text: 'Alite Enclaves gave us the comfort of home while on a long project assignment in Thrissur. Spacious rooms, clean kitchen, and responsive staff made every day pleasant.', author: 'Rohit Sharma', role: 'Project Manager, Kochi', img: '/assets/new-images/icon-person/5856.jpg' },
      { quote: 'Best Service Apartments in Thrissur', text: 'Stayed here for a week with family during the Thrissur Pooram festival. Excellent location, great amenities, and very helpful front desk team throughout our stay.', author: 'Anitha Nair', role: 'Family Traveller, Bangalore', img: '/assets/new-images/icon-person/5856.jpg' },
      { quote: 'Highly Recommended for Long Stays', text: 'The fully furnished apartment with kitchen facilities made our two-week stay very comfortable. Great value for money compared to regular hotel rooms in the city.', author: 'James Mathew', role: 'Corporate Guest, Chennai', img: '/assets/new-images/icon-person/5856.jpg' },
    ],
    banner_image_url: '/assets/new-images/bm/bm-Alite-Enclaves.png',
  },
  'kavalakat-group': {
    name: 'Kavalakat Group',
    hero_title: 'A Legacy of Trust and Excellence in Kerala',
    about_title: 'Kavalakat Group',
    about_description: "Kavalakat Group is a diversified business conglomerate based in Thrissur, Kerala, with decades of experience in trading, distribution, hospitality, and services.\n\nFounded on the principles of trust, quality, and customer commitment, the group has grown into one of the most respected business houses in Kerala, serving thousands of customers across multiple sectors.",
    about_image_url: '/assets/new-images/products/p-6.jpeg',
    features_title: 'Our Business Divisions',
    features_image_url: '/assets/new-images/about-page/cement/cement-prodect-page.png',
    features: [
      { id: 'kg1', title: 'Trading Division', content: 'Handling 11,000–13,000 MT of cement monthly along with steel, paints, roofing, and construction materials across Kerala.' },
      { id: 'kg2', title: 'Distribution Network', content: 'Authorized distributor for leading brands including UltraTech, JSW Steel, Tata Steel, and Asian Paints across Kerala.' },
      { id: 'kg3', title: 'Hospitality Ventures', content: 'Operating Alite Enclaves — premium service apartments in Thrissur — and Neyy Vedyam, a 72-seater vegetarian restaurant.' },
      { id: 'kg4', title: 'Logistics & Operations', content: 'Comprehensive logistics infrastructure with dedicated fleet and warehousing to support timely, undamaged material delivery.' },
    ],
    brands_heading: 'Core Strengths',
    brands: [
      { icon: '🏗️', companyName: 'Trading Leadership', description: 'One of Kerala\'s largest cement and steel traders, handling 11,000–13,000 MT monthly.' },
      { icon: '🤝', companyName: 'Brand Partnerships', description: 'Authorized distributor for UltraTech, Tata Steel, JSW Steel, and Asian Paints.' },
      { icon: '🏨', companyName: 'Hospitality', description: 'Premium service apartments and restaurants under the Kavalakat brand umbrella.' },
      { icon: '🚚', companyName: 'Logistics', description: 'Strong logistics network ensuring timely delivery across all districts of Kerala.' },
    ],
    testimonials: [
      { quote: 'A Brand You Can Trust!', text: 'Kavalakat Group has been our partner for over a decade. Their professionalism, product quality, and service levels are consistently excellent.', author: 'Suresh Nair', role: 'Builder, Ernakulam', img: '/assets/new-images/icon-person/5856.jpg' },
      { quote: 'Comprehensive Business Partner', text: 'From cement to hospitality, Kavalakat Group has diversified with quality and care. A true Thrissur institution.', author: 'Biji Thomas', role: 'Contractor, Thrissur', img: '/assets/new-images/icon-person/5856.jpg' },
    ],
    banner_image_url: '/assets/new-images/bm/bm-2.jpeg',
  },
  'neyy-vedyam': {
    name: 'Neyy Vedyam',
    hero_title: 'Authentic Kerala Cuisine in the Heart of Thrissur',
    about_title: 'Neyy Vedyam Restaurant',
    about_description: "Neyy Vedyam is a premium 72-seater vegetarian restaurant by the Kavalakat Group, located in the heart of Thrissur, Kerala, offering authentic traditional Kerala cuisine across two elegantly designed floors.\n\nFrom freshly prepared sadya spreads to Kerala breakfast staples and evening snacks, Neyy Vedyam is a celebration of the region's rich culinary heritage — served with warmth, purity, and the finest ingredients.",
    about_image_url: '/assets/new-images/products/product-img-2.png',
    features_title: 'Dining Experience',
    features_image_url: '/assets/new-images/about-page/cement/cement-prodect-page.png',
    features: [
      { id: 'nv1', title: 'Traditional Kerala Cuisine', content: 'Authentic Kerala recipes prepared with traditional methods and the finest locally sourced ingredients, preserving age-old flavors.' },
      { id: 'nv2', title: '72-Seater Elegant Ambience', content: 'Two elegantly designed floors offering comfortable seating for families, groups, and corporate gatherings in a warm, welcoming atmosphere.' },
      { id: 'nv3', title: '100% Vegetarian Menu', content: 'A completely vegetarian menu featuring breakfast, lunch sadya, evening snacks, and special Kerala delicacies prepared fresh daily.' },
      { id: 'nv4', title: 'Catering & Events', content: 'Professional catering services for weddings, corporate events, and functions with authentic Kerala flavors and customized menus.' },
    ],
    brands_heading: 'Our Specialties',
    brands: [
      { icon: '🍛', companyName: 'Kerala Sadya', description: 'Traditional Onam-style sadya with over 20 dishes served on banana leaf — pure, authentic, and unforgettable.' },
      { icon: '☕', companyName: 'Kerala Breakfast', description: 'Classic puttu, kadala, appam, stew, and more — the best way to start your day with authentic Kerala flavors.' },
      { icon: '🍲', companyName: 'Special Thali', description: 'Wholesome Kerala thali with rice, sambar, curries, chutneys, and desserts — a complete meal experience.' },
      { icon: '🧁', companyName: 'Evening Snacks', description: 'Traditional Kerala snacks including pazham pori, unniyappam, and chai — perfect for evening cravings.' },
    ],
    testimonials: [
      { quote: 'Best Vegetarian Food in Thrissur!', text: 'Neyy Vedyam serves the most authentic Kerala sadya I\'ve had in years. The banana leaf presentation and the variety of dishes is simply outstanding.', author: 'Meera Krishnan', role: 'Food Blogger, Kochi', img: '/assets/new-images/icon-person/5856.jpg' },
      { quote: 'A Taste of Home', text: 'Every dish at Neyy Vedyam reminds me of my grandmother\'s cooking. The freshness, the spices, the care — absolutely exceptional.', author: 'Vijayan Pillai', role: 'Regular Customer, Thrissur', img: '/assets/new-images/icon-person/5856.jpg' },
      { quote: 'Perfect for Family Dining', text: 'We hosted our family get-together at Neyy Vedyam. The catering team was professional and the food was praised by everyone. Highly recommended!', author: 'Sheela Thomas', role: 'Customer, Palakkad', img: '/assets/new-images/icon-person/5856.jpg' },
    ],
    banner_image_url: '/assets/new-images/bm/bm-2.jpeg',
  },
}

/* ─────────────── STAT ITEMS (for services page unique design) ─────────────── */
const serviceStats: Record<string, { number: string; label: string }[]> = {
  'alite-enclaves': [
    { number: '4+', label: 'Room Categories' },
    { number: '100%', label: 'Guest Satisfaction' },
    { number: '24/7', label: 'Front Desk Support' },
    { number: '5★', label: 'Guest Experience' },
  ],
  'kavalakat-group': [
    { number: '30+', label: 'Years Experience' },
    { number: '5+', label: 'Business Divisions' },
    { number: '1000+', label: 'Happy Clients' },
    { number: '100%', label: 'Commitment' },
  ],
  'neyy-vedyam': [
    { number: '72', label: 'Seater Capacity' },
    { number: '2', label: 'Elegant Floors' },
    { number: '20+', label: 'Sadya Dishes' },
    { number: '100%', label: 'Vegetarian' },
  ],
}

function safeParseJSON<T>(raw: any, fallback: T[] = []): T[] {
  if (Array.isArray(raw)) return raw
  if (!raw) return fallback
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : fallback
  } catch { return fallback }
}

/* ─────────────── COMPONENT ─────────────── */
const ServicesDetailPage = () => {
  const params = useParams()
  const slug = params?.slug as string

  const [item, setItem] = useState<ServiceItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null)
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const targetName = SLUG_TO_NAME[slug] || slug.replace(/-/g, ' ')
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'https://kavalakat-api.onrender.com/api'}/portfolio/`
        )
        if (!res.ok) throw new Error('API error')
        const data = await res.json()
        const items = Array.isArray(data) ? data : (data.results ?? [])

        const found = items.find((i: any) =>
          i.name?.toLowerCase() === targetName.toLowerCase() &&
          ['services', 'service'].includes((i.category_slug || '').toLowerCase())
        )

        if (found) {
          found.features = safeParseJSON(found.features ?? found.features_json)
          found.brands = safeParseJSON(found.brands ?? found.brands_json)
          found.testimonials = safeParseJSON(found.testimonials ?? found.testimonials_json)
          setItem(found)
        } else {
          throw new Error('Not found')
        }
      } catch {
        const fb = FALLBACK[slug]
        if (fb) setItem(fb as ServiceItem)
        else setItem(null)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [slug])

  const testimonials = item?.testimonials ?? []
  const features = item?.features ?? []
  const brands = item?.brands ?? []
  const stats = serviceStats[slug] ?? []

  useEffect(() => {
    startAutoSlide()
    return () => stopAutoSlide()
  }, [slug, testimonials.length])

  const startAutoSlide = () => {
    stopAutoSlide()
    if (!testimonials.length) return
    autoSlideRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % testimonials.length)
    }, 4000)
  }
  const stopAutoSlide = () => { if (autoSlideRef.current) clearInterval(autoSlideRef.current) }
  const nextSlide = () => { stopAutoSlide(); setCurrentSlide(p => (p + 1) % testimonials.length); startAutoSlide() }
  const prevSlide = () => { stopAutoSlide(); setCurrentSlide(p => (p - 1 + testimonials.length) % testimonials.length); startAutoSlide() }
  const toggleAccordion = (id: string) => setActiveAccordion(activeAccordion === id ? null : id)

  if (loading) {
    return (
      <>
        <InnerPageHeader />
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="svc-loader">
            <div className="lb" /><div className="lb" /><div className="lb" />
          </div>
        </div>
        <FooterTop /><Footer1 />
        <style>{`.svc-loader{display:flex;gap:8px;align-items:flex-end}.lb{width:6px;background:#000;border-radius:3px;animation:sl 0.8s ease infinite}.lb:nth-child(1){height:20px;animation-delay:0s}.lb:nth-child(2){height:32px;animation-delay:0.15s}.lb:nth-child(3){height:20px;animation-delay:0.3s}@keyframes sl{0%,100%{opacity:0.3}50%{opacity:1}}`}</style>
      </>
    )
  }

  if (!item) {
    return (
      <>
        <InnerPageHeader />
        <div className="container pt-120 mb-120 text-center">
          <h2>Service Not Found</h2>
          <Link href="/product" className="primary-btn1 black-bg mt-4 d-inline-flex">
            <span>Back to Portfolio</span><span>Back to Portfolio</span>
          </Link>
        </div>
        <FooterTop /><Footer1 />
      </>
    )
  }

  const heroDescParts = item.about_description?.split('\n\n') ?? []

  return (
    <>
      <InnerPageHeader />

      <Breadcrumb
        title={item.name}
        subtitle={item.about_title || item.name}
        image={item.banner_image_url || '/assets/new-images/bm/bm-2.jpeg'}
      />

      {/* ── Section 1: Hero (Services unique layout — two column with image grid) ── */}
      <div className="pt-120 mb-120">
        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-lg-6 wow animate fadeInLeft" data-wow-delay="200ms" data-wow-duration="1500ms">
              <div className="section-title mb-4">
                <span>{item.about_title || 'Kavalakat Services'}</span>
                <h2>{item.hero_title}</h2>
              </div>
              {heroDescParts.length
                ? heroDescParts.map((para, i) => (
                    <p key={i} style={{ color: '#555', lineHeight: '1.85', marginBottom: '16px' }}>{para}</p>
                  ))
                : <p style={{ color: '#555', lineHeight: '1.85' }}>{item.description}</p>
              }
              <Link className="primary-btn1 black-bg mt-4" href="/contact">
                <span>Get In Touch</span>
                <span>Get In Touch</span>
                <svg className="arrow" width={23} height={23} viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M0.113861 0H22.9999V4.28425L4.32671 22.9997L0 18.7154L12.7524 6.08815L0.113861 6.20089V0Z" />
                    <path d="M23 22.9996V8.56848L16.8516 14.6566V22.9996H23Z" />
                  </g>
                </svg>
              </Link>
            </div>
            <div className="col-lg-6 wow animate fadeInRight" data-wow-delay="300ms" data-wow-duration="1500ms">
              <div className="svc-hero-img-grid">
                <div className="svc-img-main">
                  <Image
                    width={560}
                    height={380}
                    src={item.about_image_url || item.image_url || '/assets/new-images/products/p-1.jpeg'}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="svc-img-row">
                  <div className="svc-img-small">
                    <Image
                      width={260}
                      height={180}
                      src={item.features_image_url || '/assets/new-images/products/p-2.jpeg'}
                      alt="detail"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="svc-img-small svc-img-dark">
                    <div className="svc-stat-mini">
                      <span className="svc-stat-number">{stats[0]?.number || '30+'}</span>
                      <span className="svc-stat-label">{stats[0]?.label || 'Years'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Stats Bar ── */}
      {stats.length > 0 && (
        <div className="svc-stats-bar mb-120">
          <div className="container-fluid px-0">
            <div className="svc-stats-wrap">
              {stats.map((stat, i) => (
                <div key={i} className="svc-stat-item">
                  <h3 className="svc-stat-number">{stat.number}</h3>
                  <p className="svc-stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Section 3: Amenities / Offerings Grid ── */}
      {brands.length > 0 && (
        <div className="mb-120">
          <div className="container">
            <div className="row mb-50">
              <div className="col-lg-7">
                <div className="section-title">
                  <span>{item.brands_heading || 'What We Offer'}</span>
                  <h2>Designed for Your Needs</h2>
                </div>
              </div>
            </div>
            <div className="row g-0">
              {brands.map((brand, i) => (
                <div key={i} className="col-lg-4 col-md-6">
                  <div className={`svc-amenity-card ${i < 3 ? 'top-row' : ''} ${i % 3 === 0 ? 'left-col' : ''} ${i % 3 === 2 ? 'right-col' : ''}`}>
                    {brand.icon ? (
                      <div className="svc-amenity-icon">{brand.icon}</div>
                    ) : brand.logo ? (
                      <div className="svc-amenity-img">
                        <Image width={48} height={48} src={brand.logo} alt={brand.logoAlt || brand.companyName} style={{ objectFit: 'contain' }} />
                      </div>
                    ) : (
                      <div className="svc-amenity-icon">✦</div>
                    )}
                    <h5 className="svc-amenity-title">{brand.companyName}</h5>
                    <p className="svc-amenity-desc">{brand.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Section 4: FAQ / Features (services use the same accordion layout) ── */}
      {features.length > 0 && (
        <div className="product-dt-faq-section mb-120">
          <div className="container">
            <div className="product-dt-faq-wrapper">
              <div className="row g-0">
                <div className="col-lg-6 d-none d-lg-block">
                  <div className="product-dt-faq-img">
                    <Image
                      width={650}
                      height={650}
                      src={item.features_image_url || '/assets/new-images/about-page/steel/steel-prodect-page.png'}
                      alt="Features"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="faq-content-area p-4">
                    <h2 className="mb-4">{item.features_title || 'Our Services'}</h2>
                    <div className="faq-wrap">
                      <div className="accordion">
                        {features.map((feat) => (
                          <div className="accordion-item mb-3 animated-accordion" key={feat.id}>
                            <h2 className="accordion-header">
                              <button
                                className={`accordion-button ${activeAccordion === feat.id ? '' : 'collapsed'}`}
                                type="button"
                                onClick={() => toggleAccordion(feat.id)}
                              >
                                {feat.title}
                              </button>
                            </h2>
                            <div
                              className={`accordion-collapse ${activeAccordion === feat.id ? 'show' : ''}`}
                              style={{
                                maxHeight: activeAccordion === feat.id ? '500px' : '0',
                                overflow: 'hidden',
                                transition: 'max-height 0.4s ease-in-out',
                              }}
                            >
                              <div className="accordion-body">{feat.content}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link className="primary-btn1 black-bg" href="/contact">
                <span>Enquire Now</span>
                <span>Enquire Now</span>
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
      )}

      {/* ── Section 5: Testimonials ── */}
      {testimonials.length > 0 && (
        <div className="home1-testimonial-section">
          <div className="container-fluid">
            <div className="row gy-5">
              <div className="col-xl-4">
                <div className="testimonial-title-area">
                  <div className="section-title">
                    <span>Testimonials</span>
                    <h2>Trusted by Our Guests.</h2>
                  </div>
                  <ul className="rating-list mt-4">
                    <li className="mb-3">
                      <a href="https://clutch.co/" className="single-rating d-flex align-items-center gap-3 p-3 border rounded">
                        <div className="review">
                          <span className="d-block small">Review On</span>
                          <Image width={60} height={20} src="/assets/img/home1/icon/clutch-logo.svg" alt="Clutch" />
                        </div>
                        <div className="rating">
                          <ul className="star d-flex gap-1">
                            {[...Array(4)].map((_, i) => <li key={i}><i className="bi bi-star-fill text-warning" /></li>)}
                            <li><i className="bi bi-star-half text-warning" /></li>
                          </ul>
                          <span className="small">(50 reviews)</span>
                        </div>
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="https://www.google.com/" className="single-rating google d-flex align-items-center gap-3 p-3 border rounded">
                        <div className="review">
                          <span className="d-block small">Review On</span>
                          <Image width={60} height={20} src="/assets/img/home1/icon/google-logo.svg" alt="Google" />
                        </div>
                        <div className="rating">
                          <ul className="star d-flex gap-1">
                            {[...Array(4)].map((_, i) => <li key={i}><i className="bi bi-star-fill text-warning" /></li>)}
                            <li><i className="bi bi-star-half text-warning" /></li>
                          </ul>
                          <span className="small">(50 reviews)</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="position-relative">
                  <div className="testimonial-slider">
                    <div className="testimonial-card bg-white p-4 shadow-sm fade-in">
                      <svg className="quote mb-3" width={46} height={42} viewBox="0 0 46 42" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M19.3074 22.4375C19.0109 24.7824 18.4898 27.0555 17.9059 28.5469C15.8664 33.7848 11.2574 38.277 5.21094 40.9184C4.07891 41.4125 3.00977 41.2418 2.37188 40.4691C2.22813 40.2895 1.64415 39.1754 1.07813 38.0074L1.07111 37.9928C0.0628121 35.8959 0.0449269 35.8587 0.0449268 35.2402C0.0539122 34.0902 0.413287 33.668 2.06641 32.8773C5.27383 31.332 7.16055 29.5801 8.40039 26.9746C8.98438 25.7438 9.28086 24.8543 9.55938 23.4707C9.73907 22.5723 9.97266 20.5867 9.97266 19.9129C9.97266 19.7422 9.87383 19.7422 6.21719 19.7422L2.46172 19.7422L1.99454 19.5086C1.73399 19.3828 1.40157 19.1313 1.25782 18.9516C1.18695 18.8658 1.12525 18.7941 1.07158 18.7167C0.703361 18.1862 0.713199 17.3932 0.736722 10.0301L0.73675 10.0223C0.763674 2.37538 0.763737 2.3573 0.952347 1.99805C1.22188 1.50391 1.58125 1.15352 2.06641 0.928908C2.47071 0.740236 2.5336 0.740236 10.2871 0.740235L18.1035 0.740235L18.4719 0.937891C18.948 1.18945 19.3344 1.57578 19.55 2.01602C19.7117 2.33945 19.7207 2.68086 19.7207 10.2188C19.7207 18.3945 19.6848 19.4996 19.3074 22.4375Z" fill="currentColor" />
                      </svg>
                      <span className="d-block fw-bold mb-2">{testimonials[currentSlide]?.quote}</span>
                      <p className="mb-4">{testimonials[currentSlide]?.text}</p>
                      <div className="author-area d-flex align-items-center gap-3">
                        <div className="author-img">
                          <Image
                            width={50}
                            height={50}
                            src={testimonials[currentSlide]?.img || '/assets/new-images/icon-person/5856.jpg'}
                            alt={testimonials[currentSlide]?.author ?? ''}
                            className="rounded-circle"
                          />
                        </div>
                        <div className="author-content">
                          <h5 className="mb-0">{testimonials[currentSlide]?.author}</h5>
                          <span className="small text-muted">{testimonials[currentSlide]?.role}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slider-btn-grp d-flex gap-3 mt-4 justify-content-center">
                    <button className="slider-btn testimonial-slider-prev" onClick={prevSlide} aria-label="Previous">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <div className="d-flex align-items-center gap-2">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          className={`slide-indicator ${currentSlide === index ? 'active' : ''}`}
                          onClick={() => { stopAutoSlide(); setCurrentSlide(index); startAutoSlide() }}
                          aria-label={`Slide ${index + 1}`}
                        />
                      ))}
                    </div>
                    <button className="slider-btn testimonial-slider-next" onClick={nextSlide} aria-label="Next">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ── Services Hero Image Grid ── */
        .svc-hero-img-grid { display: flex; flex-direction: column; gap: 4px; }
        .svc-img-main { width: 100%; height: 280px; overflow: hidden; border-radius: 0; }
        .svc-img-row { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; }
        .svc-img-small { height: 160px; overflow: hidden; }
        .svc-img-dark { background: #000; display: flex; align-items: center; justify-content: center; }
        .svc-stat-mini { text-align: center; }
        .svc-stat-mini .svc-stat-number { display: block; font-size: 2.5rem; font-weight: 900; color: #fff; line-height: 1; }
        .svc-stat-mini .svc-stat-label { display: block; font-size: 0.65rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 2px; margin-top: 6px; }

        /* ── Stats Bar ── */
        .svc-stats-bar { background: #000; padding: 60px 0; }
        .svc-stats-wrap { display: grid; grid-template-columns: repeat(4, 1fr); }
        .svc-stat-item { text-align: center; padding: 40px 20px; border-right: 1px solid rgba(255,255,255,0.08); }
        .svc-stat-item:last-child { border-right: none; }
        .svc-stat-number { font-size: 4rem; font-weight: 900; color: #fff; margin: 0 0 10px; line-height: 1; letter-spacing: -2px; }
        .svc-stat-label { color: rgba(255,255,255,0.45); font-size: 0.75rem; margin: 0; text-transform: uppercase; letter-spacing: 3px; font-weight: 600; }

        /* ── Amenity Grid ── */
        .svc-amenity-card {
          background: #fff;
          border: 1px solid #e8e8e8;
          border-top: none;
          border-left: none;
          padding: 36px 32px;
          height: 100%;
          transition: background 0.3s ease;
        }
        .svc-amenity-card.top-row { border-top: 1px solid #e8e8e8; }
        .svc-amenity-card.left-col { border-left: 1px solid #e8e8e8; }
        .svc-amenity-card:hover { background: #000; }
        .svc-amenity-card:hover .svc-amenity-title { color: #fff; }
        .svc-amenity-card:hover .svc-amenity-desc { color: rgba(255,255,255,0.6); }
        .svc-amenity-card:hover .svc-amenity-icon { filter: grayscale(1) brightness(5); }
        .svc-amenity-icon { font-size: 2rem; margin-bottom: 18px; display: block; transition: filter 0.3s; }
        .svc-amenity-img { margin-bottom: 18px; }
        .svc-amenity-title { font-weight: 700; color: #000; margin-bottom: 10px; font-size: 1rem; transition: color 0.3s; }
        .svc-amenity-desc { color: #777; font-size: 0.88rem; line-height: 1.75; margin: 0; transition: color 0.3s; }

        /* ── Testimonials ── */
        .testimonial-card { animation: fadeSlide 0.6s ease; border-radius: 0 !important; }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* ── Accordion ── */
        .content-wrapper { display: flex; align-items: flex-start; gap: 24px; }
        .animated-accordion .feature-img { transform: scale(0.95); transition: transform 0.4s ease; }
        .animated-accordion .accordion-collapse.show .feature-img { transform: scale(1); }

        /* ── Responsive ── */
        @media (max-width: 992px) {
          .svc-stats-wrap { grid-template-columns: repeat(2, 1fr); }
          .svc-stat-item:nth-child(2) { border-right: none; }
          .svc-stat-item:nth-child(3) { border-top: 1px solid rgba(255,255,255,0.08); }
        }
        @media (max-width: 768px) {
          .svc-img-main { height: 220px; }
          .svc-img-small { height: 130px; }
          .svc-stat-number { font-size: 2.8rem; }
          .svc-amenity-card { padding: 24px 20px; }
        }
        @media (max-width: 576px) {
          .svc-stats-wrap { grid-template-columns: repeat(2, 1fr); }
          .svc-stat-item { border-bottom: 1px solid rgba(255,255,255,0.08); border-right: none; }
          .svc-stat-item:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.08); }
        }
      `}</style>

      <FooterTop />
      <Footer1 />
    </>
  )
}

export default ServicesDetailPage