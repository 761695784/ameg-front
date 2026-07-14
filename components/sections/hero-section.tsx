import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface Crumb {
  label: string
  href?: string
}

interface HeroSectionProps {
  image: string
  imageAlt: string
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  breadcrumbs?: Crumb[]
  actions?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'center'
  priority?: boolean
}

const heights: Record<NonNullable<HeroSectionProps['size']>, string> = {
  sm: 'min-h-[42vh] py-16 md:min-h-[46vh]',
  md: 'min-h-[56vh] py-20 md:min-h-[60vh]',
  lg: 'min-h-[80vh] py-24 md:min-h-[88vh]',
}

export function HeroSection({
  image,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  actions,
  size = 'md',
  align = 'left',
  priority = false,
}: HeroSectionProps) {
  return (
    <section className={cn('relative flex w-full items-center overflow-hidden', heights[size])}>
      <Image src={image} alt={imageAlt} fill priority={priority} sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/30" />

      <div className="container-ameg relative z-10">
        <div className={cn('max-w-2xl', align === 'center' && 'mx-auto max-w-3xl text-center')}>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Fil d'Ariane" className={cn('mb-5 flex flex-wrap items-center gap-1 text-sm text-white/70', align === 'center' && 'justify-center')}>
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.label} className="inline-flex items-center gap-1">
                  {i > 0 && <ChevronRight className="size-3.5 text-white/40" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-turquoise">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {eyebrow && (
            <span className="inline-block rounded-full bg-orange/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-foreground">
              {eyebrow}
            </span>
          )}

          <h1 className="mt-4 font-heading text-4xl font-extrabold leading-tight text-white text-balance md:text-5xl lg:text-6xl">
            {title}
          </h1>

          {subtitle && (
            <p className={cn('mt-5 text-lg leading-relaxed text-white/80 text-pretty', align === 'center' && 'mx-auto')}>
              {subtitle}
            </p>
          )}

          {actions && <div className={cn('mt-8 flex flex-wrap gap-3', align === 'center' && 'justify-center')}>{actions}</div>}
        </div>
      </div>
    </section>
  )
}
