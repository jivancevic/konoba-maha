export type Language = 'en' | 'hr';

/* ── Nav ── */
export interface NavTranslations {
  story: string;
  food: string;
  menu: string;
  tasting: string;
  group: string;
  wine: string;
  weddings: string;
  contact: string;
  reserve: string;
  lang: string;
}

/* ── Hero ── */
export interface HeroTranslations {
  lines: string[];
  cta: string;
  ctaMenu: string;
  ctaDiscover: string;
  scroll: string;
  since: string;
}

/* ── Story ── */
export interface StoryTranslations {
  label: string;
  heading: string;
  p1: string;
  p2: string;
  p3: string;
  quote: string;
  netflix: string;
  show: string;
  cta: string;
}

/* ── Food ── */
export interface PekaTranslations {
  label: string;
  title: string;
  sub: string;
  desc: string;
  note: string;
}

export interface FoodTranslations {
  label: string;
  headline: string;
  p1: string;
  p2: string;
  peka: PekaTranslations;
  cta: string;
  wineCta: string;
}

/* ── Menu highlights ── */
export interface MenuTranslations {
  label: string;
  headline: string;
  subtext: string;
  cta: string;
  ctaSub: string;
}

/* ── Weddings ── */
export interface WeddingFeature {
  num: string;
  title: string;
  desc: string;
}

export interface WeddingsTranslations {
  label: string;
  headline: string;
  sub: string;
  features: WeddingFeature[];
  cta: string;
  planner: string;
  plannerUrl: string;
  brochure: string;
  brochureFile: string;
}

/* ── Contact ── */
export interface ContactFormTranslations {
  name: string;
  email: string;
  date: string;
  guests: string;
  message: string;
  submit: string;
  success: string;
}

export interface ContactTranslations {
  label: string;
  headline: string;
  address: string;
  hours: string;
  phone: string;
  email: string;
  reserve: string;
  reserveUrl: string;
  form: ContactFormTranslations;
}

/* ── Footer ── */
export interface FooterTranslations {
  partners: string;
  rights: string;
  location: string;
}

/* ── Root ── */
export interface Translations {
  nav: NavTranslations;
  hero: HeroTranslations;
  story: StoryTranslations;
  food: FoodTranslations;
  menu: MenuTranslations;
  weddings: WeddingsTranslations;
  contact: ContactTranslations;
  footer: FooterTranslations;
}

/* ── Menu highlights ── */
export interface HighlightItem {
  name: string;
  desc: string;
  price: string;
  tag: string;
}

/* ── Full menu ── */
export type DishTag = 'vegetarian' | 'local' | 'chef';

export interface DishItem {
  name: string;
  desc?: string;
  price: string;
  tags?: DishTag[];
}

export interface FoodSection {
  id: string;
  label: string;
  peka?: boolean;
  note?: string;
  items: DishItem[];
}

export interface WineItem {
  name: string;
  glass?: string;
  bottle: string;
  tag?: string;
}

export interface WineSection {
  label: string;
  items: WineItem[];
}

export interface TastingCourse {
  num: string;
  name: string;
  desc: string;
}

export interface PricePoint {
  label: string;
  value: string;
  sub: string;
}

export interface TastingMenu {
  title: string;
  subtitle: string;
  courses: TastingCourse[];
  price1: PricePoint;
  price2: PricePoint;
}

export interface GroupCourse {
  name: string;
  type: string;
}

export interface GroupMenu {
  title: string;
  subtitle: string;
  badge: string;
  courses: GroupCourse[];
  price1: PricePoint;
  price2: PricePoint;
  note: string;
  style: string;
}

export interface MenuTabData {
  tabs: string[];
  back: string;
  food: { sections: FoodSection[] };
  wine: { sections: WineSection[] };
  tasting: TastingMenu;
  group: GroupMenu;
}
