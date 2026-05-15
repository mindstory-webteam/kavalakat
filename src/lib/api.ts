// lib/api.ts
// Kavalakat — Centralized API Utility (TypeScript)
// Replace lib/api.js with this file entirely.

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://kavalakat-api.onrender.com/api";

// ─────────────────────────────────────────────────────────────────────────────
// TypeScript Interfaces
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  is_active: boolean;
}

export interface About {
  id: number;
  title: string;
  description: string;
  vision: string;
  mission: string;
  founded_year: number;
  employee_count: number;
  updated_at: string;
}

export interface Strength {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  image_url: string;
  order: number;
  is_active: boolean;
}

export interface Milestone {
  id: number;
  year: number;
  title: string;
  description: string;
  image: string;
  image_url: string;
  tags: string;
  tags_list: string[];
  order: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  client: string;
  client_logo: string;
  client_logo_url: string;
  client_location: string;
  location: string;
  year: number;
  tag: string;
  image: string;
  image_url: string;
  contact_url: string;
  is_featured: boolean;
  created_at: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  image_url: string;
  social_platform: string;
  social_url: string;
  order: number;
  is_active: boolean;
}

export interface GalleryItem {
  id: number;
  title: string;
  image: string;
  image_url: string;
  caption: string;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface Contact {
  id: number;
  phone: string;
  alt_phone: string;
  email: string;
  alt_email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  map_embed_url: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  business_hours: string;
  updated_at: string;
}

export interface SiteLocation {
  id: number;
  city: string;
  address: string;
  map_url: string;
  order: number;
  is_active: boolean;
}

export interface Career {
  id: number;
  title: string;
  department: string;
  description: string;
  requirements: string;
  location: string;
  job_type: string;
  experience: string;
  salary_range: string;
  apply_url: string;
  is_active: boolean;
  deadline: string;
  is_expired: boolean;
  created_at: string;
  updated_at: string;
}

export interface EnquiryPayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  enquiry_type?: string;
}

// ── Portfolio ──────────────────────────────────────────────────────────────

export interface PortfolioFeature {
  id: string;
  title: string;
  content: string;
}

export interface PortfolioBrand {
  logo?: string;
  logoAlt?: string;
  companyName: string;
  description: string;
  icon?: string;
}

export interface PortfolioTestimonial {
  quote: string;
  text: string;
  author: string;
  role: string;
  img: string;
}

export interface PortfolioItem {
  id: number;
  name: string;
  description: string;
  image: string;
  image_url: string;
  tags: string[];
  category: number;
  category_name: string;
  category_slug: string;
  is_featured: boolean;
  is_active: boolean;
  order: number;
  // Section 1 — Hero Banner
  hero_title: string;
  banner_image: string;
  banner_image_url: string;
  // Section 2 — About
  about_title: string;
  about_description: string;
  about_image: string;
  about_image_url: string;
  // Section 3 — Features
  features_title: string;
  features_image: string;
  features_image_url: string;
  features_json: string;
  features: PortfolioFeature[];
  // Section 4 — Brands
  brands_heading: string;
  brands_json: string;
  brands: PortfolioBrand[];
  // Section 5 — Testimonials
  testimonials_json: string;
  testimonials: PortfolioTestimonial[];
}

export interface PortfolioCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  order: number;
  is_active: boolean;
}

export interface PortfolioPageData {
  trading: PortfolioItem[];
  distribution: PortfolioItem[];
  services: PortfolioItem[];
}

// ── Blog ──────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  image_url: string;
  category_name: string;
  author_name: string;
  status: string;
  tags: string[];
  is_featured: boolean;
  views: number;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  published_at: string;
  updated_at?: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  post_count?: number;
}

export interface AIBlogPayload {
  topic?: string;
  prompt?: string;
  [key: string]: unknown;
}

export interface AILog {
  id: number;
  prompt: string;
  result: string;
  created_at: string;
}

