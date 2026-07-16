import type {
  Brand,
  Category,
  Paginated,
  ProductDetailResponse,
  ProductListItem,
  Realisation,
  Service,
  Settings,
} from './types'
import {
  DEMO_BRANDS,
  DEMO_PRODUCTS,
  DEMO_REALISATIONS,
  DEMO_SERVICES,
} from './demo-data'
import { CATEGORY_TAXONOMY } from './site'

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''
export const API_ROOT = API_URL.replace(/\/api\/?$/, '')

/**
 * Build a public storage URL for an image `path` returned by the API.
 * The API returns relative paths (e.g. "products/AR612FX/photo.jpg").
 */
export function storageUrl(path?: string | null): string | null {
  if (!path) return null
  if (/^https?:\/\//.test(path)) return path
  // Local public assets (e.g. demo data "/images/...") are served as-is.
  if (path.startsWith('/')) return path
  if (!API_ROOT) return `/${path.replace(/^\/+/, '')}`
  return `${API_ROOT}/storage/${path.replace(/^\/+/, '')}`
}

type FetchOptions = {
  revalidate?: number
  tags?: string[]
}

async function apiGet<T>(path: string, options: FetchOptions = {}): Promise<T | null> {
  if (!API_URL) return null
  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { Accept: 'application/json' },
      credentials: 'include',
      next: { revalidate: options.revalidate ?? 300, tags: options.tags },
    })
    if (!res.ok) return null
    return (await res.json()) as T
  } catch {
    return null
  }
}

export async function getSettings(): Promise<Settings | null> {
  return apiGet<Settings>('/settings', { revalidate: 3600, tags: ['settings'] })
}

export async function getCategories(): Promise<Category[]> {
  const data = await apiGet<Category[]>('/categories', { tags: ['categories'] })
  return data && data.length > 0 ? data : CATEGORY_TAXONOMY
}

export async function getCategory(slug: string): Promise<Category | null> {
  return apiGet<Category>(`/categories/${slug}`, { tags: ['categories'] })
}

export async function getBrands(): Promise<Brand[]> {
  const data = await apiGet<Brand[]>('/brands', { tags: ['brands'] })
  return data && data.length > 0 ? data : DEMO_BRANDS
}

export interface ProductQuery {
  q?: string
  category_id?: string | number
  subcategory_id?: string | number
  brand_id?: string | number
  availability?: string
  sort?: string
  per_page?: number
  page?: number
  is_featured?: boolean
}

function buildQuery(params: ProductQuery): string {
  const search = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value))
    }
  })
  const str = search.toString()
  return str ? `?${str}` : ''
}

export async function getProducts(params: ProductQuery = {}): Promise<Paginated<ProductListItem> | null> {
  const live = await apiGet<Paginated<ProductListItem>>(`/products${buildQuery(params)}`, {
    revalidate: 120,
  })
  if (live) return live
  return demoProducts(params)
}

export async function getProduct(slug: string): Promise<ProductDetailResponse | null> {
  const live = await apiGet<ProductDetailResponse>(`/products/${slug}`, { revalidate: 120 })
  if (live) return live
  const product = DEMO_PRODUCTS.find((p) => p.slug === slug)
  if (!product) return null
  const similar = DEMO_PRODUCTS.filter(
    (p) => p.category?.id === product.category?.id && p.id !== product.id,
  ).slice(0, 4)
  const grouped: Record<string, NonNullable<typeof product.characteristics>> = {}
  for (const c of product.characteristics ?? []) {
    ;(grouped[c.groupe] ??= []).push(c)
  }
  return { product, grouped_characteristics: grouped, similar_products: similar }
}

/** In-memory filtering/sorting/pagination of demo products (no backend mode). */
function demoProducts(params: ProductQuery): Paginated<ProductListItem> {
  let items = [...DEMO_PRODUCTS]
  if (params.is_featured) items = items.filter((p) => p.is_featured)
  if (params.q) {
    const q = params.q.toLowerCase()
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.reference.toLowerCase().includes(q) ||
        (p.brand?.name.toLowerCase().includes(q) ?? false),
    )
  }
  if (params.category_id) items = items.filter((p) => String(p.category?.id) === String(params.category_id))
  if (params.subcategory_id)
    items = items.filter((p) => String(p.subcategory?.id) === String(params.subcategory_id))
  if (params.brand_id) items = items.filter((p) => String(p.brand?.id) === String(params.brand_id))
  if (params.availability) items = items.filter((p) => p.availability === params.availability)

  switch (params.sort) {
    case 'name_asc':
      items.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'name_desc':
      items.sort((a, b) => b.name.localeCompare(a.name))
      break
    case 'newest':
      items.sort((a, b) => b.id - a.id)
      break
    default:
      break
  }

  const perPage = params.per_page ?? 12
  const total = items.length
  const lastPage = Math.max(1, Math.ceil(total / perPage))
  const page = Math.min(Math.max(1, params.page ?? 1), lastPage)
  const data = items.slice((page - 1) * perPage, page * perPage)
  return {
    data,
    meta: { current_page: page, last_page: lastPage, per_page: perPage, total },
  }
}

