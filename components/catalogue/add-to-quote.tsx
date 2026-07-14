'use client'

import { useState } from 'react'
import { Check, Minus, Plus, ShoppingCart } from 'lucide-react'
import type { ProductDetail } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { useQuoteCart } from '@/components/quote/quote-cart-provider'
import { storageUrl } from '@/lib/api'

export function AddToQuote({ product }: { product: ProductDetail }) {
  const { addItem, items } = useQuoteCart()
  const [qty, setQty] = useState(1)
  const inCart = items.some((i) => i.product_id === product.id)

  const image =
    storageUrl(product.primary_image?.path ?? product.images?.[0]?.path) ?? '/images/cuisine-1.jpg'

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex h-12 items-center rounded-xl border border-border">
        <button
          type="button"
          aria-label="Diminuer la quantité"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="flex size-12 items-center justify-center text-navy transition-colors hover:bg-muted rounded-l-xl"
        >
          <Minus className="size-4" />
        </button>
        <span className="w-10 text-center font-semibold text-navy" aria-live="polite">
          {qty}
        </span>
        <button
          type="button"
          aria-label="Augmenter la quantité"
          onClick={() => setQty((q) => q + 1)}
          className="flex size-12 items-center justify-center text-navy transition-colors hover:bg-muted rounded-r-xl"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <Button
        variant={inCart ? 'turquoise' : 'cta'}
        size="xl"
        className="flex-1"
        onClick={() =>
          addItem(
            {
              product_id: product.id,
              reference: product.reference,
              name: product.name,
              slug: product.slug,
              image,
            },
            qty,
          )
        }
      >
        {inCart ? <Check className="size-5" /> : <ShoppingCart className="size-5" />}
        {inCart ? 'Ajouté au devis' : 'Ajouter au devis'}
      </Button>
    </div>
  )
}
