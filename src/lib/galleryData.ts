export type LocalizedText = {
  fr: string;
  en: string;
};

export type GalleryItem = {
  id: string;
  image: string;
  category: 'paroisse' | 'activites' | 'orphelinats' | 'reunions' | 'celebrations';
  title: LocalizedText;
  description: LocalizedText;
  location: LocalizedText;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'paroisse-accueil',
    image: 'https://picsum.photos/seed/nkom-kana-paroisse/1200/900',
    category: 'paroisse',
    title: {fr: 'Vie de la paroisse', en: 'Parish life'},
    description: {
      fr: 'Moments de communion fraternelle apres les celebrations dominicales et les temps forts de la communaute.',
      en: 'Moments of fraternity after Sunday celebrations and key community events.',
    },
    location: {fr: 'Cour paroissiale', en: 'Parish courtyard'},
  },
  {
    id: 'activites-jeunes',
    image: 'https://picsum.photos/seed/nkom-kana-activites/1200/900',
    category: 'activites',
    title: {fr: 'Activites pastorales', en: 'Pastoral activities'},
    description: {
      fr: 'Rencontres, catechese, repetitions et services communautaires qui rythment la semaine.',
      en: 'Meetings, catechesis, rehearsals and community service throughout the week.',
    },
    location: {fr: 'Salles paroissiales', en: 'Parish halls'},
  },
  {
    id: 'visite-orphelinat',
    image: 'https://picsum.photos/seed/nkom-kana-orphelinat/1200/900',
    category: 'orphelinats',
    title: {fr: 'Visites des orphelinats', en: 'Visits to orphanages'},
    description: {
      fr: 'Actions de proximite, dons et moments de partage avec les enfants accompagnes par la paroisse.',
      en: 'Outreach actions, donations and moments of sharing with children supported by the parish.',
    },
    location: {fr: 'Secteurs partenaires', en: 'Partner sectors'},
  },
  {
    id: 'reunion-conseil',
    image: 'https://picsum.photos/seed/nkom-kana-reunion/1200/900',
    category: 'reunions',
    title: {fr: 'Reunions pastorales', en: 'Pastoral meetings'},
    description: {
      fr: 'Concertation des responsables, planification des activites et coordination des differents services.',
      en: 'Leader coordination, activity planning and alignment across parish ministries.',
    },
    location: {fr: 'Presbytere et bureaux', en: 'Presbytery and offices'},
  },
  {
    id: 'grande-celebration',
    image: 'https://picsum.photos/seed/nkom-kana-celebration/1200/900',
    category: 'celebrations',
    title: {fr: 'Grandes celebrations', en: 'Major celebrations'},
    description: {
      fr: 'Temps liturgiques, processions et rassemblements qui marquent la vie spirituelle de la paroisse.',
      en: 'Liturgical seasons, processions and gatherings that shape parish spiritual life.',
    },
    location: {fr: 'Eglise paroissiale', en: 'Parish church'},
  },
  {
    id: 'chorale-liturgie',
    image: 'https://picsum.photos/seed/nkom-kana-chorale/1200/900',
    category: 'celebrations',
    title: {fr: 'Service liturgique et chant', en: 'Liturgy and choir service'},
    description: {
      fr: 'Preparation des celebrations avec les chorales, lecteurs, servants et equipes liturgiques.',
      en: 'Preparation of celebrations with choirs, readers, altar servers and liturgy teams.',
    },
    location: {fr: 'Nef et sacristie', en: 'Nave and sacristy'},
  },
];

export function getLocalizedGalleryItems(locale: string) {
  return GALLERY_ITEMS.map((item) => ({
    ...item,
    localizedTitle: locale === 'fr' ? item.title.fr : item.title.en,
    localizedDescription: locale === 'fr' ? item.description.fr : item.description.en,
    localizedLocation: locale === 'fr' ? item.location.fr : item.location.en,
  }));
}
