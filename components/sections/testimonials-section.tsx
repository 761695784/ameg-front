import { Quote, Star } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

export interface Testimonial {
  quote: string
  author: string
  role: string
}

export function TestimonialsSection({
  eyebrow = 'Témoignages',
  title = 'Ils nous font confiance',
  testimonials,
  className,
}: {
  eyebrow?: string
  title?: string
  testimonials: Testimonial[]
  className?: string
}) {
  return (
    <section className={cn('bg-secondary/50 py-16 md:py-24', className)}>
      <div className="container-ameg">
        <SectionHeading eyebrow={eyebrow} title={title} className="mb-12" />
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
