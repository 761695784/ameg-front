import { BadgeCheck, ClipboardCheck, Coins, Truck, Users, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { HomeHero } from '@/components/home/home-hero'
import { StatsSection } from '@/components/sections/stats-section'
import { CategoriesShowcase } from '@/components/home/categories-showcase'
import { FeaturedProducts } from '@/components/home/featured-products'
import { FeaturesSection } from '@/components/sections/features-section'
import { SectorsSection } from '@/components/home/sectors-section'
import { ContentSection } from '@/components/sections/content-section'
import { PartnersSection } from '@/components/sections/partners-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { CTASection } from '@/components/sections/cta-section'
import { getBrands } from '@/lib/api'
import { HOME_STATS, TESTIMONIALS } from '@/lib/site'

const WHY_US_FEATURES = [
  { icon: ClipboardCheck, title: 'Étude & conception', description: "Nous étudions vos plans et concevons l'implantation optimale de votre cuisine." },
  { icon: Truck, title: 'Livraison & installation', description: 'Livraison sur site et installation par nos techniciens certifiés partout en région.' },
  { icon: Wrench, title: 'Maintenance & SAV', description: 'Contrats de maintenance et pièces détachées pour prolonger la vie de vos équipements.' },
  { icon: BadgeCheck, title: 'Marques certifiées', description: 'Uniquement des équipements de marques reconnues, garantis et conformes aux normes.' },
  { icon: Users, title: 'Conseil expert', description: 'Des conseillers spécialisés CHR vous guident vers les bons choix techniques.' },
  { icon: Coins, title: 'Meilleur rapport qualité-prix', description: 'Des tarifs négociés directement auprès des fabricants pour tous les budgets.' },
]

export default async function HomePage() {
  const brands = await getBrands()

  return (
    <>
      <HomeHero />
      <StatsSection stats={HOME_STATS} />
      <CategoriesShowcase />
      <FeaturedProducts />
      <FeaturesSection
        eyebrow="Pourquoi AMEG International"
        title="Un partenaire d'équipement, pas seulement un fournisseur"
        description="De l'étude de vos plans à la mise en service, nous vous accompagnons à chaque étape de votre projet CHR."
        features={WHY_US_FEATURES}
      />
      <SectorsSection />
      <ContentSection
        eyebrow="Notre showroom"
        title="Venez tester vos futurs équipements"
        image="/images/Gallery.jpg"
        imageAlt="Showroom AMEG International"
        actions={
          <Button variant="cta" size="lg2" render={<Link href="/contact" />}>
            Prendre rendez-vous
          </Button>
        }
      >
        <p>
          Découvrez dans notre espace d&apos;exposition les plus grandes marques de matériel de cuisine
          professionnelle : Rational, Unox, et bien d&apos;autres.
        </p>
        <p>
          Nos conseillers techniques vous présentent les équipements en fonctionnement et vous aident à
          choisir la configuration adaptée à votre activité.
        </p>
      </ContentSection>
      <PartnersSection brands={brands} />
      <TestimonialsSection
      testimonials={TESTIMONIALS}
      partners={[
        { name: 'Hôtel Terrou-Bi', logo: '/images/terrou-bi.jpg' },
        { name: 'Hôtel King Fadh Palace', logo: '/images/king-fadh.jpg' },
        { name: 'Hôtel Radisson Blu', logo: '/images/radisson-hotel.png' },
        { name: 'Noom Hôtel', logo: '/images/noom.jpg' },
      ]}
      />
      <CTASection />
    </>
  )
}
