export interface WatchModel {
  id: string;
  name: string;
  description: string;
  price: number; // USD price
  gbpPrice?: number; // GBP price
  minOrder: number;
  image: string;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string;
  models: WatchModel[];
}

export const brands: Brand[] = [
  {
    id: 'emporio-armani',
    name: 'Emporio Armani',
    description: 'Luxury fashion watches with Italian elegance, combining contemporary design with timeless sophistication.',
    logo: '/images/brands/emporio-armani-logo.svg',
    models: []
  },
  {
    id: 'hugo-boss',
    name: 'Hugo Boss',
    description: 'German-engineered timepieces that embody modern sophistication and professional style.',
    logo: '/images/brands/hugo-boss-logo.svg',
    models: []
  },
  {
    id: 'diesel',
    name: 'Diesel',
    description: 'Bold and innovative watches that challenge traditional design with a distinctive urban edge.',
    logo: '/images/brands/diesel-logo.svg',
    models: []
  },
  {
    id: 'burberry',
    name: 'Burberry',
    description: 'British luxury timepieces that blend heritage craftsmanship with modern design elements.',
    logo: '/images/brands/burberry-logo.svg',
    models: []
  },
  {
    id: 'seiko',
    name: 'Seiko',
    description: 'Japanese precision timepieces known for their reliability, innovation, and exceptional quality.',
    logo: '/images/brands/seiko-logo.svg',
    models: []
  },
  {
    id: 'michael-kors',
    name: 'Michael Kors',
    description: 'Fashion-forward watches that combine luxury with accessibility, perfect for the style-conscious consumer.',
    logo: '/images/brands/michael-kors-logo.svg',
    models: []
  }
]; 