import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

export interface FaqItem {
  question: string
  answer: string
}

export function FAQSection({
  eyebrow = 'FAQ',
  title = 'Questions fréquentes',
  description,
  items,
  className,
}: {
  eyebrow?: string
  title?: string
  description?: string
  items: FaqItem[]
  className?: string
}) {
  return (
    <section className={cn('bg-background py-16 md:py-24', className)}>
      <div className="container-ameg max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} className="mb-10" />
        <Accordion className="flex flex-col gap-3">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-xl border border-border bg-card px-5 data-[panel-open]:shadow-sm"
            >
              <AccordionTrigger className="py-4 text-left font-heading text-base font-semibold text-navy hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
