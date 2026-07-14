import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ClipboardList,
  Truck,
  Wrench,
  LifeBuoy,
  PencilRuler,
  GraduationCap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroSection } from '@/components/sections/hero-section'
import { TimelineSection } from '@/components/sections/timeline-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CTASection } from '@/components/sections/cta-section'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from '@/components/sections/section-heading'
import { getServices } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Nos services',
  description:
    "Étude de projet, conception de cuisine, livraison, installation, maintenance et SAV : AMEG International vous accompagne de A à Z.",
}

const ICONS: Record<string, LucideIcon> = {
  etude: PencilRuler,
  conception: ClipboardList,
  livraison: Truck,
  installation: Wrench,
  maintenance: LifeBuoy,
  formation: GraduationCap,
}

const FALLBACK_SERVICES = [
  { key: 'etude', title: 'Étude de projet', description: "Analyse de vos besoins, de votre espace et de vos flux pour définir la cuisine idéale." },
  { key: 'conception', title: 'Conception & plans', description: 'Conception technique et implantation optimisée de votre cuisine sur plans 2D/3D.' },
  { key: 'livraison', title: 'Livraison', description: 'Livraison de vos équipements sur site, dans les délais convenus et partout en région.' },
  { key: 'installation', title: 'Installation & mise en service', description: 'Installation par nos techniciens certifiés et mise en service complète des équipements.' },
  { key: 'maintenance', title: 'Maintenance & SAV', description: 'Contrats de maintenance préventive et curative, avec pièces détachées d\'origine.' },
  { key: 'formation', title: 'Formation', description: 'Prise en main de vos équipements par vos équipes pour une utilisation optimale.' },
]

const PROCESS = [
  { title: 'Prise de contact', description: 'Vous nous exposez votre projet, votre activité et vos contraintes.' },
  { title: 'Étude & devis', description: 'Notre bureau d\'études conçoit votre cuisine et établit un devis détaillé.' },
  { title: 'Validation & commande', description: 'Vous validez la proposition et nous lançons la commande des équipements.' },
  { title: 'Livraison & installation', description: 'Nous livrons et installons le matériel, puis effectuons la mise en service.' },
  { title: 'Suivi & maintenance', description: 'Nous assurons le SAV et la maintenance pour la pérennité de votre cuisine.' },
]

const FAQ = [
  { question: 'Intervenez-vous en dehors de votre région ?', answer: 'Oui, nous livrons et installons dans plusieurs pays d\'Afrique de l\'Ouest. Contactez-nous pour vérifier la couverture de votre zone.' },
  { question: 'Proposez-vous des contrats de maintenance ?', answer: 'Absolument. Nous proposons des contrats de maintenance préventive et curative adaptés à votre parc d\'équipements.' },
  { question: 'Puis-je financer mon équipement ?', answer: 'Nous étudions avec vous les meilleures solutions selon votre budget. Parlez-en à nos conseillers lors de votre demande de devis.' },
  { question: 'Les équipements sont-ils garantis ?', answer: 'Tous nos équipements sont garantis par les fabricants. La durée dépend de la marque et du produit.' },
]

export default async function ServicesPage() {
  const live = await getServices()
  const services =
    live.length > 0
      ? live.map((s) => ({ key: s.icon ?? '', title: s.title, description: s.short_description ?? s.description ?? '' }))
      : FALLBACK_SERVICES

  return (
    <>
      <HeroSection
        priority
        image="/images/installation.jpg"
        imageAlt="Installation d'équipements de cuisine professionnelle"
        eyebrow="Nos services"
        title="Un accompagnement complet, de l'étude au SAV"
        subtitle="Nous ne vendons pas seulement du matériel : nous concevons, installons et maintenons votre cuisine professionnelle."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Services' }]}
        actions={
          <Button variant="cta" size="xl" render={<Link href="/devis" />}>
            Demander un devis
          </Button>
        }
      />

      <section className="bg-background py-16 md:py-24">
        <div className="container-ameg">
          <SectionHeading
            eyebrow="Ce que nous faisons"
            title="Des prestations pensées pour les professionnels"
            description="Chaque service est assuré par des équipes spécialisées dans les métiers de la restauration."
            className="mb-12"
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => {
              const Icon = ICONS[service.key] ?? Wrench
              return (
                <Reveal key={`${service.title}-${i}`} delay={i * 0.06}>
                  <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-navy text-white transition-colors group-hover:bg-orange">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-bold text-navy">{service.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <TimelineSection
        eyebrow="Notre méthode"
        title="Comment se déroule un projet"
        description="Une démarche structurée pour un résultat à la hauteur de vos attentes."
        steps={PROCESS}
      />

      <FAQSection items={FAQ} />

      <CTASection />
    </>
  )
}
