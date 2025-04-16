const { MongoClient } = require('mongodb');

// Cache client connection
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  cachedClient = client;
  return client;
}

// Predefined brand descriptions
function getBrandDescription(brand) {
  const descriptions = {
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
function normalizeBrandName(brand) {
  const brandMappings = {
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

exports.handler = async function(event, context) {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const client = await connectToDatabase();
    const db = client.db('watchlyx');
    const collection = db.collection('watches');

    // Fetch all watches from MongoDB
    const watches = await collection.find({}).toArray();

    // Group watches by brand
    const brandMap = watches.reduce((acc, watch) => {
      const normalizedBrand = normalizeBrandName(watch.brand);
      
      if (!acc[normalizedBrand]) {
        acc[normalizedBrand] = {
          id: normalizedBrand.toLowerCase().replace(/\s+/g, '-'),
          name: normalizedBrand,
          description: getBrandDescription(normalizedBrand),
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
        gbpPrice: Math.round(watch.finalPrice * 0.79),
        minOrder: 1,
        image: watch.imageUrl || '/images/placeholder-watch.svg'
      });

      return acc;
    }, {});

    // Convert the map to an array
    const brands = Object.values(brandMap);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        // Add CORS headers
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET'
      },
      body: JSON.stringify(brands)
    };
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch pricing data' })
    };
  }
}; 