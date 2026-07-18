import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, HeartHandshake, ShieldCheck, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroSection } from '@/components/sections/hero-section'
import { StatsSection } from '@/components/sections/stats-section'
import { ContentSection } from '@/components/sections/content-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { TimelineSection } from '@/components/sections/timeline-section'
import { TeamSection } from '@/components/sections/team-section'
import { CTASection } from '@/components/sections/cta-section'
import { HOME_STATS } from '@/lib/site'

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "Découvrez AMEG International, fournisseur de référence en équipements de cuisine professionnelle pour l'hôtellerie et la restauration en Afrique de l'Ouest.",
}

const VALUES = [
  { icon: ShieldCheck, title: 'Fiabilité', description: 'Des équipements durables, garantis et conformes aux normes internationales.' },
  { icon: HeartHandshake, title: 'Proximité', description: 'Un accompagnement humain, du premier contact au SAV, partout en région.' },
  { icon: Award, title: 'Excellence', description: 'Uniquement des marques de référence et une exigence de qualité sans compromis.' },
  { icon: Target, title: 'Sur-mesure', description: 'Des solutions pensées pour votre activité, votre espace et votre budget.' },
]

const MILESTONES = [
  { title: 'Création d\'AMEG International', description: "Naissance de l'entreprise avec l'ambition d'équiper les professionnels de la restauration." },
  { title: 'Ouverture du showroom', description: 'Un espace d\'exposition pour présenter les équipements en fonctionnement.' },
  { title: 'Partenariats constructeurs', description: 'Distribution officielle des plus grandes marques mondiales du secteur CHR.' },
  { title: 'Expansion régionale', description: 'Déploiement de nos services d\'installation et de maintenance dans plusieurs pays.' },
]

const TEAM = [
  { name: 'Direction générale', role: 'Stratégie & partenariats', description: 'Pilote la vision et les relations constructeurs.' },
  { name: 'Bureau d\'études', role: 'Conception de cuisines', description: 'Conçoit vos implantations sur plans techniques.' },
  { name: 'Équipe commerciale', role: 'Conseil CHR', description: 'Vous oriente vers les bons équipements.' },
  { name: 'Service technique', role: 'Installation & SAV', description: 'Installe et maintient vos équipements sur site.' },
]

export default function AProposPage() {
  return (
    <>
      <HeroSection
        priority
        image="/images/hero-catalogue.jpg"
        imageAlt="Cuisine professionnelle équipée par AMEG International"
        eyebrow="Notre entreprise"
        title="Votre partenaire en équipement de cuisine professionnelle"
        subtitle="Depuis plus de 5 ans, AMEG International accompagne les professionnels de l'hôtellerie et de la restauration avec des équipements de qualité et une expertise technique reconnue."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'À propos' }]}
      />

      <StatsSection stats={HOME_STATS} variant="light" />

      <ContentSection
        eyebrow="Notre mission"
        title="Équiper durablement les professionnels des métiers de bouche"
        image="/images/cuisine-1.jpg"
        imageAlt="Ligne de cuisson professionnelle"
        bullets={[
          'Conseil technique par des spécialistes du secteur CHR',
          'Distribution officielle de marques certifiées',
          'Installation et mise en service par nos équipes',
          'Contrats de maintenance et pièces détachées',
        ]}
        actions={
          <Button variant="cta" size="lg2" render={<Link href="/services" />}>
            Découvrir nos services
          </Button>
        }
      >
        <p>
          AMEG International fournit et installe des cuisines professionnelles complètes.
          Notre approche va bien au-delà de la simple vente de matériel : nous sommes un partenaire
          global qui vous accompagne sur toute la durée de vie de vos équipements.
        </p>
        <p>
          Restaurants, hôtels, boulangeries, collectivités ou fast-foods : nous adaptons chaque
          solution à la réalité de votre activité et aux contraintes de votre espace.
        </p>
      </ContentSection>

      <FeaturesSection
        eyebrow="Nos valeurs"
        title="Ce qui guide notre travail au quotidien"
        features={VALUES}
        columns={2}
      />

      <TimelineSection
        eyebrow="Notre parcours"
        title="Les grandes étapes"
        steps={MILESTONES}
      />

      <TeamSection members={TEAM} />

      <CTASection />
    </>
  )
}
