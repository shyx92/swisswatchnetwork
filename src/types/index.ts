export interface WatchModel {
  id: string;
  brand: string;
  modelNumber: string;
  price: number; // GBP price
  supplierPrice: number; // Original USD price from supplier
  finalPrice: number; // USD price with 20% markup
  image?: string;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
  logo: string;
  models: WatchModel[];
} 