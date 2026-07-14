import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowUpRight } from 'lucide-react'
import type { Realisation } from '@/lib/types'
import { storageUrl } from '@/lib/api'
import { SECTORS } from '@/lib/site'

const FALLBACK = '/images/cuisine-2.jpg'

export function RealisationCard({ realisation }: { realisation: Realisation }) {
  const image = storageUrl(realisation.cover_image) ?? FALLBACK
  const sectorLabel = SECTORS.find((s) => s.value === realisation.sector)?.label

  return (
    <Link
      href={`/realisations/${realisation.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <Image
          src={image || "/placeholder.svg"}
          alt={realisation.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        {sectorLabel && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy">
            {sectorLabel}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-lg font-bold text-navy group-hover:text-turquoise">
          {realisation.title}
        </h3>
        {realisation.location && (
          <span className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5" /> {realisation.location}
          </span>
        )}
        {realisation.short_description && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {realisation.short_description}
          </p>
        )}
        <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-navy">
          Voir le projet <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
