import Image from 'next/image'
import { storageUrl } from '@/lib/api'
import type { Brand } from '@/lib/types'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

const FALLBACK_BRANDS = [
  'Rational',
  'Electrolux Professional',
  'Adler',
  'UNOX',
  'Hobart',
  'Fagor',
  'Bertos',
  'Comenda',
]

export function PartnersSection({
  brands,
  eyebrow = 'Nos partenaires',
  title = 'Les plus grandes marques mondiales',
  description = "Nous distribuons des équipements certifiés des leaders internationaux de la cuisine professionnelle.",
  className,
}: {
  brands: Brand[]
  eyebrow?: string
  title?: string
  description?: string
  className?: string
}) {
  const hasLogos = brands.length > 0 && brands.some((b) => b.logo)

  return (
    <section className={cn('bg-card py-16 md:py-20', className)}>
      <div className="container-ameg">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} className="mb-10" />

        {hasLogos ? (
          <div className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {brands
              .filter((b) => b.logo)
              .map((brand) => (
                <div
                  key={brand.id}
                  className="flex h-24 items-center justify-center rounded-xl border border-border bg-background p-6 grayscale transition-all hover:grayscale-0"
                >
                  <Image
                    src={storageUrl(brand.logo) ?? ''}
                    alt={brand.name}
                    width={140}
                    height={48}
                    className="max-h-12 w-auto object-contain"
                  />
                </div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 items-center gap-4 sm:grid-cols-4">
            {(brands.length > 0 ? brands.map((b) => b.name) : FALLBACK_BRANDS).map((name) => (
              <div
                key={name}
                className="flex h-20 items-center justify-center rounded-xl border border-border bg-background px-4 text-center font-heading text-lg font-bold text-navy/70"
              >
                {name}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
