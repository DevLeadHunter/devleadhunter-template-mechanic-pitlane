/**
 * Types + construction du contenu de la template 'mechanic-pitlane' (« Pitlane »).
 *
 * DA asphalt sombre / rouge racing inspirée d'AutoWorks. La template rend un
 * `SiteContent` typé et possède sa copie éditoriale (défauts métier garage).
 */
import type { SiteContent } from '~/types/SiteContent'

export interface PitlaneTheme {
  primary: string
  secondary: string
  accent: string
}

export const pitlaneDefaultTheme: PitlaneTheme = {
  primary: '#E11D2E',
  secondary: '#0C0C0D',
  accent: '#F4F4F5',
}

export interface PitlaneTrustItem {
  value: string
  label: string
}

export interface PitlaneServiceItem {
  title: string
  description: string
  image?: string
}

export interface PitlaneWhyItem {
  title: string
  description: string
}

export interface PitlaneGalleryItem {
  url: string
  alt: string
}

export interface PitlaneProcessItem {
  step: string
  title: string
  description: string
}

export interface PitlaneReviewItem {
  author: string
  rating: number
  text: string
}

export interface PitlaneFaqItem {
  question: string
  answer: string
}

export interface PitlaneHoursItem {
  day: string
  hours: string
}

export interface PitlanePageContent {
  theme: PitlaneTheme
  businessName: string
  logo: string
  badge: string
  subtitle: string
  city: string
  area: string
  phone: string
  email: string
  about: string
  heroImage: string
  aboutImage: string
  aboutSecondaryImage: string
  heroPoints: string[]
  ctaCallLabel: string
  ctaQuoteLabel: string
  trustItems: PitlaneTrustItem[]
  servicesHeading: string
  services: PitlaneServiceItem[]
  whyHeading: string
  whyItems: PitlaneWhyItem[]
  aboutHeading: string
  galleryHeading: string
  gallery: PitlaneGalleryItem[]
  processHeading: string
  processItems: PitlaneProcessItem[]
  reviewsHeading: string
  reviews: PitlaneReviewItem[]
  faqHeading: string
  faq: PitlaneFaqItem[]
  faqImage: string
  contactHeading: string
  openingHours: PitlaneHoursItem[]
  zones: string[]
  address: string
  lat: number
  lng: number
}

