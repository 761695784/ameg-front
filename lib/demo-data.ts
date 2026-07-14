import type {
  Brand,
  ProductDetail,
  ProductListItem,
  Realisation,
  Service,
} from './types'
import { CATEGORY_TAXONOMY } from './site'

export const DEMO_BRANDS: Brand[] = [
  { id: 1, name: 'Rational', slug: 'rational', products_count: 6 },
  { id: 2, name: 'Unox', slug: 'unox', products_count: 5 },
  { id: 3, name: 'Electrolux', slug: 'electrolux', products_count: 4 },
  { id: 4, name: 'Hobart', slug: 'hobart', products_count: 3 },
  { id: 5, name: 'Bongard', slug: 'bongard', products_count: 3 },
  { id: 6, name: 'Robot Coupe', slug: 'robot-coupe', products_count: 2 },
  { id: 7, name: 'Winterhalter', slug: 'winterhalter', products_count: 2 },
  { id: 8, name: 'Fagor', slug: 'fagor', products_count: 3 },
]

type Seed = {
  name: string
  reference: string
  categorySlug: string
  subSlug: string
  brandId: number
  price: string | null
  availability: ProductListItem['availability']
  featured?: boolean
  image: string
  description: string
}

const SEEDS: Seed[] = [
  {
    name: 'Four mixte iCombi Pro 10 niveaux',
    reference: 'ICP-10-11',
    categorySlug: 'cuisson-professionnelle',
    subSlug: 'fours-mixtes',
    brandId: 1,
    price: '8 900 000',
    availability: 'en_stock',
    featured: true,
    image: '/images/fours.jpg',
    description:
      "Four mixte intelligent 10 niveaux GN 1/1. Cuisson vapeur, air pulsé et combinée avec pilotage automatique, nettoyage intégré et connectivité pour un rendement maximal en cuisine professionnelle.",
  },
  {
    name: 'Four à convection ChefTop 7 niveaux',
    reference: 'XEVC-0711',
    categorySlug: 'cuisson-professionnelle',
    subSlug: 'fours-mixtes',
    brandId: 2,
    price: '5 400 000',
    availability: 'en_stock',
    featured: true,
    image: '/images/fours.jpg',
    description:
      'Four mixte 7 niveaux avec technologie de régulation d\'humidité, idéal pour la pâtisserie et la restauration. Écran tactile, multi-niveaux et programmes automatiques.',
  },
  {
    name: 'Piano de cuisson 6 feux four gaz',
    reference: 'PC-6F-900',
    categorySlug: 'cuisson-professionnelle',
    subSlug: 'fourneaux-pianos',
    brandId: 3,
    price: '3 200 000',
    availability: 'en_stock',
    featured: true,
    image: '/images/cuisine-1.jpg',
    description:
      'Fourneau professionnel gamme 900, 6 brûleurs gaz haute puissance sur four statique GN 2/1. Structure inox robuste pour un usage intensif.',
  },
  {
    name: 'Friteuse électrique double bac 2x10L',
    reference: 'FR-2X10-E',
    categorySlug: 'cuisson-professionnelle',
    subSlug: 'friteuses',
    brandId: 8,
    price: '1 150 000',
    availability: 'en_stock',
    image: '/images/cuisine-1.jpg',
    description:
      'Friteuse électrique 2 cuves de 10 litres, zone froide, thermostat réglable et sécurité de surchauffe. Idéale pour le snacking et la restauration rapide.',
  },
  {
    name: 'Plaque grill lisse chromée',
    reference: 'GRL-800-C',
    categorySlug: 'cuisson-professionnelle',
    subSlug: 'grills-plaques',
    brandId: 3,
    price: '1 480 000',
    availability: 'sur_commande',
    image: '/images/cuisine-1.jpg',
    description:
      'Plaque grill lisse chromée à haut rendement, surface de cuisson large et récupérateur de graisse. Montée en température rapide et régulation précise.',
  },
  {
    name: 'Armoire réfrigérée positive 700L inox',
    reference: 'AR-700-P',
    categorySlug: 'froid-professionnel',
    subSlug: 'armoires-refrigerees',
    brandId: 3,
    price: '2 350 000',
    availability: 'en_stock',
    featured: true,
    image: '/images/hero-accueil-2.jpg',
    description:
      'Armoire réfrigérée positive 700 litres, structure inox intégrale, froid ventilé, régulation électronique et clayettes réglables. Conforme aux normes HACCP.',
  },
  {
    name: 'Table réfrigérée 3 portes GN 1/1',
    reference: 'TR-3P-GN',
    categorySlug: 'froid-professionnel',
    subSlug: 'tables-refrigerees',
    brandId: 8,
    price: '1 950 000',
    availability: 'en_stock',
    image: '/images/hero-accueil-2.jpg',
    description:
      'Table réfrigérée 3 portes avec plan de travail inox, froid ventilé et bacs GN. Parfaite comme desserte sous plan de cuisson.',
  },
  {
    name: 'Vitrine réfrigérée à pâtisserie',
    reference: 'VR-PAT-15',
    categorySlug: 'froid-professionnel',
    subSlug: 'vitrines-refrigerees',
    brandId: 8,
    price: '2 780 000',
    availability: 'sur_commande',
    featured: true,
    image: '/images/hero-accueil-1.jpg',
    description:
      'Vitrine réfrigérée ventilée pour pâtisserie, éclairage LED, verre courbe et étagères en verre. Mise en valeur optimale de vos produits.',
  },
  {
    name: 'Pétrin à spirale 40 kg',
    reference: 'PS-40',
    categorySlug: 'boulangerie-patisserie',
    subSlug: 'petrins',
    brandId: 5,
    price: '4 100 000',
    availability: 'en_stock',
    featured: true,
    image: '/images/hero-accueil-1.jpg',
    description:
      'Pétrin à spirale professionnel, cuve amovible 40 kg de pâte, deux vitesses et tête relevable. Robuste et fiable pour boulangeries à fort volume.',
  },
  {
    name: 'Four à sole électrique 4 étages',
    reference: 'FS-4E',
    categorySlug: 'boulangerie-patisserie',
    subSlug: 'fours-a-sole',
    brandId: 5,
    price: '9 600 000',
    availability: 'sur_commande',
    image: '/images/hero-accueil-1.jpg',
    description:
      'Four à sole électrique 4 étages avec injection vapeur, idéal pour pains et viennoiseries. Régulation indépendante voûte/sole par chambre.',
  },
  {
    name: 'Batteur mélangeur planétaire 20L',
    reference: 'BM-20',
    categorySlug: 'preparation-dynamique',
    subSlug: 'batteurs-melangeurs',
    brandId: 4,
    price: '1 750 000',
    availability: 'en_stock',
    image: '/images/hero-accueil-1.jpg',
    description:
      'Batteur planétaire 20 litres, 3 vitesses, livré avec fouet, feuille et crochet. Idéal pâtisserie et cuisine.',
  },
  {
    name: 'Robot coupe-légumes multifonction',
    reference: 'CL-50',
    categorySlug: 'preparation-dynamique',
    subSlug: 'robots-coupe',
    brandId: 6,
    price: '980 000',
    availability: 'en_stock',
    featured: true,
    image: '/images/labo.jpg',
    description:
      'Coupe-légumes professionnel avec jeu de disques, moteur induction et large cheminée d\'alimentation. Traitement rapide de gros volumes.',
  },
  {
    name: 'Lave-vaisselle à capot',
    reference: 'LV-CAP-50',
    categorySlug: 'laverie-hygiene',
    subSlug: 'lave-vaisselle',
    brandId: 7,
    price: '3 450 000',
    availability: 'en_stock',
    featured: true,
    image: '/images/lave-vaisselle.jpg',
    description:
      'Lave-vaisselle à capot haute performance, cycles rapides, double paroi et récupérateur de chaleur. Grande capacité de lavage horaire.',
  },
  {
    name: 'Lave-verres 40 paniers/heure',
    reference: 'LVR-40',
    categorySlug: 'laverie-hygiene',
    subSlug: 'lave-verres',
    brandId: 7,
    price: '1 250 000',
    availability: 'en_stock',
    image: '/images/bar-3.jpg',
    description:
      'Lave-verres compact pour bar et café, cycle 2 minutes, adoucisseur intégré en option. Résultat éclatant et sans traces.',
  },
  {
    name: 'Table de travail inox centrale 1800mm',
    reference: 'TT-1800-C',
    categorySlug: 'mobilier-inox',
    subSlug: 'tables-de-travail',
    brandId: 3,
    price: '620 000',
    availability: 'en_stock',
    image: '/images/labo.jpg',
    description:
      'Table de travail centrale en inox 304, étagère basse renforcée et pieds réglables. Plan de travail robuste pour usage intensif.',
  },
  {
    name: 'Hotte professionnelle à condensation 2m',
    reference: 'HT-2000-C',
    categorySlug: 'ventilation-extraction',
    subSlug: 'hottes',
    brandId: 3,
    price: '2 900 000',
    availability: 'sur_commande',
    image: '/images/cuisine-2.jpg',
    description:
      'Hotte professionnelle avec filtres à chocs inox, éclairage LED et caisson moteur. Extraction efficace des fumées et vapeurs.',
  },
  {
    name: 'Machine à glaçons 50 kg/24h',
    reference: 'MG-50',
    categorySlug: 'machines-a-glace',
    subSlug: 'machines-a-glacons',
    brandId: 8,
    price: '1 680 000',
    availability: 'en_stock',
    image: '/images/bar-2.jpg',
    description:
      'Machine à glaçons compacte, production 50 kg par 24h, réserve intégrée et condenseur à air. Glaçons pleins pour bars et restaurants.',
  },
  {
    name: 'Réfrigération de bar 2 portes vitrées',
    reference: 'BAR-2PV',
    categorySlug: 'bar-cafe',
    subSlug: 'refrigeration-bar',
    brandId: 8,
    price: '1 420 000',
    availability: 'en_stock',
    featured: true,
    image: '/images/bar-2.jpg',
    description:
      'Arrière-bar réfrigéré 2 portes vitrées, éclairage LED et clayettes réglables. Présentation attractive des boissons.',
  },
  {
    name: 'Bain-marie 4 bacs GN 1/1',
    reference: 'BM-4GN',
    categorySlug: 'buffet-distribution',
    subSlug: 'bains-marie',
    brandId: 3,
    price: '890 000',
    availability: 'en_stock',
    image: '/images/cuisine-2.jpg',
    description:
      'Bain-marie professionnel 4 bacs GN 1/1, régulation thermostatique et vidange. Maintien au chaud pour buffets et self-services.',
  },
  {
    name: 'Lave-linge professionnel 18 kg',
    reference: 'LL-18',
    categorySlug: 'blanchisserie',
    subSlug: 'lave-linge',
    brandId: 3,
    price: '4 800 000',
    availability: 'sur_commande',
    image: '/images/blanchisserie.jpg',
    description:
      'Lave-linge essoreuse professionnel 18 kg, cuve inox, essorage haute vitesse et programmes multiples. Conçu pour blanchisserie hôtelière.',
  },
  {
    name: 'Sèche-linge rotatif 18 kg',
    reference: 'SL-18',
    categorySlug: 'blanchisserie',
    subSlug: 'seche-linge',
    brandId: 3,
    price: '3 900 000',
    availability: 'sur_commande',
    image: '/images/blanchisserie.jpg',
    description:
      'Sèche-linge professionnel 18 kg, tambour inox grande capacité, inversion de rotation et régulation d\'humidité résiduelle.',
  },
  {
    name: 'Congélateur coffre 500L',
    reference: 'CG-500',
    categorySlug: 'froid-professionnel',
    subSlug: 'congelateurs',
    brandId: 8,
    price: '1 100 000',
    availability: 'en_stock',
    image: '/images/hero-accueil-2.jpg',
    description:
      'Congélateur coffre 500 litres, isolation renforcée, éclairage intérieur et paniers de rangement. Basse consommation.',
  },
  {
    name: 'Trancheur à jambon Ø 300mm',
    reference: 'TR-300',
    categorySlug: 'preparation-dynamique',
    subSlug: 'trancheurs',
    brandId: 6,
    price: '1 320 000',
    availability: 'en_stock',
    image: '/images/labo.jpg',
    description:
      'Trancheur professionnel lame Ø 300 mm, affûteur intégré et réglage d\'épaisseur précis. Structure aluminium anodisé.',
  },
  {
    name: 'Panini grill double plaques rainurées',
    reference: 'PN-2R',
    categorySlug: 'snacking-fast-food',
    subSlug: 'paninis-toasters',
    brandId: 8,
    price: '540 000',
    availability: 'en_stock',
    image: '/images/cuisine-1.jpg',
    description:
      'Grill panini double, plaques rainurées en fonte, thermostats indépendants. Idéal snacking et sandwicherie.',
  },
]

