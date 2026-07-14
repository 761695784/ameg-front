import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

export interface TimelineStep {
  title: string
  description: string
}

export function TimelineSection({
  eyebrow,
  title,
  description,
  steps,
  numbered = true,
  className,
}: {
  eyebrow?: string
  title?: string
  description?: string
  steps: TimelineStep[]
  numbered?: boolean
  className?: string
}) {
  return (
    <section className={cn('bg-secondary/50 py-16 md:py-24', className)}>
      <div className="container-ameg">
        {title && (
          <SectionHeading eyebrow={eyebrow} title={title} description={description} className="mb-12" />
        )}
        <ol className="relative mx-auto max-w-3xl">
          <span className="absolute left-4 top-2 bottom-2 w-px bg-border md:left-1/2" aria-hidden />
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05}>
              <li
                className={cn(
                  'relative mb-8 flex gap-5 pl-12 last:mb-0 md:w-1/2 md:pl-0',
                  i % 2 === 0
                    ? 'md:mr-auto md:pr-12 md:text-right'
                    : 'md:ml-auto md:pl-12 md:flex-row-reverse md:text-left',
                )}
              >
                <span
                  className={cn(
                    'absolute left-0 top-0 z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-navy font-heading text-sm font-bold text-white ring-4 ring-background md:left-1/2 md:-translate-x-1/2',
                  )}
                >
                  {numbered ? i + 1 : ''}
                </span>
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="font-heading text-base font-bold text-navy">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