export async function getServices(): Promise<Service[]> {
  const data = await apiGet<Service[]>('/services', { tags: ['services'] })
  return data && data.length > 0 ? data : DEMO_SERVICES
}

export async function getService(slug: string): Promise<Service | null> {
  return apiGet<Service>(`/services/${slug}`, { tags: ['services'] })
}

export async function getRealisations(sector?: string): Promise<Realisation[]> {
  const query = sector && sector !== 'all' ? `?sector=${sector}` : ''
  const data = await apiGet<Realisation[] | { data: Realisation[] }>(`/realisations${query}`, {
    tags: ['realisations'],
  })
  const list = data ? (Array.isArray(data) ? data : (data.data ?? [])) : []
  const source = list.length > 0 ? list : DEMO_REALISATIONS
  if (sector && sector !== 'all') return source.filter((r) => r.sector === sector)
  return source
}

// ---------------------------------------------------------------------------
// CSRF (Sanctum SPA) — nécessaire avant TOUTE requête POST/PUT/DELETE,
// même vers des routes publiques (contact, devis, étude de projet), car
// `statefulApi()` fait passer toutes les requêtes par la protection CSRF
// de Laravel, indépendamment de l'authentification.
// ---------------------------------------------------------------------------

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[2]) : null
}

export async function ensureCsrfCookie(): Promise<void> {
  await fetch(`${API_ROOT}/sanctum/csrf-cookie`, { credentials: 'include' })
}

// ---------------------------------------------------------------------------
// Mutations (POST) — formulaires publics
// ---------------------------------------------------------------------------

export class ApiError extends Error {
  status: number
  errors?: Record<string, string[]>

  constructor(status: number, payload: any) {
    super(payload?.message ?? 'Une erreur est survenue.')
    this.status = status
    this.errors = payload?.errors
  }
}

async function apiPost<T>(path: string, body: unknown): Promise<T> {
  // Récupère (ou rafraîchit) le cookie CSRF avant chaque envoi.
  await ensureCsrfCookie()

  const isFormData = body instanceof FormData

  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') ?? '',
    },
    body: isFormData ? body : JSON.stringify(body),
  })

  if (!res.ok) {
    const payload = await res.json().catch(() => null)
    throw new ApiError(res.status, payload)
  }

  return (await res.json()) as T
}

export interface QuoteRequestPayload {
  first_name: string
  last_name: string
  company?: string
  phone: string
  email: string
  city?: string
  comment?: string
  items: { product_id: number; quantity?: number }[]
}

export async function submitQuoteRequest(payload: QuoteRequestPayload) {
  return apiPost('/quote-requests', payload)
}

export interface ProjectStudyRequestPayload {
  name: string
  company?: string
  phone: string
  email: string
  city?: string
  establishment_type?: string
  description: string
  estimated_budget?: string
  desired_deadline?: string
  documents?: File[]
}

export async function submitProjectStudyRequest(payload: ProjectStudyRequestPayload) {
  const formData = new FormData()
  Object.entries(payload).forEach(([key, value]) => {
    if (key === 'documents' || value === undefined || value === null) return
    formData.append(key, String(value))
  })
  payload.documents?.forEach((file) => formData.append('documents[]', file))

  return apiPost('/project-study-requests', formData)
}

export interface ContactMessagePayload {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export async function submitContactMessage(payload: ContactMessagePayload) {
  return apiPost('/contact-messages', payload)
}

// Normalise la pagination : gère à la fois {data, meta:{...}} et le format
// par défaut de Laravel où les champs sont directement à la racine.
export function paginationMeta(p: any): { current_page: number; last_page: number; per_page: number; total: number } {
  if (p?.meta) return p.meta
  return {
    current_page: p?.current_page ?? 1,
    last_page: p?.last_page ?? 1,
    per_page: p?.per_page ?? (p?.data?.length ?? 0),
    total: p?.total ?? (p?.data?.length ?? 0),
  }
}