function findCategory(slug: string) {
  return CATEGORY_TAXONOMY.find((c) => c.slug === slug)
}

function slugify(reference: string) {
  return reference.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

export const DEMO_PRODUCTS: ProductDetail[] = SEEDS.map((seed, index) => {
  const category = findCategory(seed.categorySlug)
  const subcategory = category?.subcategories?.find((s) => s.slug === seed.subSlug)
  const brand = DEMO_BRANDS.find((b) => b.id === seed.brandId)
  return {
    id: index + 1,
    reference: seed.reference,
    name: seed.name,
    slug: slugify(seed.reference),
    availability: seed.availability,
    is_featured: seed.featured ?? false,
    price_fcfa: seed.price,
    brand: brand ? { id: brand.id, name: brand.name, slug: brand.slug } : null,
    category: category ? { id: category.id, name: category.name, slug: category.slug } : null,
    subcategory: subcategory
      ? { id: subcategory.id, name: subcategory.name, slug: subcategory.slug }
      : null,
    primary_image: { path: seed.image, is_primary: true, alt_text: seed.name },
    images: [{ path: seed.image, is_primary: true, alt_text: seed.name }],
    description: seed.description,
    views_count: 100 + index * 7,
    characteristics: [
      { groupe: 'Général', caracteristique: 'Référence', valeur: seed.reference },
      { groupe: 'Général', caracteristique: 'Marque', valeur: brand?.name ?? '—' },
      { groupe: 'Général', caracteristique: 'Garantie', valeur: '2', unite: 'ans' },
      { groupe: 'Construction', caracteristique: 'Matériau', valeur: 'Inox 304' },
      { groupe: 'Alimentation', caracteristique: 'Tension', valeur: '230-400', unite: 'V' },
    ],
    documents: [],
  }
})

export const DEMO_SERVICES: Service[] = [
  {
    id: 1,
    title: 'Étude & conception de cuisine',
    slug: 'etude-conception',
    icon: 'ClipboardCheck',
    short_description:
      'Analyse de vos besoins, plans d\'implantation 2D/3D et dimensionnement des équipements selon vos flux.',
    order: 1,
  },
  {
    id: 2,
    title: 'Vente d\'équipements',
    slug: 'vente-equipements',
    icon: 'ShoppingCart',
    short_description:
      'Un catalogue complet de marques certifiées, du petit matériel à la ligne de cuisson complète.',
    order: 2,
  },
  {
    id: 3,
    title: 'Livraison & installation',
    slug: 'livraison-installation',
    icon: 'Truck',
    short_description:
      'Livraison sur site, mise en service et raccordement par nos techniciens qualifiés.',
    order: 3,
  },
  {
    id: 4,
    title: 'Maintenance & SAV',
    slug: 'maintenance-sav',
    icon: 'Wrench',
    short_description:
      'Contrats d\'entretien préventif, dépannage rapide et pièces détachées d\'origine.',
    order: 4,
  },
  {
    id: 5,
    title: 'Formation du personnel',
    slug: 'formation',
    icon: 'GraduationCap',
    short_description:
      'Prise en main des équipements et bonnes pratiques d\'utilisation pour vos équipes.',
    order: 5,
  },
  {
    id: 6,
    title: 'Financement & leasing',
    slug: 'financement',
    icon: 'Coins',
    short_description:
      'Des solutions de financement adaptées pour équiper votre établissement sereinement.',
    order: 6,
  },
]

export const DEMO_REALISATIONS: Realisation[] = [
  {
    id: 1,
    title: 'Cuisine centrale — Groupe Hôtelier Téranga',
    slug: 'cuisine-centrale-teranga',
    sector: 'hotels',
    location: 'Dakar, Sénégal',
    short_description:
      'Conception et équipement complet d\'une cuisine centrale de 400 couverts avec ligne de cuisson, froid et laverie.',
    cover_image: '/images/cuisine-2.jpg',
    images: [{ path: '/images/cuisine-2.jpg' }, { path: '/images/hero-accueil-3.jpg' }],
  },
  {
    id: 2,
    title: 'Restaurant Le Baobab',
    slug: 'restaurant-le-baobab',
    sector: 'restaurants',
    location: 'Dakar, Sénégal',
    short_description:
      'Aménagement d\'une cuisine de restaurant gastronomique : piano sur-mesure, froid et extraction.',
    cover_image: '/images/cuisine-1.jpg',
    images: [{ path: '/images/cuisine-1.jpg' }, { path: '/images/hero-accueil-3.jpg' }],
  },
  {
    id: 3,
    title: 'Boulangerie du Plateau',
    slug: 'boulangerie-du-plateau',
    sector: 'boulangeries',
    location: 'Dakar, Sénégal',
    short_description:
      'Équipement complet d\'une boulangerie-pâtisserie : fours à sole, pétrins et chambres de pousse.',
    cover_image: '/images/hero-accueil-1.jpg',
    images: [{ path: '/images/hero-accueil-1.jpg' }],
  },
  {
    id: 4,
    title: 'Fast-food Chez Fatou',
    slug: 'fast-food-chez-fatou',
    sector: 'fast_foods',
    location: 'Thiès, Sénégal',
    short_description:
      'Ligne de snacking haute cadence : friteuses, grills, plaques et vitrines chaudes.',
    cover_image: '/images/fours.jpg',
    images: [{ path: '/images/fours.jpg' }],
  },
  {
    id: 5,
    title: 'Cantine scolaire — Collectivité de Rufisque',
    slug: 'cantine-rufisque',
    sector: 'collectivites',
    location: 'Rufisque, Sénégal',
    short_description:
      'Restauration collective haute capacité : marmites, sauteuses et self de distribution.',
    cover_image: '/images/labo.jpg',
    images: [{ path: '/images/labo.jpg' }],
  },
  {
    id: 6,
    title: 'Bar-lounge Le Comptoir',
    slug: 'bar-lounge-le-comptoir',
    sector: 'restaurants',
    location: 'Saly, Sénégal',
    short_description:
      'Aménagement complet d\'un bar : arrière-bar réfrigéré, machine à glaçons et lave-verres.',
    cover_image: '/images/bar-1.jpg',
    images: [{ path: '/images/bar-1.jpg' }, { path: '/images/bar-3.jpg' }],
  },
]
