import { API_URL, ApiError, ensureCsrfCookie, getCookie } from './api'
import type {
  Paginated,
  QuoteRequest,
  ProjectStudyRequest,
  ContactMessage,
  Category,
  Subcategory,
  Brand,
  Service,  
  Realisation,
  ProductListItem,
  ProductDetail,
} from './types'

async function adminRequest<T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  body?: unknown,
): Promise<T> {
  if (method !== 'GET') await ensureCsrfCookie()

  const isFormData = body instanceof FormData

  const res = await fetch(`${API_URL}${path}`, {
    method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(isFormData || body === undefined ? {} : { 'Content-Type': 'application/json' }),
      ...(method !== 'GET' ? { 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') ?? '' } : {}),
    },
    body: body === undefined ? undefined : isFormData ? body : JSON.stringify(body),
  })

  if (res.status === 204) return undefined as T

  if (!res.ok) {
    const payload = await res.json().catch(() => null)
    throw new ApiError(res.status, payload)
  }

  return (await res.json()) as T
}

// --- Devis ---
export function getAdminQuoteRequests(page = 1) {
  return adminRequest<Paginated<QuoteRequest>>(`/admin/quote-requests?page=${page}`)
}
export function getAdminQuoteRequest(id: number) {
  return adminRequest<QuoteRequest>(`/admin/quote-requests/${id}`)
}
export function updateAdminQuoteRequest(id: number, data: { status?: string; admin_reply?: string }) {
  return adminRequest<QuoteRequest>(`/admin/quote-requests/${id}`, 'PATCH', data)
}
export function deleteAdminQuoteRequest(id: number) {
  return adminRequest<void>(`/admin/quote-requests/${id}`, 'DELETE')
}

// --- Étude de projet ---
export function getAdminProjectStudyRequests(page = 1) {
  return adminRequest<Paginated<ProjectStudyRequest>>(`/admin/project-study-requests?page=${page}`)
}
export function getAdminProjectStudyRequest(id: number) {
  return adminRequest<ProjectStudyRequest>(`/admin/project-study-requests/${id}`)
}
export function updateAdminProjectStudyRequest(id: number, data: { status?: string; admin_reply?: string }) {
  return adminRequest<ProjectStudyRequest>(`/admin/project-study-requests/${id}`, 'PATCH', data)
}
export function deleteAdminProjectStudyRequest(id: number) {
  return adminRequest<void>(`/admin/project-study-requests/${id}`, 'DELETE')
}

// --- Messages de contact ---
export function getAdminContactMessages(page = 1) {
  return adminRequest<Paginated<ContactMessage>>(`/admin/contact-messages?page=${page}`)
}
export function getAdminContactMessage(id: number) {
  return adminRequest<ContactMessage>(`/admin/contact-messages/${id}`)
}
export function updateAdminContactMessage(id: number, status: string) {
  return adminRequest<ContactMessage>(`/admin/contact-messages/${id}`, 'PATCH', { status })
}
export function deleteAdminContactMessage(id: number) {
  return adminRequest<void>(`/admin/contact-messages/${id}`, 'DELETE')
}

// --- Catégories / Marques / Services / Réalisations (CRUD admin) ---
// Le listing (GET) utilise les endpoints PUBLICS (déjà dans lib/api.ts : getCategories, getBrands, getServices, getRealisations)
// puisque le backend exclut index/show des routes admin. Ici : uniquement create/update/delete.

export function createAdminCategory(data: Record<string, unknown>) {
  return adminRequest<Category>('/admin/categories', 'POST', data)
}
export function updateAdminCategory(id: number, data: Record<string, unknown>) {
  return adminRequest<Category>(`/admin/categories/${id}`, 'PUT', data)
}
export function deleteAdminCategory(id: number) {
  return adminRequest<void>(`/admin/categories/${id}`, 'DELETE')
}

export function createAdminBrand(data: Record<string, unknown>) {
  return adminRequest<Brand>('/admin/brands', 'POST', data)
}
export function updateAdminBrand(id: number, data: Record<string, unknown>) {
  return adminRequest<Brand>(`/admin/brands/${id}`, 'PUT', data)
}
export function deleteAdminBrand(id: number) {
  return adminRequest<void>(`/admin/brands/${id}`, 'DELETE')
}

export function createAdminService(data: Record<string, unknown>) {
  return adminRequest<Service>('/admin/services', 'POST', data)
}
export function updateAdminService(id: number, data: Record<string, unknown>) {
  return adminRequest<Service>(`/admin/services/${id}`, 'PUT', data)
}
export function deleteAdminService(id: number) {
  return adminRequest<void>(`/admin/services/${id}`, 'DELETE')
}

export function createAdminRealisation(data: Record<string, unknown>) {
  return adminRequest<Realisation>('/admin/realisations', 'POST', data)
}
export function updateAdminRealisation(id: number, data: Record<string, unknown>) {
  return adminRequest<Realisation>(`/admin/realisations/${id}`, 'PUT', data)
}
export function deleteAdminRealisation(id: number) {
  return adminRequest<void>(`/admin/realisations/${id}`, 'DELETE')
}

// --- Produits (admin) ---
export function getAdminProducts(page = 1, q?: string) {
  const query = q ? `?page=${page}&q=${encodeURIComponent(q)}` : `?page=${page}`
  return adminRequest<Paginated<ProductListItem>>(`/products${query}`)
}
export function createAdminProduct(data: Record<string, unknown>) {
  return adminRequest<ProductDetail>('/admin/products', 'POST', data)
}
export function updateAdminProduct(id: number, data: Record<string, unknown>) {
  return adminRequest<ProductDetail>(`/admin/products/${id}`, 'PUT', data)
}
export function deleteAdminProduct(id: number) {
  return adminRequest<void>(`/admin/products/${id}`, 'DELETE')
}

// --- Paramètres ---
export function updateAdminSettings(settings: Record<string, string>) {
  return adminRequest<{ message: string }>('/admin/settings', 'PUT', { settings })
}

// --- Import catalogue ---
export interface CatalogImportReport {
  produits_crees: number
  produits_mis_a_jour: number
  categories_creees: number
  sous_categories_creees: number
  marques_creees: number
  caracteristiques_importees: number
  images_importees: number
  images_manquantes: string[]
  erreurs: string[]
}

export async function importCatalog(catalogFile: File, imagesZip?: File | null) {
  const formData = new FormData()
  formData.append('catalog_file', catalogFile)
  if (imagesZip) formData.append('images_zip', imagesZip)

  return adminRequest<{ message: string; report: CatalogImportReport }>(
    '/admin/catalog-import',
    'POST',
    formData,
  )
}

// --- Sous-catégories (admin) ---
export function createAdminSubcategory(data: Record<string, unknown>) {
  return adminRequest<Subcategory>('/admin/subcategories', 'POST', data)
}
export function updateAdminSubcategory(id: number, data: Record<string, unknown>) {
  return adminRequest<Subcategory>(`/admin/subcategories/${id}`, 'PUT', data)
}
export function deleteAdminSubcategory(id: number) {
  return adminRequest<void>(`/admin/subcategories/${id}`, 'DELETE')
}