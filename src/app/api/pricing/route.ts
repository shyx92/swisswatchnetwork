import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('watchlyx');
    const collection = db.collection('watches');

    // Fetch all watches from MongoDB
    const watches = await collection.find({}).toArray();

    // Group watches by brand
    const brandMap = watches.reduce((acc: any, watch: any) => {
      // Normalize brand names
      const normalizedBrand = normalizeBrandName(watch.brand);
      
      if (!acc[normalizedBrand]) {
        acc[normalizedBrand] = {
          id: normalizedBrand.toLowerCase().replace(/\s+/g, '-'),
          name: normalizedBrand,
          description: getBrandDescription(normalizedBrand), // Get brand description from predefined list
          logo: `/images/brands/${normalizedBrand.toLowerCase().replace(/\s+/g, '-')}-logo.svg`,
          models: []
        };
      }

      acc[normalizedBrand].models.push({
        id: watch.modelNumber,
        name: watch.name || watch.modelNumber,
        description: watch.description || '',
        specifications: watch.specifications || '',
        price: watch.supplierPrice,
        finalPrice: watch.finalPrice,
        gbpPrice: Math.round(watch.finalPrice * 0.79), // Using fixed conversion rate for now
        minOrder: 1,
        image: watch.imageUrl || '/images/placeholder-watch.svg'
      });

      return acc;
    }, {});

    // Convert the map to an array
    const brands = Object.values(brandMap);

    return NextResponse.json(brands);
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pricing data' },
      { status: 500 }
    );
  }
}

// Predefined brand descriptions
function getBrandDescription(brand: string): string {
  const descriptions: { [key: string]: string } = {
    'Emporio Armani': 'Luxury fashion watches with Italian elegance, combining contemporary design with timeless sophistication.',
    'Hugo Boss': 'German-engineered timepieces that embody modern sophistication and professional style.',
    'Diesel': 'Bold and innovative watches that challenge traditional design with a distinctive urban edge.',
    'Burberry': 'British luxury timepieces that blend heritage craftsmanship with modern design elements.',
    'Seiko': 'Japanese precision timepieces known for their reliability, innovation, and exceptional quality.',
    'Michael Kors': 'Fashion-forward watches that combine luxury with accessibility, perfect for the style-conscious consumer.',
  };

  return descriptions[brand] || `Premium timepieces from ${brand}`;
}

// Normalize brand names
function normalizeBrandName(brand: string): string {
  const brandMappings: { [key: string]: string } = {
    'Armani': 'Emporio Armani',
    'Emporio Armani': 'Emporio Armani',
    'Hugo Boss': 'Hugo Boss',
    'HUGO BOSS': 'Hugo Boss',
    'Diesel': 'Diesel',
    'DIESEL': 'Diesel',
    'Michael Kors': 'Michael Kors',
    'MICHAEL KORS': 'Michael Kors',
    'Burberry': 'Burberry',
    'BURBERRY': 'Burberry',
    'Seiko': 'Seiko',
    'SEIKO': 'Seiko'
  };

  return brandMappings[brand] || brand;
} 