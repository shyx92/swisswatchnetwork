import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('watchlyx');
    
    // Get the brand parameter from query string
    const { brand } = req.query;
    
    if (brand) {
      // If brand is specified, return models for that brand
      const brandData = await db.collection('watches')
        .find({ brand: brand.toString().toLowerCase() })
        .toArray();
      
      if (!brandData.length) {
        return res.status(404).json({ message: 'Brand not found' });
      }
      
      return res.status(200).json(brandData);
    }
    
    // If no brand specified, return all unique brands with their details
    const brands = await db.collection('watches')
      .aggregate([
        {
          $group: {
            _id: '$brand',
            name: { $first: '$brandName' },
            description: { $first: '$brandDescription' },
            logo: { $first: '$brandLogo' },
            modelCount: { $sum: 1 }
          }
        },
        {
          $project: {
            id: '$_id',
            name: 1,
            description: 1,
            logo: 1,
            modelCount: 1,
            _id: 0
          }
        }
      ])
      .toArray();

    res.status(200).json(brands);
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
 