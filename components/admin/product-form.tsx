'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Loader2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Category, Brand, ProductDetail } from '@/lib/types'
import { createAdminProduct, updateAdminProduct } from '@/lib/admin-api'
import { ApiError } from '@/lib/api'

export function ProductForm({
  product,
  categories,
  brands,
}: {
  product?: ProductDetail
  categories: Category[]
  brands: Brand[]
}) {
  const router = useRouter()
  const [categoryId, setCategoryId] = useState(product?.category?.id?.toString() ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedCategory = categories.find((c) => c.id.toString() === categoryId)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = new FormData(e.currentTarget)
    const get = (key: string) => {
      const v = form.get(key)
      return typeof v === 'string' && v.trim() !== '' ? v.trim() : undefined
    }

    const payload: Record<string, unknown> = {
      name: get('name'),
      brand_id: get('brand_id') ? Number(get('brand_id')) : null,
      category_id: get('category_id') ? Number(get('category_id')) : undefined,
      subcategory_id: get('subcategory_id') ? Number(get('subcategory_id')) : null,
      description: get('description'),
      price_fcfa: get('price_fcfa') ? Number(get('price_fcfa')) : null,
      availability: get('availability'),
      is_featured: form.get('is_featured') === 'on',
      meta_title: get('meta_title'),
      meta_description: get('meta_description'),
    }

    try {
      if (product) {
        await updateAdminProduct(product.id, payload)
      } else {
        payload.reference = get('reference')
        await createAdminProduct(payload)
      }
      router.push('/admin/produits')
      router.refresh()
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.errors
            ? Object.values(err.errors).flat().join(' ')
            : err.message
          : "Une erreur est survenue lors de l'enregistrement.",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {!product && (
          <div>
            <Label htmlFor="reference" className="mb-2 block">Référence <span className="text-orange">*</span></Label>
            <Input id="reference" name="reference" required placeholder="AR612FX" />
          </div>
        )}
        {product && (
          <div>
            <Label className="mb-2 block">Référence</Label>
            <Input value={product.reference} disabled className="bg-muted/50" />
          </div>
        )}
        <div>
          <Label htmlFor="name" className="mb-2 block">Nom du produit <span className="text-orange">*</span></Label>
          <Input id="name" name="name" required defaultValue={product?.name} />
        </div>

        <div>
          <Label htmlFor="category_id" className="mb-2 block">Catégorie <span className="text-orange">*</span></Label>
          <select
            id="category_id"
            name="category_id"
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-turquoise"
          >
            <option value="">Sélectionner...</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="subcategory_id" className="mb-2 block">Sous-catégorie</Label>
          <select
            id="subcategory_id"
            name="subcategory_id"
            defaultValue={product?.subcategory?.id ?? ''}
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-turquoise"
            disabled={!selectedCategory}
          >
            <option value="">Aucune</option>
            {selectedCategory?.subcategories?.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="brand_id" className="mb-2 block">Marque</Label>
          <select
            id="brand_id"
            name="brand_id"
            defaultValue={product?.brand?.id ?? ''}
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-turquoise"
          >
            <option value="">Aucune</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="availability" className="mb-2 block">Disponibilité</Label>
          <select
            id="availability"
            name="availability"
            defaultValue={product?.availability ?? 'sur_commande'}
            className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-turquoise"
          >
            <option value="en_stock">En stock</option>
            <option value="sur_commande">Sur commande</option>
            <option value="rupture">Rupture de stock</option>
          </select>
        </div>

        <div>
          <Label htmlFor="price_fcfa" className="mb-2 block">Prix (FCFA)</Label>
          <Input id="price_fcfa" name="price_fcfa" type="number" step="1" min="0" defaultValue={product?.price_fcfa ?? ''} placeholder="1250000" />
        </div>
        <div className="flex items-center gap-2 self-end pb-2.5">
          <input type="checkbox" id="is_featured" name="is_featured" defaultChecked={product?.is_featured} className="size-4 rounded border-input accent-orange" />
          <Label htmlFor="is_featured">Produit mis en avant (page d'accueil)</Label>
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="description" className="mb-2 block">Description</Label>
        <Textarea id="description" name="description" rows={5} defaultValue={product?.description ?? ''} />
      </div>

      <details className="mt-5">
        <summary className="cursor-pointer text-sm font-medium text-navy">Référencement (SEO) — optionnel</summary>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="meta_title" className="mb-2 block">Meta titre</Label>
            <Input id="meta_title" name="meta_title" defaultValue={(product as any)?.meta_title ?? ''} />
          </div>
          <div>
            <Label htmlFor="meta_description" className="mb-2 block">Meta description</Label>
            <Input id="meta_description" name="meta_description" defaultValue={(product as any)?.meta_description ?? ''} />
          </div>
        </div>
      </details>

      {error && (
        <div className="mt-5 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button type="submit" variant="cta" size="xl" className="mt-6 w-full sm:w-auto" disabled={loading}>
        {loading ? (<><Loader2 className="size-4 animate-spin" /> Enregistrement...</>) : (<><Save className="size-4" /> {product ? 'Enregistrer les modifications' : 'Créer le produit'}</>)}
      </Button>
    </form>
  )
}