'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { getProducts, getCategories, storageUrl } from '@/lib/api'
import { deleteAdminProduct } from '@/lib/admin-api'
import type { ProductListItem, Category } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AdminPagination } from '@/components/admin/pagination'
import { paginationMeta } from '@/lib/api'

const AVAILABILITY_LABELS: Record<string, { label: string; className: string }> = {
  en_stock: { label: 'En stock', className: 'bg-turquoise/10 text-turquoise' },
  sur_commande: { label: 'Sur commande', className: 'bg-orange/10 text-orange' },
  rupture: { label: 'Rupture', className: 'bg-muted text-muted-foreground' },
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductListItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [lastPage, setLastPage] = useState(1)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  useEffect(() => {
    setLoading(true)
    getProducts({ q: query || undefined, category_id: categoryId || undefined, page, per_page: 20 }).then((res) => {
      setProducts(res?.data ?? [])
      setLastPage(res ? paginationMeta(res).last_page : 1)
      setLoading(false)
    })
  }, [query, categoryId, page])

  async function handleDelete(product: ProductListItem) {
    if (!confirm(`Supprimer le produit "${product.name}" (${product.reference}) ?`)) return
    await deleteAdminProduct(product.id)
    setProducts((prev) => prev.filter((p) => p.id !== product.id))
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Produits</h1>
          <p className="mt-1 text-muted-foreground">Catalogue complet — {products.length > 0 ? `page ${page}/${lastPage}` : ''}</p>
        </div>
        <Button variant="cta" size="lg2" render={<Link href="/admin/produits/nouveau" />}>
          <Plus className="size-4" /> Nouveau produit
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, référence, marque..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1) }}
            className="pl-9"
          />
        </div>
        <select
          value={categoryId}
          onChange={(e) => { setCategoryId(e.target.value); setPage(1) }}
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-turquoise sm:w-64"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-sm">
          <thead className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Produit</th>
              <th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Marque</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Disponibilité</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">Chargement...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">Aucun produit trouvé.</td></tr>
            ) : (
              products.map((p) => {
                const avail = AVAILABILITY_LABELS[p.availability] ?? { label: p.availability, className: 'bg-muted text-muted-foreground' }
                const imgSrc = storageUrl(p.primary_image?.path)
                return (
                  <tr key={p.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-muted">
                          {imgSrc && <Image src={imgSrc} alt={p.name} fill className="object-cover" />}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-navy">{p.name}</p>
                          <p className="text-xs text-muted-foreground">Réf. {p.reference}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.category?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.brand?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {p.price_fcfa ? `${Number(p.price_fcfa).toLocaleString('fr-FR')} FCFA` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${avail.className}`}>{avail.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/produits/${p.slug}`} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-navy">
                          <Pencil className="size-4" />
                        </Link>
                        <button type="button" onClick={() => handleDelete(p)} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
        </div>
      </div>

      <AdminPagination page={page} lastPage={lastPage} onChange={setPage} />
    </div>
  )
}