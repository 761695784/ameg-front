import Image from 'next/image'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { getSettings } from '@/lib/api'
import { resolveSettings } from '@/lib/site'
import { FacebookIcon, InstagramIcon, LinkedinIcon } from '@/components/layout/social-icons'

// Coordonnées AMEG International — fixes, ne dépendent pas de l'API.
const AMEG_CONTACT = {
  phone: '33 825 39 00 / 76 604 31 91',
  email: 'contactameginternational@gmail.com',
  address: 'Dakar, POINT E Rue P-170, Sénégal',
}

const catalogueLinks = [
  { href: '/catalogue?category_id=1', label: 'Cuisson professionnelle' },
  { href: '/catalogue?category_id=2', label: 'Froid professionnel' },
  { href: '/catalogue?category_id=5', label: 'Boulangerie & Pâtisserie' },
  { href: '/catalogue?category_id=6', label: 'Laverie & Hygiène' },
  { href: '/catalogue', label: 'Tout le catalogue' },
]

const companyLinks = [
  { href: '/a-propos', label: 'À propos' },
  { href: '/services', label: 'Nos services' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/etude-de-projet', label: 'Étude de projet' },
  { href: '/contact', label: 'Contact' },
]

export async function Footer() {
  // On garde getSettings uniquement pour les réseaux sociaux (facebook_url, instagram_url, linkedin_url),
  // qui eux peuvent légitimement changer depuis l'admin plus tard.
  const settings = resolveSettings(await getSettings())

  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-ameg grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="inline-flex rounded-lg bg-white px-3 py-2">
            <Image src="/images/ameg-logo.png" alt="AMEG International" width={150} height={40} className="h-8 w-auto" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Fournisseur de référence en équipements de cuisine professionnelle pour l&apos;hôtellerie et
            la restauration en Afrique de l&apos;Ouest.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {settings.facebook_url && (
              <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex size-9 items-center justify-center rounded-lg bg-white/10 hover:bg-turquoise">
                <FacebookIcon className="size-4" />
              </a>
            )}
            {settings.instagram_url && (
              <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex size-9 items-center justify-center rounded-lg bg-white/10 hover:bg-turquoise">
                <InstagramIcon className="size-4" />
              </a>
            )}
            {settings.linkedin_url && (
              <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex size-9 items-center justify-center rounded-lg bg-white/10 hover:bg-turquoise">
                <LinkedinIcon className="size-4" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Catalogue</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {catalogueLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-turquoise">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Entreprise</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="text-sm text-white/70 hover:text-turquoise">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Contact</h3>
          <ul className="mt-4 flex flex-col gap-3.5 text-sm text-white/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-turquoise" />
              {AMEG_CONTACT.address}
            </li>
            <li>
              <a href={`tel:${AMEG_CONTACT.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2.5 hover:text-turquoise">
                <Phone className="size-4 shrink-0 text-turquoise" /> {AMEG_CONTACT.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${AMEG_CONTACT.email}`} className="flex items-center gap-2.5 hover:text-turquoise">
                <Mail className="size-4 shrink-0 text-turquoise" /> {AMEG_CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-ameg flex flex-col items-center justify-center gap-3 py-5 text-xs text-white/50 sm:flex-row sm:gap-6">
          <p>© {new Date().getFullYear()} AMEG International. Tous droits réservés.</p>
          <a href="https://majeliconnect.com" target="_blank" rel="noopener noreferrer" className="font-medium text-orange hover:text-orange/80">
            Site réalisé par Majeli Connect
          </a>
          <Link href="/admin/login" className="hover:text-turquoise">Espace administrateur</Link>
        </div>
      </div>
    </footer>
  )
}
