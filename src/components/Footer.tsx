// ✅ FILE PATH: src/components/Footer.tsx
"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getContact } from '@/lib/api'
import type { Contact } from '@/lib/api'

const API = process.env.NEXT_PUBLIC_API_URL || "https://kavalakat-api.onrender.com/api"

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavItem   { name: string; href: string }
interface NavGroups { trading: NavItem[]; distribution: NavItem[]; services: NavItem[] }

// ─── Helpers ──────────────────────────────────────────────────────────────────
function unwrapEnvelope(json: any): any {
  if (json !== null && typeof json === "object" && !Array.isArray(json) && "success" in json && "data" in json)
    return json.data
  return json
}

function nameToSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

// ─── Classification (mirrors Header exactly) ──────────────────────────────────
const TRADING_SLUGS      = new Set(["trading", "product", "products", "trade"])
const DISTRIBUTION_SLUGS = new Set(["distribution", "distributions", "distribute"])
const SERVICES_SLUGS     = new Set(["services", "service", "hospitality"])

const TRADING_NAMES = new Set([
  "cement", "steel", "steels", "roofing solutions", "roofing",
  "white cement & paint", "white cement paint", "white cement and paint",
  "construction chemicals", "abrasives construction chemicals",
  "hardware & tools", "hardware tools", "hardware and tools",
  "sheet & pipe", "sheet pipe", "sheet and pipe",
])
const DISTRIBUTION_NAMES = new Set([
  "ultratech", "jk cement", "tata steel", "jsw steel", "asian paints", "berger paints",
])
const SERVICES_NAMES = new Set([
  "kavalakat group", "alite enclaves", "neyy vedyam", "neey vedhyam", "neyy vedhyam",
])

type Section = "trading" | "distribution" | "services" | "unknown"

function classifyItem(item: any): Section {
  const slug    = (item.category_slug || "").toLowerCase().trim()
  const catName = (item.category_name || "").toLowerCase().trim()
  const name    = (item.name          || "").toLowerCase().trim()

  if (TRADING_SLUGS.has(slug)      || TRADING_SLUGS.has(catName))      return "trading"
  if (DISTRIBUTION_SLUGS.has(slug) || DISTRIBUTION_SLUGS.has(catName)) return "distribution"
  if (SERVICES_SLUGS.has(slug)     || SERVICES_SLUGS.has(catName))     return "services"
  if (TRADING_NAMES.has(name))      return "trading"
  if (DISTRIBUTION_NAMES.has(name)) return "distribution"
  if (SERVICES_NAMES.has(name))     return "services"
  return "unknown"
}

function buildHref(item: any): string {
  const slug    = nameToSlug(item.name || "")
  const section = classifyItem(item)
  if (section === "trading")      return `/product/${slug}`
  if (section === "distribution") return `/distribution/${slug}`
  if (section === "services")     return `/services/${slug}`
  return `/portfolio/${slug}`
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const LinkArrow = () => (
  <svg width={9} height={9} viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.0445549 0H9.00008V1.67647L1.69308 9L0 7.32353L4.99014 2.38235L0.0445549 2.42647V0Z" />
    <path d="M9.0002 8.9996V3.35254L6.59424 5.73489V8.9996H9.0002Z" />
  </svg>
)

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link href={href} className="footer-nav-link">
      <span className="footer-nav-arrow"><LinkArrow /></span>
      <span className="footer-nav-text">{label}</span>
    </Link>
  </li>
)

