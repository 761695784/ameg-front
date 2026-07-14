'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus, Check } from 'lucide-react'
import type { ProductListItem } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { useQuoteCart } from '@/components/quote/quote-cart-provider'
import { storageUrl } from '@/lib/api'
import { AVAILABILITY_LABELS, formatPrice } from '@/lib/site'
import { cn } from '@/lib/utils'

const FALLBACK_IMAGE = '/images/cuisine-1.jpg'

export function ProductCard({ product }: { product: ProductListItem }) {
  const { addItem, items } = useQuoteCart()
  const inCart = items.some((i) => i.product_id === product.id)
  const image = storageUrl(product.primary_image?.path) ?? FALLBACK_IMAGE
  const availability = AVAILABILITY_LABELS[product.availability]

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      <Link
        href={`/catalogue/${product.slug}`}
        className="relative aspect-4/3 overflow-hidden bg-muted"
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={product.primary_image?.alt_text ?? product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.is_featured && (
          <span className="absolute left-3 top-3 rounded-full bg-orange px-2.5 py-1 text-xs font-semibold text-orange-foreground">
            Coup de cœur
          </span>
        )}
        {product.brand?.name && (
          <span className="absolute right-3 top-3 rounded-full bg-navy/85 px-2.5 py-1 text-xs font-medium text-white">
            {product.brand.name}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        {product.category?.name && (
          <span className="text-xs font-medium uppercase tracking-wide text-turquoise">
            {product.category.name}
          </span>
        )}
        <Link href={`/catalogue/${product.slug}`} className="mt-1">
          <h3 className="line-clamp-2 font-semibold leading-snug text-foreground group-hover:text-navy">
            {product.name}
          </h3>
        </Link>
        <span className="mt-1 text-xs text-muted-foreground">Réf. {product.reference}</span>

        <div className="mt-2">
          <span
            className={cn(
              'inline-block rounded-full px-2 py-0.5 text-xs font-medium',
              availability.className,
            )}
          >
            {availability.label}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 pt-2">
          <div className="text-sm">
            {formatPrice(product.price_fcfa) ? (
              <span className="font-semibold text-navy">{formatPrice(product.price_fcfa)}</span>
            ) : (
              <span className="text-muted-foreground">Prix sur demande</span>
            )}
          </div>
          <Button
            size="sm"
            variant={inCart ? 'turquoise' : 'cta'}
            onClick={() =>
              addItem({
                product_id: product.id,
                reference: product.reference,
                name: product.name,
                slug: product.slug,
                image,
              })
            }
            className="shrink-0"
          >
            {inCart ? <Check className="size-4" /> : <Plus className="size-4" />}
            {inCart ? 'Ajouté' : 'Devis'}
          </Button>
        </div>
      </div>
    </div>
  )
}
