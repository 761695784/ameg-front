import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section'
import { DevisForm } from '@/components/quote/devis-form'

export const metadata: Metadata = {
  title: 'Demander un devis',
  description:
    "Constituez votre liste d'équipements et recevez un devis personnalisé sous 24-48h de la part d'AMEG International.",
}

export default function DevisPage() {
  return (
    <>
      <HeroSection
        priority
        size="sm"
        image="/images/showroom.jpg"
        imageAlt="Demande de devis AMEG"
        eyebrow="Devis gratuit"
        title="Demandez votre devis personnalisé"
        subtitle="Ajoutez vos produits, renseignez vos coordonnées et recevez une proposition adaptée à votre projet."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Devis' }]}
      />
      <section className="bg-background py-12 md:py-16">
        <div className="container-ameg">
          <DevisForm />
        </div>
      </section>
    </>
  )
}
