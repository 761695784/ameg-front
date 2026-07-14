import type { Availability, Category, Settings } from './types'

export const AVAILABILITY_LABELS: Record<Availability, { label: string; className: string }> = {
  en_stock: { label: 'En stock', className: 'bg-turquoise/15 text-turquoise' },
  sur_commande: { label: 'Sur commande', className: 'bg-orange/15 text-orange' },
  rupture: { label: 'Rupture', className: 'bg-destructive/10 text-destructive' },
}

/** Sensible defaults used only when the backend `/settings` endpoint is unreachable. */
export const DEFAULT_SETTINGS: Required<
  Pick<Settings, 'whatsapp_number' | 'contact_email' | 'contact_phone' | 'address'>
> &
  Settings = {
  whatsapp_number: '221766043191',
  contact_email: 'contact@ameginternational.com',
  contact_phone: '33 825 39 00 / 76 604 31 91',
  address: 'Dakar, POINT E Rue P-170, Sénégal',
  facebook_url: 'https://facebook.com',
  instagram_url: 'https://instagram.com',
  linkedin_url: 'https://linkedin.com',
}

export function resolveSettings(settings: Settings | null): Settings {
  return { ...DEFAULT_SETTINGS, ...(settings ?? {}) }
}

/** Format an FCFA price that may arrive as a raw number or a spaced string. */
export function formatPrice(price?: string | number | null): string | null {
  if (price === null || price === undefined || price === '') return null
  const numeric = Number(String(price).replace(/[^0-9.]/g, ''))
  if (!Number.isFinite(numeric) || numeric <= 0) return null
  return `${numeric.toLocaleString('fr-FR')} FCFA`
}

