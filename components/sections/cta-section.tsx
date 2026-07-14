import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CTASectionProps {
  title?: string
  description?: string
  className?: string
}

export function CTASection({
  title = 'Vous avez un projet ? Discutons-en.',
  description = "Parlez-nous de votre établissement. Nos experts vous accompagnent de l'étude à l'installation.",
  className,
}: CTASectionProps) {
  return (
    <section className={cn('bg-background py-16 md:py-20', className)}>
      <div className="container-ameg">
        <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-14 text-center md:px-12 md:py-16">
          <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-turquoise/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full bg-orange/20 blur-3xl" aria-hidden />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-heading text-3xl font-bold text-white text-balance md:text-4xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 text-pretty">
              {description}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button variant="cta" size="xl" render={<Link href="/devis" />}>
                Demander un devis <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                render={<Link href="/etude-de-projet" />}
              >
                <FileText className="size-4" /> Étude de projet
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
