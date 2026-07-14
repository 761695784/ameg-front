import Image from 'next/image'
import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { cn } from '@/lib/utils'

interface ContentSectionProps {
  eyebrow?: string
  title: ReactNode
  children?: ReactNode
  bullets?: string[]
  image: string
  imageAlt: string
  imageSide?: 'left' | 'right'
  actions?: ReactNode
  className?: string
}

export function ContentSection({
  eyebrow,
  title,
  children,
  bullets,
  image,
  imageAlt,
  imageSide = 'right',
  actions,
  className,
}: ContentSectionProps) {
  return (
    <section className={cn('bg-background py-16 md:py-24', className)}>
      <div className="container-ameg grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className={cn(imageSide === 'left' && 'lg:order-2')}>
          <div>
            {eyebrow && (
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-turquoise">
                <span className="h-px w-6 bg-turquoise" aria-hidden />
                {eyebrow}
              </span>
            )}
            <h2 className="mt-3 font-heading text-3xl font-bold text-navy text-balance md:text-4xl">
              {title}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">{children}</div>

            {bullets && bullets.length > 0 && (
              <ul className="mt-6 space-y-3">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-turquoise/15 text-turquoise">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-sm text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
        </Reveal>

        <Reveal className={cn(imageSide === 'left' && 'lg:order-1')} delay={0.1}>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl shadow-lg">
            <Image src={image} alt={imageAlt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
