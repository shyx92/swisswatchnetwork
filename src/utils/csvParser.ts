import { WatchModel } from '@/types';

// Image URL patterns for different brands
const brandImagePatterns: { [key: string]: (model: string) => string[] } = {
  'Armani': (model: string) => [
    `https://www.emporioarmani.com/img/products/${model}_01_detail.jpg`,
    `https://www.armani.com/variants/images/17411127376456215/F/w400.jpg`,
    `https://www.armani.com/variants/images/17411127376456215/${model}/w400.jpg`
  ],
  'Hugo Boss': (model: string) => [
    `https://images.hugoboss.com/is/image/boss/${model}`,
    `https://www.hugoboss.com/images/products/${model.toLowerCase()}_01.jpg`
  ],
  'Diesel': (model: string) => [
    `https://www.diesel.com/dw/image/v2/BBLG_PRD/on/demandware.static/-/Sites-diesel-master-catalog/default/${model}.jpg`,
    `https://diesel.scene7.com/is/image/Diesel/${model}_01?wid=400`
  ],
  'Michael Kors': (model: string) => [
    `https://michaelkors.scene7.com/is/image/MichaelKors/${model}_1?wid=400`,
    `https://www.michaelkors.com/img/products/${model}_01.jpg`
  ],
  'Seiko': (model: string) => [
    `https://www.seikowatches.com/image/products/${model}`,
    `https://www.seikowatches.com/global-en/products/image/${model}.jpg`
  ]
};

// Function to generate fallback image URL
function generateFallbackImageUrl(brand: string, model: string): string {
  const brandId = brand.toLowerCase().replace(' ', '-');
  return `/images/watches/${brandId}/${model.toLowerCase()}.jpg`;
}

// Function to check if an image URL is valid
async function isImageUrlValid(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    return response.ok && !!contentType && contentType.startsWith('image/');
  } catch {
    return false;
  }
}

// Function to find the first valid image URL from a list of possibilities
async function findValidImageUrl(urls: string[]): Promise<string | null> {
  for (const url of urls) {
    if (await isImageUrlValid(url)) {
      return url;
    }
  }
  return null;
}

// Function to get image URL for a watch
async function getWatchImageUrl(brand: string, modelNumber: string): Promise<string> {
  // Try brand-specific patterns first
  const patterns = brandImagePatterns[brand];
  if (patterns) {
    const possibleUrls = patterns(modelNumber);
    const validUrl = await findValidImageUrl(possibleUrls);
    if (validUrl) {
      return validUrl;
    }
  }

  // Fallback to local image path
  return generateFallbackImageUrl(brand, modelNumber);
}

// Function to convert USD to GBP
async function convertUSDToGBP(usdPrice: number): Promise<number> {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    const gbpRate = data.rates.GBP;
    return Math.round(usdPrice * gbpRate);
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    // Fallback to a static rate if API fails
    return Math.round(usdPrice * 0.79);
  }
}

// Function to calculate final price with 20% markup
function calculateFinalPrice(supplierPrice: number): number {
  return Math.round(supplierPrice * 1.20);
}

export async function parseCSVToWatchModels(csvData: string): Promise<WatchModel[]> {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
  
  const models: WatchModel[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = line.split(',').map((value: string) => value.trim());
    const brand = values[headers.indexOf('brand')];
    const modelNumber = values[headers.indexOf('model_number')];
    const priceStr = values[headers.indexOf('price')].replace(/[^0-9.]/g, '');
    const supplierPrice = Math.round(parseFloat(priceStr));
    const imageUrl = values[headers.indexOf('image_url')] || '/images/placeholder-watch.svg';
    
    if (isNaN(supplierPrice)) {
      console.error('Invalid price value:', values[headers.indexOf('price')]);
      continue;
    }
    
    const finalPrice = calculateFinalPrice(supplierPrice);
    const gbpPrice = await convertUSDToGBP(finalPrice);
    
    const model: WatchModel = {
      id: `model-${i}`,
      brand,
      modelNumber,
      price: gbpPrice,
      supplierPrice,
      finalPrice,
      image: imageUrl
    };
    models.push(model);
  }
  
  return models;
}

export function generateCSVTemplate(): string {
  return `brand,model_number,price,image_url
Armani,AR0143,249.99,https://example.com/watch-image.jpg
Hugo Boss,HB1513862,299.99,
Diesel,DZ4318,199.99,https://example.com/watch-image.jpg
Michael Kors,MK8281,279.99,
Seiko,SNK809,129.99,https://example.com/watch-image.jpg`;
} 