// ─── Main Component ───────────────────────────────────────────────────────────
const Footer = () => {
  const [contactInfo, setContactInfo] = useState<Contact | null>(null)
  const [navItems,    setNavItems]    = useState<NavGroups>({ trading: [], distribution: [], services: [] })

  // ── Fetch contact ──────────────────────────────────────────────────────────
  useEffect(() => {
    getContact().then((data) => { if (data) setContactInfo(data) })
  }, [])

  // ── Fetch portfolio — identical strategy to Header ─────────────────────────
  useEffect(() => {
    const load = async () => {
      try {
        // Strategy 1: /portfolio/page/ (pre-split by backend)
        try {
          const res = await fetch(`${API}/portfolio/page/`)
          if (res.ok) {
            const json = await res.json()
            const page = unwrapEnvelope(json)
            if (page && (page.trading?.length || page.distribution?.length || page.services?.length)) {
              setNavItems({
                trading:      (page.trading      ?? []).map((i: any) => ({ name: i.name, href: buildHref(i) })),
                distribution: (page.distribution ?? []).map((i: any) => ({ name: i.name, href: buildHref(i) })),
                services:     (page.services     ?? []).map((i: any) => ({ name: i.name, href: buildHref(i) })),
              })
              return
            }
          }
        } catch { /* fall through */ }

        // Strategy 2: flat items list, classify locally
        let allItems: any[] = []
        for (const url of [`${API}/portfolio/items/`, `${API}/portfolio/`]) {
          try {
            const res  = await fetch(url)
            if (!res.ok) continue
            const json = await res.json()
            const data = unwrapEnvelope(json)
            const list = Array.isArray(data) ? data : (data.results ?? data.items ?? [])
            if (list.length) { allItems = list; break }
          } catch { /* next */ }
        }

        if (!allItems.length) return

        const active = allItems
          .filter((i: any) => i.is_active !== false)
          .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))

        const trading: NavItem[] = [], distribution: NavItem[] = [], services: NavItem[] = []
        for (const item of active) {
          const section = classifyItem(item)
          const entry   = { name: item.name, href: buildHref(item) }
          if      (section === "trading")      trading.push(entry)
          else if (section === "distribution") distribution.push(entry)
          else if (section === "services")     services.push(entry)
        }

        setNavItems({ trading, distribution, services })
      } catch {
        // silently ignore — columns stay empty
      }
    }
    load()
  }, [])

  const fullAddress = contactInfo
    ? [contactInfo.address, contactInfo.city, contactInfo.state, contactInfo.pincode].filter(Boolean).join(', ')
    : ""

  return (
    <footer className="footer-section style-3">
      <div className="footer-wrapper">
        <div className="container">

          {/* Top bar */}
          <div className="footer-top-area">
            <div className="row g-4 align-items-center">
              <div className="col-md-3">
                <Link href="/" className="footer-logo">
                  <img width={160} height={50} src="/assets/new-images/logo/KavalakkatLogo-theme.png" alt="" />
                </Link>
              </div>
              <div className="col-md-5 d-flex justify-content-md-center">
                <p>Welcome to Kavalakat where innovation meet our passion in a journey that started dream.</p>
              </div>
              <div className="col-md-4 d-flex justify-content-md-end" />
            </div>
          </div>

          <div className="footer-menu-and-address-wrap">
            <div className="row align-items-start">

              {/* Address */}
              <div className="col-lg-3">
                <div className="footer-widget">
                  <div className="address-area">
                    <ul className="address-list">
                      {fullAddress && (
                        <li className="single-address">
                          {contactInfo?.city && <span>{contactInfo.city}</span>}
                          <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
                            {fullAddress}
                          </a>
                        </li>
                      )}
                    </ul>
                    <Link href="/contact" className="location-btn">View All Factory Location</Link>
                  </div>
                </div>
              </div>

              {/* Nav columns */}
              <div className="col-lg-9 mt-5">
                <div className="footer-menu">
                  <div className="row gy-5">

                    {/* About — always static */}
                    <div className="col-md-3 col-sm-6 d-flex justify-content-lg-center">
                      <div className="footer-widget">
                        <div className="widget-title"><h5>About</h5></div>
                        <ul className="footer-nav-list">
                          <NavLink href="/projects" label="Projects" />
                          <NavLink href="/gallery"  label="Gallery" />
                          <NavLink href="/blog"     label="Blog" />
                          <NavLink href="/contact"  label="Contact" />
                          <NavLink href="/career"   label="Career's" />
                        </ul>
                      </div>
                    </div>

                    {/* Trading — only renders when data exists (mirrors header) */}
                    {navItems.trading.length > 0 && (
                      <div className="col-md-3 col-sm-6 d-flex justify-content-lg-center">
                        <div className="footer-widget">
                          <div className="widget-title"><h5>Trading</h5></div>
                          <ul className="footer-nav-list">
                            {navItems.trading.map(n => (
                              <NavLink key={n.href} href={n.href} label={n.name} />
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Distribution — only renders when data exists */}
                    {navItems.distribution.length > 0 && (
                      <div className="col-md-3 col-sm-6 d-flex justify-content-lg-center">
                        <div className="footer-widget">
                          <div className="widget-title"><h5>Distribution</h5></div>
                          <ul className="footer-nav-list">
                            {navItems.distribution.map(n => (
                              <NavLink key={n.href} href={n.href} label={n.name} />
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Services — only renders when data exists */}
                    {navItems.services.length > 0 && (
                      <div className="col-md-3 col-sm-6 d-flex justify-content-lg-center">
                        <div className="footer-widget">
                          <div className="widget-title"><h5>Services</h5></div>
                          <ul className="footer-nav-list">
                            {navItems.services.map(n => (
                              <NavLink key={n.href} href={n.href} label={n.name} />
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-wrap">
        <div className="container">
          <div className="footer-bottom">
            <div className="copyright-area">
              <p>Copyright 2025 <Link href="/">Kavalakat</Link> | Design By <a href="https://mindstory.in/" style={{ color: 'orange' }}>Mindstory</a></p>
            </div>
            <ul className="social-area">
              {contactInfo?.linkedin  && <li><a href={contactInfo.linkedin}  target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin" />LinkedIn</a></li>}
              {contactInfo?.facebook  && <li><a href={contactInfo.facebook}  target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook" />Facebook</a></li>}
              {contactInfo?.instagram && <li><a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram" />Instagram</a></li>}
              {contactInfo?.youtube   && <li><a href={contactInfo.youtube}   target="_blank" rel="noopener noreferrer"><i className="bi bi-youtube" />YouTube</a></li>}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .footer-nav-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0}
        .footer-nav-list li{border-bottom:1px solid rgba(255,255,255,0.07)}
        .footer-nav-list li:first-child{border-top:1px solid rgba(255,255,255,0.07)}
        .footer-nav-link{display:flex;align-items:center;gap:10px;padding:9px 0;text-decoration:none;color:inherit;transition:gap .22s ease,color .22s ease}
        .footer-nav-link:hover{gap:14px;color:#0160b2}
        .footer-nav-arrow{display:inline-flex;align-items:center;flex-shrink:0;opacity:0;transform:translateX(-4px);transition:opacity .22s ease,transform .22s ease}
        .footer-nav-link:hover .footer-nav-arrow{opacity:1;transform:translateX(0)}
        .footer-nav-arrow svg path{fill:currentColor}
        .footer-nav-text{font-size:.875rem;font-weight:500;line-height:1.4;transition:transform .22s ease}
        .footer-nav-link:hover .footer-nav-text{transform:translateX(2px)}
      `}</style>
    </footer>
  )
}

export default Footer