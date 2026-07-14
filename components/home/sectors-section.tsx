import Image from 'next/image'
import Link from 'next/link'
import { SECTOR_CARDS } from '@/lib/site'
import { SectionHeading } from '@/components/sections/section-heading'
import { Reveal } from '@/components/ui/reveal'

export function SectorsSection() {
  return (
    <section className="bg-navy py-16 md:py-24">
      <div className="container-ameg">
        <SectionHeading
          variant="dark"
          eyebrow="Secteurs d'activité"
          title="Des solutions pour chaque métier de bouche"
          description="Nous équipons tous les acteurs de l'hôtellerie et de la restauration, du food-truck à la cuisine centrale."
          className="mb-12"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SECTOR_CARDS.map((sector, i) => (
            <Reveal key={sector.key} delay={i * 0.05}>
              <Link
                href={`/realisations?sector=${sector.key}`}
                className="group flex h-full gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
              >
                <div className="relative size-24 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={sector.image || "/placeholder.svg"}
                    alt={sector.label}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-heading text-lg font-bold text-white">{sector.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{sector.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