export interface AllPublicData {
  pages: Page[] | null;
  about: About | null;
  strengths: Strength[] | null;
  milestones: Milestone[] | null;
  projects: Project[] | null;
  team: TeamMember[] | null;
  gallery: GalleryItem[] | null;
  contact: Contact | null;
  locations: SiteLocation[] | null;
  careers: Career[] | null;
  portfolio: PortfolioPageData | null;
  portfolioCategories: PortfolioCategory[] | null;
  portfolioItems: PortfolioItem[] | null;
  blogPosts: BlogPost[] | null;
  blogCategories: BlogCategory[] | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Core Fetcher
// ─────────────────────────────────────────────────────────────────────────────

async function apiFetch<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
  token: string | null = null
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `API error [${response.status}] on ${endpoint}: ${errorBody}`
    );
  }

  if (response.status === 204) return null as T;
  return response.json() as Promise<T>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Safely parse a JSON string into a typed array.
 * Accepts an already-parsed array too (API may return either).
 */
export function safeParseJSON<T>(
  raw: string | T[] | null | undefined,
  fallback: T[] = []
): T[] {
  if (Array.isArray(raw)) return raw;
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw as string);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Resolve an image URL — prepends base origin for relative paths.
 */
export function getImageUrl(
  url: string | undefined,
  fallback: string
): string {
  if (!url || url.trim() === "") return fallback;
  if (url.startsWith("http")) return url;
  return `${BASE_URL.replace("/api", "")}${url}`;
}

/**
 * Convert a display name to a URL-safe slug.
 * "JSW Steel" → "jsw-steel"
 */
export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─────────────────────────────────────────────────────────────────────────────
// Category Classification
//
// The admin may save items under any slug variation. This maps ALL known
// slug/name combos to one of three buckets: trading | distribution | services
// ─────────────────────────────────────────────────────────────────────────────

const TRADING_SLUGS = new Set([
  "trading", "product", "products", "trade",
]);

const DISTRIBUTION_SLUGS = new Set([
  "distribution", "distributions", "distribute",
]);

const SERVICES_SLUGS = new Set([
  "services", "service", "hospitality",
]);

// Name-level overrides — if category_slug is wrong in the DB,
// we can still classify by the item name itself.
const TRADING_NAMES = new Set([
  "cement", "steel", "steels", "roofing solutions", "roofing",
  "white cement & paint", "white cement paint", "construction chemicals",
  "abrasives construction chemicals", "hardware & tools", "hardware tools",
  "sheet & pipe", "sheet pipe",
]);

const DISTRIBUTION_NAMES = new Set([
  "ultratech", "jk cement", "tata steel", "jsw steel",
  "asian paints", "berger paints",
]);

const SERVICES_NAMES = new Set([
  "kavalakat group", "alite enclaves", "neyy vedyam", "neey vedhyam",
]);

export type PortfolioSection = "trading" | "distribution" | "services" | "unknown";

/**
 * Classify a portfolio item into trading / distribution / services.
 * Checks category_slug first, then category_name, then item name.
 */
export function classifyPortfolioItem(item: PortfolioItem): PortfolioSection {
  const slug = (item.category_slug || "").toLowerCase().trim();
  const catName = (item.category_name || "").toLowerCase().trim();
  const name = (item.name || "").toLowerCase().trim();

  if (TRADING_SLUGS.has(slug) || TRADING_SLUGS.has(catName)) return "trading";
  if (DISTRIBUTION_SLUGS.has(slug) || DISTRIBUTION_SLUGS.has(catName)) return "distribution";
  if (SERVICES_SLUGS.has(slug) || SERVICES_SLUGS.has(catName)) return "services";

  // Fall back to name matching
  if (TRADING_NAMES.has(name)) return "trading";
  if (DISTRIBUTION_NAMES.has(name)) return "distribution";
  if (SERVICES_NAMES.has(name)) return "services";

  return "unknown";
}

/**
 * Build the correct internal href for a portfolio item.
 */
export function buildPortfolioHref(item: PortfolioItem): string {
  const slug = nameToSlug(item.name);
  const section = classifyPortfolioItem(item);
  if (section === "trading") return `/product/${slug}`;
  if (section === "distribution") return `/distribution/${slug}`;
  if (section === "services") return `/services/${slug}`;
  return `/portfolio/${slug}`;
}

/**
 * Parse JSON fields (features / brands / testimonials) on a raw API item.
 */
