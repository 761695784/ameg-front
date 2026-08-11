import type { Metadata } from 'next'
import { Mail, MapPin, Phone, Clock, MessageCircle } from 'lucide-react'
import { HeroSection } from '@/components/sections/hero-section'
import { LeadForm } from '@/components/forms/lead-form'
import { Button } from '@/components/ui/button'
import { getSettings } from '@/lib/api'
import { resolveSettings, whatsappLink } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez AMEG International pour vos projets de cuisine professionnelle : téléphone, email, WhatsApp et adresse.',
}

// Coordonnées AMEG International — fixes, ne dépendent pas de l'API.
const AMEG_CONTACT = {
  phone: '33 824 77 63 / 77 646 43 41',
  email: 'info@ameginternational.com',
  address: 'Dakar, POINT E Rue P-170, Sénégal',
}

export default async function ContactPage() {
  // getSettings() reste utilisé uniquement pour whatsapp_number (peut changer depuis l'admin).
  const settings = resolveSettings(await getSettings())

  const infos = [
    { icon: Phone, label: 'Téléphone', value: AMEG_CONTACT.phone, href: `tel:${AMEG_CONTACT.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: 'Email', value: AMEG_CONTACT.email, href: `mailto:${AMEG_CONTACT.email}` },
    { icon: MapPin, label: 'Adresse', value: AMEG_CONTACT.address },
    { icon: Clock, label: 'Horaires', value: 'Lun - Ven : 8h - 18h · Sam : 9h - 13h' },
  ]

  return (
    <>
      <HeroSection
        priority
        size="sm"
        image="/images/bar-1.jpg"
        imageAlt="Contactez AMEG International"
        eyebrow="Contact"
        title="Parlons de votre projet"
        subtitle="Notre équipe d'experts est à votre écoute pour vous conseiller et vous accompagner."
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Contact' }]}
      />

      <section className="bg-background py-12 md:py-16">
        <div className="container-ameg grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-heading text-2xl font-bold text-navy">Nos coordonnées</h2>
            <p className="mt-3 text-muted-foreground">
              Contactez-nous directement ou remplissez le formulaire, nous vous répondrons rapidement.
            </p>
            <ul className="mt-8 space-y-5">
              {infos.map((info) => (
                <li key={info.label} className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy">
                    <info.icon className="size-5" />
                  </span>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">{info.label}</span>
                    {info.href ? (
                      <a href={info.href} className="block font-semibold text-navy hover:text-turquoise">
                        {info.value}
                      </a>
                    ) : (
                      <span className="block font-semibold text-navy">{info.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <Button
              variant="turquoise"
              size="lg2"
              className="mt-8"
              render={
                <a
                  href={whatsappLink(settings.whatsapp_number, 'Bonjour AMEG, je souhaite un renseignement.')}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <MessageCircle className="size-4" /> Discuter sur WhatsApp
            </Button>
          </div>

          <LeadForm variant="contact" />
        </div>
      </section>
    </>
  )
}
