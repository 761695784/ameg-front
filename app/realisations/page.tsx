import type { Metadata } from 'next'
import { Suspense } from 'react'
import { HeroSection } from '@/components/sections/hero-section'
import { SectorTabs } from '@/components/realisations/sector-tabs'
import { RealisationCard } from '@/components/realisations/realisation-card'
import { CTASection } from '@/components/sections/cta-section'
import { getRealisations } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Réalisations',
  description:
    "Découvrez nos projets d'équipement de cuisines professionnelles : hôtels, restaurants, boulangeries, collectivités et bars en Afrique de l'Ouest.",
}

export default async function RealisationsPage({
  searchParams,
}: {
  searchParams: Promise<{ sector?: string }>
}) {
  const { sector } = await searchParams
  const realisations = await getRealisations(sector)

  return (
    <>
      <HeroSection
        priority
        size="sm"
        image="/images/cuisine-2.jpg"
        imageAlt="Réalisations AMEG International"
        eyebrow="Nos réalisations"
        title="Des projets livrés clés en main"
        subtitle="Plus de 1200 établissements équipés. Explorez nos installations par secteur d'activité."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Réalisations' }]}
      />

      <section className="bg-background py-12 md:py-16">
        <div className="container-ameg">
          <Suspense fallback={null}>
            <SectorTabs />
          </Suspense>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {realisations.map((realisation) => (
              <RealisationCard key={realisation.id} realisation={realisation} />
            ))}
          </div>

          {realisations.length === 0 && (
            <p className="py-20 text-center text-muted-foreground">
              Aucune réalisation dans ce secteur pour le moment.
            </p>
          )}
        </div>
      </section>

      <CTASection
        title="Votre projet mérite le même soin"
        description="Confiez-nous l'étude et l'équipement de votre cuisine professionnelle."
      />
    </>
  )
}
