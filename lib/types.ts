export type Availability = 'en_stock' | 'sur_commande' | 'rupture'

export interface Settings {
  logo?: string | null
  whatsapp_number?: string
  contact_email?: string
  contact_phone?: string
  address?: string
  facebook_url?: string
  instagram_url?: string
  linkedin_url?: string
}

export interface Subcategory {
  id: number
  name: string
  slug: string
  order?: number
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string | null
  image?: string | null
  order?: number
  subcategories?: Subcategory[]
  products_count?: number
}

export interface Brand {
  id: number
  name: string
  slug: string
  logo?: string | null
  products_count?: number
}

export interface ProductImage {
  path: string
  alt_text?: string | null
  is_primary?: boolean
  order?: number
}

export interface ProductCharacteristic {
  groupe: string
  caracteristique: string
  valeur: string
  unite?: string | null
}

export interface ProductDocument {
  type: string
  name: string
  path: string
}

export interface ProductListItem {
  id: number
  reference: string
  name: string
  slug: string
  brand?: Pick<Brand, 'id' | 'name' | 'slug'> | null
  category?: Pick<Category, 'id' | 'name' | 'slug'> | null
  subcategory?: Pick<Subcategory, 'id' | 'name' | 'slug'> | null
  price_fcfa?: string | null
  availability: Availability
  is_featured?: boolean
  primary_image?: ProductImage | null
}

export interface ProductDetail extends ProductListItem {
  description?: string | null
  views_count?: number
  images?: ProductImage[]
  characteristics?: ProductCharacteristic[]
  documents?: ProductDocument[]
}

export interface ProductDetailResponse {
  product: ProductDetail
  grouped_characteristics?: Record<string, ProductCharacteristic[]>
  similar_products?: ProductListItem[]
}

export interface PaginationMeta {
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface Paginated<T> {
  data: T[]
  links?: { first?: string; last?: string; prev?: string | null; next?: string | null }
  meta: PaginationMeta
}

export interface Service {
  id: number
  title: string
  slug: string
  icon?: string | null
  short_description?: string | null
  description?: string | null
  order?: number
}

export interface Realisation {
  id: number
  title: string
  slug: string
  sector?: string
  location?: string
  short_description?: string | null
  description?: string | null
  cover_image?: string | null
  images?: { path: string; alt_text?: string | null }[]
}

export type RequestStatus = 'nouveau' | 'en_cours' | 'traite'
export type ContactStatus = 'nouveau' | 'lu' | 'traite'

export interface AdminUser {
  id: number
  name: string
  email: string
}

export interface QuoteRequestItem {
  id: number
  product_id: number | null
  product_reference: string
  product_name: string
  quantity: number
}

export interface QuoteRequest {
  id: number
  first_name: string
  last_name: string
  company?: string | null
  phone: string
  email: string
  city?: string | null
  comment?: string | null
  status: RequestStatus
  admin_reply?: string | null
  replied_at?: string | null
  created_at: string
  items?: QuoteRequestItem[]
}

export interface ProjectStudyDocument {
  id: number
  original_name: string
  path: string
}

export interface ProjectStudyRequest {
  id: number
  name: string
  company?: string | null
  phone: string
  email: string
  city?: string | null
  establishment_type?: string | null
  description: string
  estimated_budget?: string | null
  desired_deadline?: string | null
  status: RequestStatus
  admin_reply?: string | null
  replied_at?: string | null
  created_at: string
  documents?: ProjectStudyDocument[]
}

export interface ContactMessage {
  id: number
  name: string
  email: string
  phone?: string | null
  subject?: string | null
  message: string
  status: ContactStatus
  created_at: string
}