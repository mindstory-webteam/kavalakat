"use client"
import FooterTop from '@/components/FooterTop'
import InnerPageHeader from '@/components/InnerPageHeader'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Footer1 from '@/components/Footer'
import Breadcrumb from '@/components/common/Breadcrumb'
import Image from 'next/image'

// ─── Types (inline — no external import needed) ───────────────────────────

interface PortfolioItem {
  id: number
  name: string
  description: string
  image_url: string
  category_name: string
  category_slug: string
  is_active: boolean
  order: number
}

type Section = "trading" | "distribution" | "services" | "unknown"

// ─── Smart classification (mirrors lib/api.ts logic) ─────────────────────
// This ensures even if admin sets the wrong category slug, items still
// appear in the correct section based on their name.

const TRADING_SLUGS    = new Set(["trading","product","products","trade"])
const DISTRIBUTION_SLUGS = new Set(["distribution","distributions","distribute"])
const SERVICES_SLUGS   = new Set(["services","service","hospitality"])

const TRADING_NAMES    = new Set(["cement","steel","steels","roofing solutions","roofing","white cement & paint","white cement paint","construction chemicals","abrasives construction chemicals","hardware & tools","hardware tools","sheet & pipe","sheet pipe"])
const DISTRIBUTION_NAMES = new Set(["ultratech","jk cement","tata steel","jsw steel","asian paints","berger paints"])
const SERVICES_NAMES   = new Set(["kavalakat group","alite enclaves","neyy vedyam","neey vedhyam"])

function classify(item: PortfolioItem): Section {
  const slug    = (item.category_slug || "").toLowerCase().trim()
  const catName = (item.category_name || "").toLowerCase().trim()
  const name    = (item.name || "").toLowerCase().trim()

  if (TRADING_SLUGS.has(slug)    || TRADING_SLUGS.has(catName))    return "trading"
  if (DISTRIBUTION_SLUGS.has(slug) || DISTRIBUTION_SLUGS.has(catName)) return "distribution"
  if (SERVICES_SLUGS.has(slug)   || SERVICES_SLUGS.has(catName))   return "services"

  if (TRADING_NAMES.has(name))      return "trading"
  if (DISTRIBUTION_NAMES.has(name)) return "distribution"
  if (SERVICES_NAMES.has(name))     return "services"

  return "unknown"
}

function buildHref(item: PortfolioItem): string {
  const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")
  const section = classify(item)
  if (section === "trading")      return `/product/${slug}`
  if (section === "distribution") return `/distribution/${slug}`
  if (section === "services")     return `/services/${slug}`
  return `/portfolio/${slug}`
}

// ─── Arrow SVGs ───────────────────────────────────────────────────────────

const ArrowSvg = () => (
  <svg width={18} height={19} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" />
    <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" />
  </svg>
)

const ArrowSvgSm = () => (
  <svg width={13} height={13} viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.0891088 0.0541992H18V3.40711L3.38614 18.054L0 14.7011L9.98019 4.81886L0.0891088 4.90709V0.0541992Z" fill="currentColor"/>
    <path d="M18.0004 18.0543V6.76025L13.1885 11.5249V18.0543H18.0004Z" fill="currentColor"/>
  </svg>
)

// ─── Product Card ─────────────────────────────────────────────────────────

const ProductCard = ({ href, src, alt, title, desc, delay }: {
  href: string; src: string; alt: string; title: string; desc: string; delay: string
}) => (
  <div className="pg-card wow animate fadeInDown" data-wow-delay={delay} data-wow-duration="1500ms">
    <div className="pg-card-img">
      <Image
        width={400} height={280}
        src={src || '/assets/new-images/products/p-1.jpeg'}
        alt={alt}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        onError={(e) => { (e.target as HTMLImageElement).src = '/assets/new-images/products/p-1.jpeg' }}
      />
      <Link href={href} className="pg-card-arrow"><ArrowSvg /></Link>
    </div>
    <div className="pg-card-body">
      <h4 className="pg-card-title"><Link href={href}>{title}</Link></h4>
      <p className="pg-card-desc">{desc}</p>
      <Link href={href} className="pg-card-more">View Details <ArrowSvgSm /></Link>
    </div>
  </div>
)

// ─── Skeleton ────────────────────────────────────────────────────────────

const CardSkeleton = () => (
  <div className="pg-card-skeleton">
    <div className="sk-img" />
    <div className="sk-body">
      <div className="sk-line short" /><div className="sk-line" /><div className="sk-line medium" />
    </div>
  </div>
)

// ─── Section component ───────────────────────────────────────────────────

