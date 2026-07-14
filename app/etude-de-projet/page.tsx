import type { Metadata } from 'next'
import { ClipboardCheck, PencilRuler, Truck, Wrench } from 'lucide-react'
import { HeroSection } from '@/components/sections/hero-section'
import { LeadForm } from '@/components/forms/lead-form'
import { SectionHeading } from '@/components/sections/section-heading'

export const metadata: Metadata = {
  title: 'Étude de projet',
  description:
    "Bénéficiez d'une étude de projet gratuite pour l'aménagement de votre cuisine professionnelle : analyse, plans, dimensionnement et devis.",
}

const STEPS = [
  { icon: ClipboardCheck, title: 'Analyse des besoins', text: 'Nous étudions votre activité, vos flux et vos contraintes réglementaires.' },
  { icon: PencilRuler, title: 'Conception & plans', text: 'Implantation optimisée en 2D/3D et dimensionnement de chaque équipement.' },
  { icon: Truck, title: 'Devis & installation', text: 'Proposition chiffrée détaillée, livraison et mise en service par nos équipes.' },
  { icon: Wrench, title: 'Suivi & maintenance', text: 'Accompagnement dans la durée avec contrats d\'entretien et SAV réactif.' },
]

export default function EtudeProjetPage() {
  return (
    <>
      <HeroSection
        priority
        size="sm"
        image="/images/installation.jpg"
        imageAlt="Étude de projet de cuisine professionnelle"
        eyebrow="Accompagnement sur-mesure"
        title="Une étude de projet gratuite"
        subtitle="De l'idée à la cuisine opérationnelle : nos experts conçoivent l'aménagement idéal pour votre établissement."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Étude de projet' }]}
      />

      <section className="bg-muted/40 py-14 md:py-20">
        <div className="container-ameg">
          <SectionHeading
            eyebrow="Notre méthode"
            title="Un accompagnement en 4 étapes"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative rounded-2xl border border-border bg-card p-6">
                <span className="font-heading text-4xl font-bold text-navy/10">0{i + 1}</span>
                <span className="mt-2 flex size-11 items-center justify-center rounded-xl bg-turquoise/10 text-turquoise">
                  <step.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-14 md:py-20">
        <div className="container-ameg max-w-3xl">
          <SectionHeading
            eyebrow="Démarrer"
            title="Demandez votre étude gratuite"
            description="Renseignez les caractéristiques de votre projet, nous revenons vers vous avec une première proposition."
            align="center"
          />
          <div className="mt-10">
            <LeadForm
              variant="etude"
              successTitle="Demande d'étude envoyée"
              successMessage="Merci ! Notre bureau d'études vous recontacte pour affiner votre projet."
            />
          </div>
        </div>
      </section>
    </>
  )
}