export function normalisePortfolioItem(item: PortfolioItem): PortfolioItem {
  return {
    ...item,
    features: safeParseJSON<PortfolioFeature>(
      item.features ?? item.features_json
    ),
    brands: safeParseJSON<PortfolioBrand>(item.brands ?? item.brands_json),
    testimonials: safeParseJSON<PortfolioTestimonial>(
      item.testimonials ?? item.testimonials_json
    ),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth
// ─────────────────────────────────────────────────────────────────────────────

export async function getAuthToken(
  username: string,
  password: string
): Promise<AuthTokens> {
  return apiFetch<AuthTokens>("/auth/token/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function refreshAuthToken(
  refreshToken: string
): Promise<{ access: string }> {
  return apiFetch<{ access: string }>("/auth/token/refresh/", {
    method: "POST",
    body: JSON.stringify({ refresh: refreshToken }),
  });
}

export async function verifyAuthToken(token: string): Promise<unknown> {
  return apiFetch("/auth/token/verify/", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Pages / About / Strengths / Milestones / Projects / Team / Gallery
// ─────────────────────────────────────────────────────────────────────────────

export async function getPages(): Promise<Page[]> {
  return apiFetch<Page[]>("/pages/");
}

export async function getAbout(): Promise<About> {
  return apiFetch<About>("/about/");
}

export async function getStrengths(): Promise<Strength[]> {
  return apiFetch<Strength[]>("/strengths/");
}

export async function getMilestones(): Promise<Milestone[]> {
  return apiFetch<Milestone[]>("/milestones/");
}

export async function getProjects(): Promise<Project[]> {
  return apiFetch<Project[]>("/projects/");
}

export async function getProjectById(id: number): Promise<Project> {
  return apiFetch<Project>(`/projects/${id}/`);
}

export async function getTeam(): Promise<TeamMember[]> {
  return apiFetch<TeamMember[]>("/team/");
}

export async function getGallery(): Promise<GalleryItem[]> {
  return apiFetch<GalleryItem[]>("/gallery/");
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact / Locations
// ─────────────────────────────────────────────────────────────────────────────

export async function getContact(): Promise<Contact> {
  return apiFetch<Contact>("/contact/");
}

export async function getLocations(): Promise<SiteLocation[]> {
  return apiFetch<SiteLocation[]>("/locations/");
}

// ─────────────────────────────────────────────────────────────────────────────
// Careers
// ─────────────────────────────────────────────────────────────────────────────

export async function getCareers(): Promise<Career[]> {
  return apiFetch<Career[]>("/careers/");
}

export async function getCareerById(id: number): Promise<Career> {
  return apiFetch<Career>(`/careers/${id}/`);
}

// ─────────────────────────────────────────────────────────────────────────────
// Enquiry
// ─────────────────────────────────────────────────────────────────────────────

export async function submitEnquiry(data: EnquiryPayload): Promise<unknown> {
  return apiFetch("/enquiry/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Portfolio — raw fetchers
// ─────────────────────────────────────────────────────────────────────────────

export async function getPortfolioPage(): Promise<PortfolioPageData> {
  return apiFetch<PortfolioPageData>("/portfolio/page/");
}

export async function getPortfolioCategories(): Promise<PortfolioCategory[]> {
  return apiFetch<PortfolioCategory[]>("/portfolio/categories/");
}

/**
 * Fetch all portfolio items from /portfolio/items/ or /portfolio/.
 * Normalises JSON fields automatically.
 */
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  // Try /portfolio/items/ first, fall back to /portfolio/
  let raw: PortfolioItem[] | { results: PortfolioItem[] };
  try {
    raw = await apiFetch<PortfolioItem[] | { results: PortfolioItem[] }>(
      "/portfolio/items/"
    );
  } catch {
    raw = await apiFetch<PortfolioItem[] | { results: PortfolioItem[] }>(
      "/portfolio/"
    );
  }
  const items = Array.isArray(raw) ? raw : (raw.results ?? []);
  return items.map(normalisePortfolioItem);
}

export async function getPortfolioItemById(id: number): Promise<PortfolioItem> {
  const item = await apiFetch<PortfolioItem>(`/portfolio/items/${id}/`);
  return normalisePortfolioItem(item);
}

/**
 * Find a portfolio item by display name, optionally filtering by section.
 * Uses classifyPortfolioItem so it works even if category_slug is wrong in DB.
 */
export async function getPortfolioItemByName(
  name: string,
  sections?: PortfolioSection[]
): Promise<PortfolioItem | null> {
  const items = await getPortfolioItems();
  const target = name.toLowerCase().trim();

  const match = items.find((item) => {
    const nameMatch = item.name.toLowerCase().trim() === target;
    if (!nameMatch) return false;
    if (!sections || sections.length === 0) return true;
    return sections.includes(classifyPortfolioItem(item));
  });

  return match ?? null;
}

/**
 * Master split function.
 * 1. Tries /portfolio/page/ (dedicated endpoint, fastest)
 * 2. Falls back to /portfolio/items/ and splits by classifyPortfolioItem()
 *    — this handles ANY category slug the admin sets.
 */
export async function getPortfolioSplit(): Promise<PortfolioPageData> {
  // ── Attempt 1: dedicated page endpoint ──────────────────────────────────
  try {
    const page = await getPortfolioPage();
    if (page && (page.trading?.length || page.distribution?.length || page.services?.length)) {
      return {
        trading:      (page.trading      ?? []).map(normalisePortfolioItem),
        distribution: (page.distribution ?? []).map(normalisePortfolioItem),
        services:     (page.services     ?? []).map(normalisePortfolioItem),
      };
    }
  } catch {
    // fall through
  }

  // ── Attempt 2: flat items list with smart classification ─────────────────
  const items = await getPortfolioItems();
  const active = items
    .filter((i) => i.is_active)
    .sort((a, b) => a.order - b.order);

  const trading:      PortfolioItem[] = [];
  const distribution: PortfolioItem[] = [];
  const services:     PortfolioItem[] = [];

  for (const item of active) {
    const section = classifyPortfolioItem(item);
    if (section === "trading")      trading.push(item);
    else if (section === "distribution") distribution.push(item);
    else if (section === "services")     services.push(item);
    // "unknown" items are silently skipped
  }

  return { trading, distribution, services };
}

// ─────────────────────────────────────────────────────────────────────────────
// Blog
// ─────────────────────────────────────────────────────────────────────────────

export async function getBlogPosts(
  params: Record<string, string> = {}
): Promise<BlogPost[]> {
  const query = new URLSearchParams(params).toString();
  return apiFetch<BlogPost[]>(`/blog/${query ? `?${query}` : ""}`);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  return apiFetch<BlogPost>(`/blog/${slug}/`);
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  return apiFetch<BlogCategory[]>("/blog/categories/");
}

// ─────────────────────────────────────────────────────────────────────────────
// AI  (protected)
// ─────────────────────────────────────────────────────────────────────────────

export async function generateAIBlog(
  payload: AIBlogPayload,
  token: string
): Promise<unknown> {
  return apiFetch(
    "/ai/generate-blog/",
    { method: "POST", body: JSON.stringify(payload) },
    token
  );
}

export async function getAILogs(token: string): Promise<AILog[]> {
  return apiFetch<AILog[]>("/ai/logs/", {}, token);
}

// ─────────────────────────────────────────────────────────────────────────────
// fetchAllPublicData — runs every public endpoint in parallel
// ─────────────────────────────────────────────────────────────────────────────

export async function fetchAllPublicData(): Promise<AllPublicData> {
  const [
    pages, about, strengths, milestones, projects, team, gallery,
    contact, locations, careers, portfolio, portfolioCategories,
    portfolioItems, blogPosts, blogCategories,
  ] = await Promise.allSettled([
    getPages(), getAbout(), getStrengths(), getMilestones(), getProjects(),
    getTeam(), getGallery(), getContact(), getLocations(), getCareers(),
    getPortfolioPage(), getPortfolioCategories(), getPortfolioItems(),
    getBlogPosts(), getBlogCategories(),
  ]);

  function unwrap<T>(s: PromiseSettledResult<T>): T | null {
    return s.status === "fulfilled" ? s.value : null;
  }

  return {
    pages:               unwrap(pages),
    about:               unwrap(about),
    strengths:           unwrap(strengths),
    milestones:          unwrap(milestones),
    projects:            unwrap(projects),
    team:                unwrap(team),
    gallery:             unwrap(gallery),
    contact:             unwrap(contact),
    locations:           unwrap(locations),
    careers:             unwrap(careers),
    portfolio:           unwrap(portfolio),
    portfolioCategories: unwrap(portfolioCategories),
    portfolioItems:      unwrap(portfolioItems),
    blogPosts:           unwrap(blogPosts),
    blogCategories:      unwrap(blogCategories),
  };
}