const Section = ({
  eyebrow, title, items, loading, skeletonCount
}: {
  eyebrow: string
  title: string
  items: PortfolioItem[]
  loading: boolean
  skeletonCount: number
}) => (
  <div className="pg-division">
    <div className="pg-division-top">
      <span className="pg-div-eyebrow">{eyebrow}</span>
      <div className="pg-div-head-row">
        <h2 className="pg-div-title" dangerouslySetInnerHTML={{ __html: title }} />
        <Link href="/contact" className="pg-div-cta">CONTACT US NOW <ArrowSvgSm /></Link>
      </div>
      <div className="pg-div-rule" />
    </div>
    <div className="pg-grid pg-grid-3">
      {loading
        ? Array.from({ length: skeletonCount }).map((_, i) => <CardSkeleton key={i} />)
        : items.length === 0
          ? (
            <div className="pg-empty">
              <p>No items available yet. Check back soon.</p>
            </div>
          )
          : items.map((item, index) => (
            <ProductCard
              key={item.id}
              href={buildHref(item)}
              src={item.image_url || `/assets/new-images/products/p-${(index % 6) + 1}.jpeg`}
              alt={item.name}
              title={item.name}
              desc={item.description}
              delay={`${(index + 1) * 100}ms`}
            />
          ))
      }
    </div>
  </div>
)

// ─── Main Page ────────────────────────────────────────────────────────────

const API = process.env.NEXT_PUBLIC_API_URL || "https://kavalakat-api.onrender.com/api"

