import type { LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeaturesSectionProps {
  eyebrow?: string
  title?: string
  description?: string
  features: Feature[]
  columns?: 2 | 3
  className?: string
}

export function FeaturesSection({
  eyebrow,
  title,
  description,
  features,
  columns = 3,
  className,
}: FeaturesSectionProps) {
  return (
    <section className={cn('bg-background py-16 md:py-24', className)}>
      <div className="container-ameg">
        {title && (
          <SectionHeading eyebrow={eyebrow} title={title} description={description} className="mb-12" />
        )}
        <div className={cn('grid gap-6', columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <Reveal key={feature.title} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-accent text-turquoise transition-colors group-hover:bg-turquoise group-hover:text-turquoise-foreground">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-navy">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