export function whatsappLink(number: string | undefined, text: string): string {
  const clean = (number ?? DEFAULT_SETTINGS.whatsapp_number).replace(/[^0-9]/g, '')
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`
}

/**
 * The 16 official catalogue categories. Used as a navigation taxonomy fallback
 * for the mega-menu / category grid when the live `/categories` endpoint has
 * not yet responded. Live data from the API always takes precedence.
 */
export const CATEGORY_TAXONOMY: Category[] = [
  {
    id: 1,
    name: 'Cuisson professionnelle',
    slug: 'cuisson-professionnelle',
    subcategories: [
      { id: 101, name: 'Fourneaux & pianos', slug: 'fourneaux-pianos' },
      { id: 102, name: 'Fours mixtes', slug: 'fours-mixtes' },
      { id: 103, name: 'Friteuses', slug: 'friteuses' },
      { id: 104, name: 'Grills & plaques', slug: 'grills-plaques' },
    ],
  },
  {
    id: 2,
    name: 'Froid professionnel',
    slug: 'froid-professionnel',
    subcategories: [
      { id: 201, name: 'Armoires réfrigérées', slug: 'armoires-refrigerees' },
      { id: 202, name: 'Tables réfrigérées', slug: 'tables-refrigerees' },
      { id: 203, name: 'Vitrines réfrigérées', slug: 'vitrines-refrigerees' },
      { id: 204, name: 'Congélateurs', slug: 'congelateurs' },
    ],
  },
  {
    id: 3,
    name: 'Chambres froides',
    slug: 'chambres-froides',
    subcategories: [
      { id: 301, name: 'Chambres froides positives', slug: 'chambres-positives' },
      { id: 302, name: 'Chambres froides négatives', slug: 'chambres-negatives' },
      { id: 303, name: 'Groupes frigorifiques', slug: 'groupes-frigorifiques' },
    ],
  },
  {
    id: 4,
    name: 'Préparation dynamique',
    slug: 'preparation-dynamique',
    subcategories: [
      { id: 401, name: 'Batteurs & mélangeurs', slug: 'batteurs-melangeurs' },
      { id: 402, name: 'Trancheurs', slug: 'trancheurs' },
      { id: 403, name: 'Robots coupe', slug: 'robots-coupe' },
    ],
  },
  {
    id: 5,
    name: 'Boulangerie & Pâtisserie',
    slug: 'boulangerie-patisserie',
    subcategories: [
      { id: 501, name: 'Fours à sole', slug: 'fours-a-sole' },
      { id: 502, name: 'Pétrins', slug: 'petrins' },
      { id: 503, name: 'Chambres de pousse', slug: 'chambres-de-pousse' },
      { id: 504, name: 'Diviseuses', slug: 'diviseuses' },
    ],
  },
  {
    id: 6,
    name: 'Laverie & Hygiène',
    slug: 'laverie-hygiene',
    subcategories: [
      { id: 601, name: 'Lave-vaisselle', slug: 'lave-vaisselle' },
      { id: 602, name: 'Lave-verres', slug: 'lave-verres' },
      { id: 603, name: 'Plonges & éviers', slug: 'plonges-eviers' },
    ],
  },
  {
    id: 7,
    name: 'Mobilier inox',
    slug: 'mobilier-inox',
    subcategories: [
      { id: 701, name: 'Tables de travail', slug: 'tables-de-travail' },
      { id: 702, name: 'Étagères', slug: 'etageres' },
      { id: 703, name: 'Armoires inox', slug: 'armoires-inox' },
    ],
  },
  {
    id: 8,
    name: 'Ventilation & Extraction',
    slug: 'ventilation-extraction',
    subcategories: [
      { id: 801, name: 'Hottes', slug: 'hottes' },
      { id: 802, name: 'Filtres & moteurs', slug: 'filtres-moteurs' },
    ],
  },
  {
    id: 9,
    name: 'Snacking & Fast-food',
    slug: 'snacking-fast-food',
    subcategories: [
      { id: 901, name: 'Paninis & toasters', slug: 'paninis-toasters' },
      { id: 902, name: 'Grills à viande', slug: 'grills-viande' },
      { id: 903, name: 'Réchauds', slug: 'rechauds' },
    ],
  },
  {
    id: 10,
    name: 'Bar & Café',
    slug: 'bar-cafe',
    subcategories: [
      { id: 1001, name: 'Machines à café', slug: 'machines-a-cafe' },
      { id: 1002, name: 'Réfrigération de bar', slug: 'refrigeration-bar' },
      { id: 1003, name: 'Blenders', slug: 'blenders' },
    ],
  },
  {
    id: 11,
    name: 'Buffet & Distribution',
    slug: 'buffet-distribution',
    subcategories: [
      { id: 1101, name: 'Bains-marie', slug: 'bains-marie' },
      { id: 1102, name: 'Vitrines chaudes', slug: 'vitrines-chaudes' },
      { id: 1103, name: 'Chariots', slug: 'chariots' },
    ],
  },
  {
    id: 12,
    name: 'Machines à glace',
    slug: 'machines-a-glace',
    subcategories: [
      { id: 1201, name: 'Machines à glaçons', slug: 'machines-a-glacons' },
      { id: 1202, name: 'Turbines à glace', slug: 'turbines-a-glace' },
    ],
  },
  {
    id: 13,
    name: 'Blanchisserie',
    slug: 'blanchisserie',
    subcategories: [
      { id: 1301, name: 'Lave-linge', slug: 'lave-linge' },
      { id: 1302, name: 'Sèche-linge', slug: 'seche-linge' },
      { id: 1303, name: 'Repassage', slug: 'repassage' },
    ],
  },
  {
    id: 14,
    name: 'Petit équipement',
    slug: 'petit-equipement',
    subcategories: [
      { id: 1401, name: 'Batterie de cuisine', slug: 'batterie-de-cuisine' },
      { id: 1402, name: 'Coutellerie', slug: 'coutellerie' },
    ],
  },
  {
    id: 15,
    name: 'Vaisselle & Arts de la table',
    slug: 'vaisselle-arts-de-la-table',
    subcategories: [
      { id: 1501, name: 'Assiettes & plats', slug: 'assiettes-plats' },
      { id: 1502, name: 'Verrerie', slug: 'verrerie' },
    ],
  },
  {
    id: 16,
    name: "Équipement d'hôtel",
    slug: 'equipement-hotel',
    subcategories: [
      { id: 1601, name: 'Minibars', slug: 'minibars' },
      { id: 1602, name: 'Chariots de service', slug: 'chariots-de-service' },
    ],
  },
]

export const SECTORS: { value: string; label: string }[] = [
  { value: 'all', label: 'Tous les secteurs' },
  { value: 'hotels', label: 'Hôtels' },
  { value: 'restaurants', label: 'Restaurants' },
  { value: 'fast_foods', label: 'Fast-foods' },
  { value: 'boulangeries', label: 'Boulangeries' },
  { value: 'patisseries', label: 'Pâtisseries' },
  { value: 'collectivites', label: 'Collectivités' },
]

export const NAV_LINKS = [
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/services', label: 'Services' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

export const HOME_STATS = [
  { value: 15, suffix: '+', label: "Années d'expérience" },
  { value: 1200, suffix: '+', label: 'Projets réalisés' },
  { value: 40, suffix: '+', label: 'Marques partenaires' },
  { value: 6, suffix: '', label: 'Pays desservis' },
]

export const WHY_US = [
  {
    icon: 'ClipboardCheck',
    title: 'Étude & conception',
    description: "Nous étudions vos plans et concevons l'implantation optimale de votre cuisine.",
  },
  {
    icon: 'Truck',
    title: 'Livraison & installation',
    description: 'Livraison sur site et installation par nos techniciens certifiés partout en région.',
  },
  {
    icon: 'Wrench',
    title: 'Maintenance & SAV',
    description: 'Contrats de maintenance et pièces détachées pour prolonger la vie de vos équipements.',
  },
  {
    icon: 'BadgeCheck',
    title: 'Marques certifiées',
    description: 'Uniquement des équipements de marques reconnues, garantis et conformes aux normes.',
  },
  {
    icon: 'Users',
    title: 'Conseil expert',
    description: 'Des conseillers spécialisés CHR vous guident vers les bons choix techniques.',
  },
  {
    icon: 'Coins',
    title: 'Meilleur rapport qualité-prix',
    description: 'Des tarifs négociés directement auprès des fabricants pour tous les budgets.',
  },
]

export const PARTNERS = [
  'Rational',
  'Unox',
  'Electrolux',
  'Hobart',
  'Bongard',
  'Fagor',
  'Robot Coupe',
  'Winterhalter',
]

export const TESTIMONIALS = [
  {
    quote:
      "AMEG a équipé notre cuisine centrale de A à Z. Étude sérieuse, matériel de qualité et installation impeccable.",
    author: 'Mariama Diallo',
    role: 'Directrice, Groupe Hôtelier Téranga',
  },
  {
    quote:
      'Un accompagnement de bout en bout pour notre boulangerie. Les fours livrés sont exactement ce qu\'il nous fallait.',
    author: 'Ibrahima Sow',
    role: 'Gérant, Boulangerie du Plateau',
  },
  {
    quote:
      'Réactifs sur le SAV et de bon conseil sur le froid professionnel. Un partenaire de confiance.',
    author: 'Awa Ndiaye',
    role: 'Cheffe de cuisine, Restaurant Le Baobab',
  },
]

export const SECTOR_CARDS = [
  { key: 'hotels', label: 'Hôtels', image: '/images/cuisine-2.jpg', description: 'Cuisines centrales, room service, buffets et blanchisserie.' },
  { key: 'restaurants', label: 'Restaurants', image: '/images/cuisine-1.jpg', description: 'Lignes de cuisson, froid et laverie sur-mesure.' },
  { key: 'fast_foods', label: 'Fast-foods', image: '/images/fours.jpg', description: 'Snacking, grills et équipements haute cadence.' },
  { key: 'boulangeries', label: 'Boulangeries & Pâtisseries', image: '/images/hero-accueil-1.jpg', description: 'Fours, pétrins et chambres de pousse professionnels.' },
  { key: 'collectivites', label: 'Collectivités', image: '/images/labo.jpg', description: 'Restauration collective haute capacité et hygiène.' },
  { key: 'bars', label: 'Bars & Cafés', image: '/images/bar-1.jpg', description: 'Comptoirs, machines à café et réfrigération de bar.' },
]

export const CATEGORY_IMAGES: Record<string, string> = {
  'cuisson-professionnelle': '/images/cuisine-1.jpg',
  'froid-professionnel': '/images/hero-accueil-2.jpg',
  'boulangerie-patisserie': '/images/hero-accueil-1.jpg',
  'laverie-hygiene': '/images/lave-vaisselle.jpg',
  'blanchisserie': '/images/blanchisserie.jpg',
  'bar-cafe': '/images/bar-3.jpg',
  'ventilation-extraction': '/images/cuisine-2.jpg',
  'mobilier-inox': '/images/labo.jpg',
}
