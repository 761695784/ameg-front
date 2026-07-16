import type { MetadataRoute } from 'next'
import { getCategories, getProducts, getServices, getRealisations } from '@/lib/api'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ameginternational.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/a-propos`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/catalogue`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/services`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/realisations`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/devis`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/etude-de-projet`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const [categories, productsPage, services, realisations] = await Promise.all([
    getCategories(),
    getProducts({ per_page: 300 }),
    getServices(),
    getRealisations(),
  ])

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/catalogue?category_id=${c.id}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const productPages: MetadataRoute.Sitemap = (productsPage?.data ?? []).map((p) => ({
    url: `${BASE_URL}/catalogue/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  const realisationPages: MetadataRoute.Sitemap = realisations.map((r) => ({
    url: `${BASE_URL}/realisations/${r.slug}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticPages, ...categoryPages, ...productPages, ...servicePages, ...realisationPages]
}