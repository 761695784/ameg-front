import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getCategories } from '@/lib/api'
import { CATEGORY_TAXONOMY, CATEGORY_IMAGES } from '@/lib/site'
import { SectionHeading } from '@/components/sections/section-heading'
import { Reveal } from '@/components/ui/reveal'
import { storageUrl } from '@/lib/api'

const FEATURED_SLUGS = [
  'equipements-de-cuisson',
  'equipements-frigorifiques',
  'mobilier-inox',
  'boulangerie',
  'bar',
  'chambres-froides',
  'laverie',
  'petit-materiel',
  'patisserie',
  'vaisselle-art-de-la-table',
  'blanchisserie',
  'consommables',
  'accessoires',
  'equipements-hoteliers',
  'hygiene-entretien',
]

export async function CategoriesShowcase() {
  const live = await getCategories()
  const source = live.length > 0 ? live : CATEGORY_TAXONOMY

  const featured = FEATURED_SLUGS.map((slug) => source.find((c) => c.slug === slug)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c),
  )
  const cats = featured.length >= 4 ? featured : source.slice(0, 6)

  return (
    <section className="bg-secondary/40 py-16 md:py-24">
      <div className="container-ameg">
        <SectionHeading
          eyebrow="Nos univers produits"
          title="Explorez notre catalogue par catégorie"
          description="Plus de 16 familles d'équipements pour couvrir l'intégralité de vos besoins en cuisine professionnelle."
          className="mb-12"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((cat, i) => {
            const image =
              storageUrl(cat.image) ?? CATEGORY_IMAGES[cat.slug] ?? '/images/cuisine-1.jpg'
            return (
              <Reveal key={cat.id} delay={i * 0.05}>
                <Link
                  href={`/catalogue?category_id=${cat.id}`}
                  className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-2xl"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                  <div className="relative p-6">
                    <h3 className="font-heading text-xl font-bold text-white">{cat.name}</h3>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-turquoise-foreground/90">
                      Voir les produits
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
