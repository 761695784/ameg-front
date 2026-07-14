import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { getCategories, getSettings } from '@/lib/api'
import { CATEGORY_TAXONOMY, resolveSettings, whatsappLink } from '@/lib/site'
import { HeaderClient } from './header-client'

// Coordonnées AMEG International — fixes, ne dépendent pas de l'API.
const AMEG_CONTACT = {
  phone: '+221 33 825 39 00 / +221 76 604 31 91',
  email: 'contactameginternational@gmail.com',
}

export async function Header() {
  const [liveCategories, settingsRaw] = await Promise.all([getCategories(), getSettings()])
  const categories = liveCategories.length > 0 ? liveCategories : CATEGORY_TAXONOMY
  const settings = resolveSettings(settingsRaw)

  // whatsapp_number reste piloté par l'API (peut changer depuis l'admin plus tard).
  const wa = whatsappLink(
    settings.whatsapp_number,
    "Bonjour AMEG International, je souhaite un renseignement.",
  )

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="hidden bg-navy text-navy-foreground md:block">
        <div className="container-ameg flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-5">
            <a href={`tel:${AMEG_CONTACT.phone.replace(/\s+/g, '')}`} className="inline-flex items-center gap-1.5 hover:text-turquoise">
              <Phone className="size-3.5" /> {AMEG_CONTACT.phone}
            </a>
            <a
              href={`mailto:${AMEG_CONTACT.email}`}
              className="inline-flex items-center gap-1.5 hover:text-turquoise"
            >
              <Mail className="size-3.5" /> {AMEG_CONTACT.email}
            </a>
          </div>
          <p className="text-white/70">Équipements sans Exception en Afrique de l&apos;Ouest</p>
        </div>
      </div>

      <HeaderClient categories={categories} whatsappUrl={wa} logo={
        <Image
          src="/images/ameg-logo.png"
          alt="AMEG International"
          width={168}
          height={44}
          priority
          className="h-9 w-auto md:h-10"
        />
      } />
    </header>
  )
}

export { Link }
