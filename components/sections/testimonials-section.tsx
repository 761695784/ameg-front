import Image from 'next/image'
import { Quote, Star } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

export interface Testimonial {
  quote: string
  author: string
  role: string
}

export interface PartnerLogo {
  name: string
  logo: string
}

export function TestimonialsSection({
  eyebrow = 'Témoignages',
  title = 'Ils nous font confiance',
  testimonials,
  partners,
  className,
}: {
  eyebrow?: string
  title?: string
  testimonials: Testimonial[]
  partners?: PartnerLogo[]
  className?: string
}) {
  return (
    <section className={cn('bg-secondary/50 py-16 md:py-24', className)}>
      <div className="container-ameg">
        <SectionHeading eyebrow={eyebrow} title={title} className="mb-10" />

        {partners && partners.length > 0 && (
          <div className="relative mb-14 overflow-hidden">
            {/* Dégradés sur les bords pour un effet de fondu propre */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-secondary/50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-secondary/50 to-transparent" />

            <div className="flex w-max animate-logos-scroll gap-16">
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={`${partner.name}-${i}`}
                  className="flex h-14 w-32 shrink-0 items-center justify-center grayscale transition-all hover:grayscale-0"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={128}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </div>

            <style>{`
              @keyframes logos-scroll {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              .animate-logos-scroll {
                animation: logos-scroll 25s linear infinite;
              }
              .animate-logos-scroll:hover {
                animation-play-state: paused;
              }
            `}</style>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm">
                <Quote className="size-8 text-orange/40" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                  {`"${t.quote}"`}
                </blockquote>
                <div className="mt-5 flex gap-0.5 text-orange">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-current" />
                  ))}
                </div>
                <figcaption className="mt-4 border-t pt-4">
                  <span className="block font-heading text-sm font-bold text-navy">{t.author}</span>
                  <span className="text-xs text-muted-foreground">{t.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}