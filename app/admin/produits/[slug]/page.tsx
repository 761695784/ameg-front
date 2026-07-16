'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, FileText } from 'lucide-react'
import { getProduct, getCategories, getBrands, storageUrl, API_ROOT } from '@/lib/api'
import type { Category, Brand, ProductDetail } from '@/lib/types'
import { ProductForm } from '@/components/admin/product-form'

export default function EditProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    getProduct(slug).then((res) => setProduct(res?.product ?? null))
    getCategories().then(setCategories)
    getBrands().then(setBrands)
  }, [slug])

  if (!product) return <p className="text-muted-foreground">Chargement...</p>

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/produits" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy">
        <ArrowLeft className="size-4" /> Retour aux produits
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold text-navy">{product.name}</h1>

      <div className="mt-6">
        <ProductForm product={product} categories={categories} brands={brands} />
      </div>

      {/* Aperçu en lecture seule : pas encore d'endpoints admin dédiés pour gérer
          images/caractéristiques/documents individuellement (voir note plus haut). */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-heading font-bold text-navy">Photos ({product.images?.length ?? 0})</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Gérées via l'import catalogue pour l'instant.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {product.images?.map((img, i) => {
              const src = storageUrl(img.path)
              return src ? (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                  <Image src={src} alt={img.alt_text ?? product.name} fill className="object-cover" />
                  {img.is_primary && (
                    <span className="absolute left-1 top-1 rounded bg-orange px-1.5 py-0.5 text-[10px] font-bold text-white">Principale</span>
                  )}
                </div>
              ) : null
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-heading font-bold text-navy">Caractéristiques ({product.characteristics?.length ?? 0})</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Gérées via l'import catalogue pour l'instant.
          </p>
          <ul className="mt-4 max-h-64 space-y-1.5 overflow-y-auto text-sm">
            {product.characteristics?.map((c, i) => (
              <li key={i} className="flex justify-between border-b border-border/60 py-1.5">
                <span className="text-muted-foreground">{c.caracteristique}</span>
                <span className="font-medium text-navy">{c.valeur} {c.unite}</span>
              </li>
            ))}
          </ul>
        </div>

        {product.documents && product.documents.length > 0 && (
          <div className="rounded-2xl border border-border bg-card p-5 md:col-span-2">
            <h2 className="font-heading font-bold text-navy">Documents</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.documents.map((doc, i) => (
                <li key={i}>
                  <a href={`${API_ROOT}/storage/${doc.path}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-navy hover:border-turquoise hover:text-turquoise">
                    <FileText className="size-4" /> {doc.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}