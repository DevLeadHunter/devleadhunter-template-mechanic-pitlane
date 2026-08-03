import type { SiteContent } from './app/types/SiteContent'

const demoImg = {
  hero: 'https://images.unsplash.com/photo-1658244535411-92c887137240?auto=format&fit=crop&w=1600&q=80',
  about:
    'https://images.unsplash.com/photo-1613214150132-9606e332d68e?auto=format&fit=crop&w=1200&q=80',
  service1:
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=80',
  service2:
    'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
  service3:
    'https://images.unsplash.com/photo-1637640125496-31852f042a60?auto=format&fit=crop&w=1200&q=80',
  parallax:
    'https://images.unsplash.com/photo-1723099971299-3789db53604c?auto=format&fit=crop&w=1600&q=80',
  atelier:
    'https://images.unsplash.com/photo-1711386689622-1cda23e10217?auto=format&fit=crop&w=1200&q=80',
  stock:
    'https://images.unsplash.com/photo-1735361039382-d78a0a0cc185?auto=format&fit=crop&w=1200&q=80',
}

/** Mock SiteContent — Automobiles du Landry (Rennes) : fixture d'aperçu `.playground`. */
export const mockSiteContent: SiteContent = {
  businessName: 'Automobiles du Landry',
  subtitle:
    'Garage AD Expert à Rennes — révision, mécanique, carrosserie et pneus. Devis avant intervention, accueil atelier sans call-center.',
  phone: '02 99 50 54 58',
  email: 'contact@garagedulandry.com',
  city: 'Rennes',
  area: '120 bis rue de Châteaugiron',
  about:
    'Depuis près de vingt ans, Automobiles du Landry accueille les automobilistes rennais au 120 bis rue de Châteaugiron. Atelier agréé AD Expert, l’équipe prend en charge l’entretien courant comme les interventions techniques sur toutes marques — y compris les véhicules récents, tout en conservant la garantie constructeur.\n\nMécanique, carrosserie, pneumatiques, véhicules d’occasion et aide carte grise : un garage de proximité pensé pour les habitants de Rennes, Cesson-Sévigné et Chantepie. La règle : diagnostic honnête, devis clair, restitution dans les délais annoncés.',
  heroBadge: 'AD Expert · Rennes',
  heroPoints: ['Devis avant toute réparation', 'Toutes marques', 'Atelier + carrosserie'],
  ctaCallLabel: 'Appeler le garage',
  ctaQuoteLabel: 'Demander un RDV',
  trustItems: [
    { value: '19+', label: 'Ans d’expérience' },
    { value: '120+', label: 'Avis clients' },
    { value: '4,3/5', label: 'Note moyenne' },
    { value: 'AD', label: 'Réseau Expert' },
  ],
  servicesHeading: 'Réparations & entretien',
  galleryHeading: 'Le garage en images',
  reviewsHeading: 'Ce que disent les clients',
  faqHeading: 'Avant de déposer votre voiture',
  aboutHeading: 'Notre réputation parle pour nous',
  contactHeading: 'Prendre rendez-vous',
  heroImage: demoImg.hero,
  aboutImage: demoImg.about,
  palette: {
    primary: '#E11D2E',
    secondary: '#0C0C0D',
    accent: '#F4F4F5',
  },
  services: [
    {
      title: 'Révision & entretien',
      description:
        'Vidange, filtres, freinage, climatisation, contrôles périodiques — un programme complet pour rouler en sécurité.',
      icon: 'wrench',
    },
    {
      title: 'Mécanique toutes marques',
      description:
        'Diagnostic électronique, distribution, embrayage, trains roulants : interventions techniques sur véhicules récents et anciens.',
      icon: 'engine',
    },
    {
      title: 'Carrosserie',
      description:
        'Remise en état après choc, rayures, peinture : atelier carrosserie intégré au garage.',
      icon: 'body',
    },
    {
      title: 'Pneus & géométrie',
      description:
        'Montage, équilibrage, conseil usure et géométrie pour préserver pneus et tenue de route.',
      icon: 'tire',
    },
    {
      title: 'Dépannage local',
      description:
        'Assistance autour de Rennes, Cesson-Sévigné et Chantepie selon disponibilité atelier.',
      icon: 'tow',
    },
    {
      title: 'Occasion & carte grise',
      description:
        'Véhicules d’occasion contrôlés et point service carte grise pour simplifier vos démarches.',
      icon: 'key',
    },
  ],
  gallery: [
    { url: demoImg.service1, alt: 'Distribution moteur — courroie et poulies' },
    { url: demoImg.service2, alt: 'Intervention mécanique sur moteur' },
    { url: demoImg.service3, alt: 'Outillage d’atelier' },
    { url: demoImg.parallax, alt: 'Véhicule sur pont élévateur' },
    { url: demoImg.atelier, alt: 'Réparation sous véhicule' },
    { url: demoImg.stock, alt: 'Atelier mécanique équipé' },
  ],
  reviews: [
    {
      author: 'Marc D.',
      rating: 5,
      text: 'Diagnostic sérieux sur une panne complexe. L’équipe a cherché l’origine sans proposer de réparations inutiles. Voiture repartie nickel — je recommande.',
    },
    {
      author: 'Sophie L.',
      rating: 5,
      text: 'Accueil correct, devis clair avant intervention, restitution dans les temps. Bon garage de quartier à Rennes.',
    },
    {
      author: 'Julien P.',
      rating: 4,
      text: 'Révision + freins faits proprement. Prix dans la moyenne AD, explications claires sur les pièces changées.',
    },
    {
      author: 'Claire M.',
      rating: 5,
      text: 'Carrosserie après un choc de parking : résultat soigné, véhicule rendu propre. Merci à l’atelier.',
    },
  ],
  faq: [
    {
      question: 'Faut-il prendre rendez-vous ?',
      answer:
        'Oui, de préférence via téléphone. Indiquez la marque, le modèle et le motif : on prépare le créneau atelier en conséquence.',
    },
    {
      question: 'Intervenez-vous sur toutes les marques ?',
      answer:
        'Oui. En tant que garage AD Expert multi-marques, nous intervenons sur la majorité des véhicules, y compris les plus récents, en conservant la garantie constructeur lorsque les conditions le permettent.',
    },
    {
      question: 'Proposez-vous de la carrosserie ?',
      answer:
        'Oui, atelier carrosserie intégré : chocs, rayures, peinture. Demandez un devis après diagnostic visuel.',
    },
    {
      question: 'Quelles zones couvrez-vous ?',
      answer:
        'Rennes et communes proches (Cesson-Sévigné, Chantepie…). Pour un dépannage, appelez pour vérifier la disponibilité.',
    },
  ],
  zones: ['Rennes', 'Cesson-Sévigné', 'Chantepie', 'Vern-sur-Seiche', 'Bruz'],
  openingHours: [
    { day: 'Lundi', hours: '8h30 – 12h · 14h – 18h' },
    { day: 'Mardi', hours: '8h30 – 12h · 14h – 18h' },
    { day: 'Mercredi', hours: '8h30 – 12h · 14h – 18h' },
    { day: 'Jeudi', hours: '8h30 – 12h · 14h – 18h' },
    { day: 'Vendredi', hours: '8h30 – 12h · 14h – 18h' },
    { day: 'Samedi', hours: 'Sur rendez-vous' },
    { day: 'Dimanche', hours: 'Fermé' },
  ],
}