const PortfolioPage = () => {
  const [trading,      setTrading]      = useState<PortfolioItem[]>([])
  const [distribution, setDistribution] = useState<PortfolioItem[]>([])
  const [services,     setServices]     = useState<PortfolioItem[]>([])
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)

      try {
        // ── Step 1: try dedicated /portfolio/page/ endpoint ─────────────
        let tradingItems:      PortfolioItem[] = []
        let distributionItems: PortfolioItem[] = []
        let servicesItems:     PortfolioItem[] = []
        let gotPageData = false

        try {
          const pageRes = await fetch(`${API}/portfolio/page/`)
          if (pageRes.ok) {
            const pageData = await pageRes.json()
            if (pageData && typeof pageData === 'object' && !Array.isArray(pageData)) {
              // API returns { trading: [], distribution: [], services: [] }
              tradingItems      = Array.isArray(pageData.trading)      ? pageData.trading      : []
              distributionItems = Array.isArray(pageData.distribution) ? pageData.distribution : []
              servicesItems     = Array.isArray(pageData.services)     ? pageData.services     : []
              gotPageData       = tradingItems.length > 0 || distributionItems.length > 0 || servicesItems.length > 0
            }
          }
        } catch { /* fall through */ }

        // ── Step 2: flat list + smart classification ─────────────────────
        if (!gotPageData) {
          // Try /portfolio/items/ first, then /portfolio/
          let allItems: PortfolioItem[] = []
          const endpoints = [`${API}/portfolio/items/`, `${API}/portfolio/`]

          for (const url of endpoints) {
            try {
              const res = await fetch(url)
              if (res.ok) {
                const data = await res.json()
                const list: PortfolioItem[] = Array.isArray(data)
                  ? data
                  : (data.results ?? data.items ?? [])
                if (list.length > 0) {
                  allItems = list
                  break
                }
              }
            } catch { /* try next */ }
          }

          // Filter active and sort
          const active = allItems
            .filter(i => i.is_active !== false)
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

          for (const item of active) {
            const section = classify(item)
            if (section === "trading")           tradingItems.push(item)
            else if (section === "distribution") distributionItems.push(item)
            else if (section === "services")     servicesItems.push(item)
          }
        }

        setTrading(tradingItems)
        setDistribution(distributionItems)
        setServices(servicesItems)

      } catch (err: any) {
        console.error("Portfolio fetch error:", err)
        setError(err?.message || "Failed to load portfolio data")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <>
      <InnerPageHeader />
      <Breadcrumb
        title="Our Portfolio"
        subtitle="Products Power Progress — Explore Our Offerings."
        image='/assets/new-images/bm/bm-2.jpeg'
      />

      <div className="pg-page pt-120 mb-120" id="scroll-section">
        <div className="container">

          {error && (
            <div className="pg-error-banner">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx={12} cy={12} r={10}/><line x1={12} y1={8} x2={12} y2={12}/><line x1={12} y1={16} x2={12.01} y2={16}/>
              </svg>
              <span>Could not load portfolio data from server. Showing available content.</span>
            </div>
          )}

          <Section eyebrow="01 — Trading"      title="Building Materials<br/>&amp; Products"   items={trading}      loading={loading} skeletonCount={6} />
          <Section eyebrow="02 — Distribution" title="Our Brand<br/>Partners"                  items={distribution} loading={loading} skeletonCount={5} />
          <Section eyebrow="03 — Services"     title="Hospitality &amp;<br/>Group Ventures"    items={services}     loading={loading} skeletonCount={3} />

        </div>
      </div>

      <style>{`
        .pg-page { background: #fff; }

        .pg-error-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff8e1;
          border: 1px solid #ffe082;
          color: #795548;
          padding: 12px 20px;
          border-radius: 6px;
          font-size: 0.85rem;
          margin-bottom: 40px;
        }

        .pg-division { padding: 0 0 100px; border-bottom: 1px solid #ebebeb; margin-bottom: 80px; }
        .pg-division:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }

        .pg-division-top { padding: 56px 0 0; margin-bottom: 48px; }

        .pg-div-eyebrow {
          display: block; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 4px; text-transform: uppercase; color: #aaa; margin-bottom: 14px;
        }
        .pg-div-head-row {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 24px; margin-bottom: 32px;
        }
        .pg-div-title {
          font-size: clamp(2.2rem, 4.5vw, 3.6rem); font-weight: 800;
          color: #0a0a0a; line-height: 1.1; margin: 0; letter-spacing: -1.5px;
        }
        .pg-div-cta {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 2.5px;
          text-transform: uppercase; color: #999;
          text-decoration: underline; text-underline-offset: 5px;
          text-decoration-color: #ccc; flex-shrink: 0; padding-bottom: 4px;
          transition: color 0.2s, text-decoration-color 0.2s;
        }
        .pg-div-cta:hover { color: #000; text-decoration-color: #000; }
        .pg-div-rule { width: 100%; height: 1px; background: #e0e0e0; }

        .pg-grid { display: grid; gap: 24px; }
        .pg-grid-3 { grid-template-columns: repeat(3, 1fr); }

        .pg-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: #aaa;
          font-size: 0.9rem;
          border: 2px dashed #e0e0e0;
          border-radius: 8px;
        }

        /* ── Card ── */
        .pg-card {
          border: 1px solid #ebebeb; border-radius: 4px;
          display: flex; flex-direction: column; background: #fff;
          transition: background 0.3s ease, box-shadow 0.3s ease;
          position: relative; overflow: hidden;
        }
        .pg-card:hover { background: #fafafa; box-shadow: 0 4px 24px rgba(0,0,0,0.07); }

        .pg-card-img {
          position: relative; width: 100%; overflow: hidden;
          aspect-ratio: 4/3; background: #f4f4f4;
        }
        .pg-card-img img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }
        .pg-card:hover .pg-card-img img { transform: scale(1.05); }

        .pg-card-arrow {
          position: absolute; bottom: 0; right: 0;
          width: 40px; height: 40px; background: #000;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: translate(4px,4px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .pg-card-arrow svg { fill: #fff; }
        .pg-card:hover .pg-card-arrow { opacity: 1; transform: translate(0,0); }

        .pg-card-body {
          padding: 24px 26px 28px; display: flex; flex-direction: column; gap: 10px; flex: 1;
        }
        .pg-card-title { font-size: 0.95rem; font-weight: 700; margin: 0; line-height: 1.3; }
        .pg-card-title a { color: #0a0a0a; text-decoration: none; transition: color 0.2s; }
        .pg-card-title a:hover { color: #444; }

        .pg-card-desc { font-size: 0.8rem; color: #777; line-height: 1.7; margin: 0; flex: 1; }

        .pg-card-more {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.68rem; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: #000; text-decoration: none;
          margin-top: 4px; transition: gap 0.2s;
        }
        .pg-card-more:hover { gap: 10px; }

        /* ── Skeleton ── */
        .pg-card-skeleton { border: 1px solid #ebebeb; border-radius: 4px; overflow: hidden; }
        .sk-img {
          aspect-ratio: 4/3;
          background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);
          background-size: 200% 100%; animation: shimmer 1.5s infinite;
        }
        .sk-body { padding: 24px 26px; display: flex; flex-direction: column; gap: 10px; }
        .sk-line {
          height: 12px; border-radius: 4px;
          background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);
          background-size: 200% 100%; animation: shimmer 1.5s infinite;
        }
        .sk-line.short { width: 40%; }
        .sk-line.medium { width: 60%; }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .pg-grid-3 { grid-template-columns: repeat(2,1fr); gap: 16px; }
          .pg-div-head-row { flex-direction: column; align-items: flex-start; gap: 16px; }
          .pg-div-title { font-size: 2rem; letter-spacing: -0.5px; }
          .pg-division { padding-bottom: 60px; margin-bottom: 40px; }
          .pg-division-top { padding-top: 40px; margin-bottom: 32px; }
        }
        @media (max-width: 480px) { .pg-grid-3 { grid-template-columns: 1fr; gap: 12px; } }
      `}</style>

      <FooterTop />
      <Footer1 />
    </>
  )
}

export default PortfolioPage