const defaults = {
  badge: 'Garage multi-marques',
  subtitle:
    'Entretien, diagnostic et réparations — un atelier de confiance, devis avant intervention.',
  ctaCallLabel: 'Appeler l’atelier',
  ctaQuoteLabel: 'Prendre rendez-vous',
  heroPoints: ['Devis avant réparation', 'Toutes marques', 'Pièces garanties'] as string[],
  trustItems: [
    { value: '4,9/5', label: 'Avis clients' },
    { value: 'RDV', label: 'Sur rendez-vous' },
    { value: '12 mois', label: 'Garantie pièces' },
    { value: 'Local', label: 'Atelier de proximité' },
  ] as PitlaneTrustItem[],
  servicesHeading: 'Nos prestations',
  services: [
    {
      title: 'Révision & entretien',
      description:
        'Vidange, filtres, freins, climatisation : on suit le carnet constructeur et on vous prévient avant usure critique.',
    },
    {
      title: 'Diagnostic électronique',
      description:
        'Valise multi-marques, lecture des défauts, recherche de panne. Le devis part du diagnostic — pas l’inverse.',
    },
    {
      title: 'Freinage & trains roulants',
      description:
        'Plaquettes, disques, amortisseurs, silentblocs, géométrie : sécurité et tenue de route remises en état.',
    },
    {
      title: 'Distribution & mécanique',
      description:
        'Courroie / chaîne, pompe à eau, embrayage, joints — interventions planifiées avec devis ferme et délai clair.',
    },
    {
      title: 'Pneus & géométrie',
      description:
        'Montage, équilibrage, crevaison, conseil usure. On vous dit quand le pneu peut encore rouler — et quand non.',
    },
    {
      title: 'Carrosserie légère',
      description:
        'Rayures, chocs de parking, pare-chocs : remises en état propres pour un véhicule présentable.',
    },
  ] as PitlaneServiceItem[],
  whyHeading: 'Pourquoi nous choisir',
  whyItems: [
    {
      title: 'Tarifs compétitifs',
      description:
        'Devis transparent avant réparation. Pas de surprise sur la facture : le devis validé, c’est le prix final.',
    },
    {
      title: 'Service rapide & efficace',
      description:
        'Créneaux atelier organisés pour limiter l’immobilisation. On vous prévient dès que la voiture est prête.',
    },
    {
      title: 'Techniciens expérimentés',
      description:
        'Diagnostic multi-marques, pièces de qualité et interventions dans les règles de l’art.',
    },
    {
      title: 'Pièces & équipements de qualité',
      description:
        'On privilégie des pièces adaptées à votre véhicule, avec garantie, plutôt que le moins cher à tout prix.',
    },
  ] as PitlaneWhyItem[],
  aboutHeading: 'L’atelier',
  galleryHeading: 'L’atelier en images',
  processHeading: 'Comment ça se passe',
  processItems: [
    {
      step: '01',
      title: 'Prise de rendez-vous',
      description: 'Appelez ou écrivez : on fixe un créneau selon l’urgence et la charge atelier.',
    },
    {
      step: '02',
      title: 'Diagnostic',
      description: 'Contrôle visuel + électronique si besoin. On vous rappelle avec le devis.',
    },
    {
      step: '03',
      title: 'Réparation',
      description: 'Intervention validée, pièces de qualité, suivi en atelier jusqu’à restitution.',
    },
    {
      step: '04',
      title: 'Contrôle & remise',
      description: 'Essai route si pertinent, explication des travaux, véhicule prêt à repartir.',
    },
  ] as PitlaneProcessItem[],
  reviewsHeading: 'Avis clients',
  faqHeading: 'Questions fréquentes',
  faq: [
    {
      question: 'Faut-il prendre rendez-vous ?',
      answer:
        'Oui, de préférence. Ça nous permet de préparer le créneau et les pièces éventuelles. En urgence, appelez : on voit ce qui est possible le jour même.',
    },
    {
      question: 'Le devis est-il gratuit ?',
      answer:
        'Le devis de réparation est établi après diagnostic. On vous l’explique clairement avant toute intervention — rien n’est lancé sans votre accord.',
    },
    {
      question: 'Intervenez-vous sur toutes les marques ?',
      answer:
        'Oui, atelier multi-marques : citadines, breaks, SUV et utilitaires légers. Diagnostic électronique adapté aux véhicules récents.',
    },
    {
      question: 'Puis-je laisser la voiture la journée ?',
      answer:
        'Oui. Indiquez-nous à la prise de rendez-vous si vous avez besoin d’un créneau de restitution précis.',
    },
  ] as PitlaneFaqItem[],
  contactHeading: 'Prendre rendez-vous',
  images: {
    hero: 'https://images.unsplash.com/photo-1658244535411-92c887137240?auto=format&fit=crop&w=1600&q=80',
    about:
      'https://images.unsplash.com/photo-1613214150132-9606e332d68e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80',
        alt: 'Distribution moteur — courroie et poulies',
      },
      {
        url: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
        alt: 'Intervention mécanique sur moteur',
      },
      {
        url: 'https://images.unsplash.com/photo-1637640125496-31852f042a60?auto=format&fit=crop&w=1200&q=80',
        alt: 'Outillage d’atelier',
      },
      {
        url: 'https://images.unsplash.com/photo-1723099971299-3789db53604c?auto=format&fit=crop&w=1200&q=80',
        alt: 'Véhicule sur pont élévateur',
      },
      {
        url: 'https://images.unsplash.com/photo-1711386689622-1cda23e10217?auto=format&fit=crop&w=1200&q=80',
        alt: 'Réparation sous véhicule',
      },
      {
        url: 'https://images.unsplash.com/photo-1735361039382-d78a0a0cc185?auto=format&fit=crop&w=1200&q=80',
        alt: 'Atelier mécanique équipé',
      },
    ] as PitlaneGalleryItem[],
  },
} as const

/**
 * @param value Texte éditorial optionnel
 * @param fallback Défaut template
 * @returns Texte à afficher
 */
function resolveText(value: string | undefined, fallback: string): string {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback
}

/** `SiteContent` + l'adresse rue et les coordonnées carte injectées par l'API, absentes du contrat partagé. */
type PitlaneContentInput = SiteContent & {
  address?: string
  lat?: number | null
  lng?: number | null
}

/**
 * Construit le contenu de page prêt pour le rendu.
 * @param content Données variables du prospect (`SiteContent`)
 * @returns Contenu typé Pitlane
 */
