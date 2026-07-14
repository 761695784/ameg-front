'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ProductImage } from '@/lib/types'
import { storageUrl } from '@/lib/api'
import { cn } from '@/lib/utils'

const FALLBACK = '/images/cuisine-1.jpg'

export function ProductGallery({
  images,
  name,
}: {
  images: ProductImage[]
  name: string
}) {
  const resolved =
    images.length > 0
      ? images.map((img) => ({ src: storageUrl(img.path) ?? FALLBACK, alt: img.alt_text ?? name }))
      : [{ src: FALLBACK, alt: name }]

  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-card">
        <Image
          src={resolved[active].src || "/placeholder.svg"}
          alt={resolved[active].alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-4"
        />
      </div>

      {resolved.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {resolved.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Voir l'image ${i + 1}`}
              className={cn(
                'relative aspect-square overflow-hidden rounded-lg border-2 bg-card transition-colors',
                i === active ? 'border-turquoise' : 'border-border hover:border-navy/40',
              )}
            >
              <Image src={img.src || "/placeholder.svg"} alt={img.alt} fill sizes="80px" className="object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