export function buildPitlaneContent(content: PitlaneContentInput): PitlanePageContent {
  const palette = content.palette ?? {}

  const trustFromContent: PitlaneTrustItem[] = Array.isArray(content.trustItems)
    ? content.trustItems
        .map((item): PitlaneTrustItem => ({
          value: item.value ?? '',
          label: item.label ?? '',
        }))
        .filter((item): boolean => item.value.length > 0 || item.label.length > 0)
    : []

  const heroPointsFromContent: string[] = Array.isArray(content.heroPoints)
    ? content.heroPoints.filter(
        (point): boolean => typeof point === 'string' && point.trim().length > 0,
      )
    : []

  const servicesRaw: PitlaneServiceItem[] =
    Array.isArray(content.services) && content.services.length > 0
      ? content.services
          .map((service): PitlaneServiceItem => ({
            title: service.title ?? '',
            description: service.description ?? '',
          }))
          .filter((service): boolean => service.title.length > 0)
      : [...defaults.services]

  const galleryFromContent: PitlaneGalleryItem[] = Array.isArray(content.gallery)
    ? content.gallery
        .map((item): PitlaneGalleryItem => ({
          url: item.url ?? '',
          alt: item.alt ?? '',
        }))
        .filter((item): boolean => item.url.length > 0)
        .slice(0, 8)
    : []
  const gallery: PitlaneGalleryItem[] = galleryFromContent.length
    ? galleryFromContent
    : [...defaults.images.gallery]

  const services: PitlaneServiceItem[] = servicesRaw.map(
    (service: PitlaneServiceItem, index: number): PitlaneServiceItem => {
      // Une image distincte par carte : photo réelle à cet index, sinon un défaut du template — jamais le cycle « % length » qui répétait une photo partout.
      const realImage: string = galleryFromContent[index]?.url ?? ''
      const fallbackImage: string =
        defaults.images.gallery[index % defaults.images.gallery.length]?.url ?? ''
      return {
        ...service,
        image: realImage || fallbackImage,
      }
    },
  )

  const reviews: PitlaneReviewItem[] = Array.isArray(content.reviews)
    ? content.reviews
        .map((review): PitlaneReviewItem => ({
          author: review.author ?? 'Client',
          rating: typeof review.rating === 'number' ? review.rating : 5,
          text: review.text ?? '',
        }))
        .filter((review): boolean => review.text.length > 0)
    : []

  const faq: PitlaneFaqItem[] =
    Array.isArray(content.faq) && content.faq.length > 0
      ? content.faq
          .map((item): PitlaneFaqItem => ({
            question: item.question ?? '',
            answer: item.answer ?? '',
          }))
          .filter((item): boolean => item.question.length > 0 && item.answer.length > 0)
      : [...defaults.faq]

  const openingHours: PitlaneHoursItem[] = Array.isArray(content.openingHours)
    ? content.openingHours
        .map((item): PitlaneHoursItem => ({
          day: item.day ?? '',
          hours: item.hours ?? '',
        }))
        .filter((item): boolean => item.day.length > 0)
    : []

  const zones: string[] = Array.isArray(content.zones)
    ? content.zones.filter((zone): boolean => typeof zone === 'string' && zone.length > 0)
    : []

  return {
    theme: {
      primary:
        typeof palette.primary === 'string' && palette.primary.length > 0
          ? palette.primary
          : pitlaneDefaultTheme.primary,
      secondary:
        typeof palette.secondary === 'string' && palette.secondary.length > 0
          ? palette.secondary
          : pitlaneDefaultTheme.secondary,
      accent:
        typeof palette.accent === 'string' && palette.accent.length > 0
          ? palette.accent
          : pitlaneDefaultTheme.accent,
    },
    businessName: content.businessName ?? '',
    logo: typeof content.logo === 'string' ? content.logo.trim() : '',
    badge: resolveText(content.heroBadge, defaults.badge),
    subtitle: resolveText(content.subtitle, defaults.subtitle),
    city: content.city ?? '',
    area: content.area ?? '',
    phone: content.phone ?? '',
    email: content.email ?? '',
    about: content.about ?? '',
    heroImage: content.heroImage || defaults.images.hero,
    aboutImage: content.aboutImage || defaults.images.about,
    aboutSecondaryImage:
      gallery[1]?.url || gallery[0]?.url || content.heroImage || content.aboutImage || '',
    heroPoints: heroPointsFromContent.length ? heroPointsFromContent : [...defaults.heroPoints],
    ctaCallLabel: resolveText(content.ctaCallLabel, defaults.ctaCallLabel),
    ctaQuoteLabel: resolveText(content.ctaQuoteLabel, defaults.ctaQuoteLabel),
    trustItems: trustFromContent.length ? trustFromContent : [...defaults.trustItems],
    servicesHeading: resolveText(content.servicesHeading, defaults.servicesHeading),
    services,
    whyHeading: defaults.whyHeading,
    whyItems: [...defaults.whyItems],
    aboutHeading: resolveText(content.aboutHeading, defaults.aboutHeading),
    galleryHeading: resolveText(content.galleryHeading, defaults.galleryHeading),
    gallery,
    processHeading: defaults.processHeading,
    processItems: [...defaults.processItems],
    reviewsHeading: resolveText(content.reviewsHeading, defaults.reviewsHeading),
    reviews,
    faqHeading: resolveText(content.faqHeading, defaults.faqHeading),
    faq,
    faqImage: content.aboutImage || gallery[0]?.url || content.heroImage || '',
    contactHeading: resolveText(content.contactHeading, defaults.contactHeading),
    openingHours,
    zones,
    address: typeof content.address === 'string' ? content.address.trim() : '',
    lat: typeof content.lat === 'number' ? content.lat : 0,
    lng: typeof content.lng === 'number' ? content.lng : 0,
  }
}
