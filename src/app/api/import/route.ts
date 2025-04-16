import { NextResponse } from 'next/server';
import { parse, ParseError } from 'papaparse';
import clientPromise from '@/lib/mongodb';

interface WatchRow {
  model_number: string;
  brand: string;
  price: string;
  image_url?: string;
  name?: string;
  description?: string;
  specifications?: string;
}

interface ProcessingError {
  row?: number;
  message: string;
}

export async function POST(request: Request) {
  try {
    // Basic response helper
    const sendResponse = (data: any, status: number = 200) => {
      return new Response(JSON.stringify(data), {
        status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return sendResponse({ error: 'No file uploaded' }, 400);
    }

    let text;
    try {
      text = await file.text();
    } catch (error) {
      console.error('Error reading file:', error);
      return sendResponse({ error: 'Failed to read file' }, 400);
    }

    if (!text.trim()) {
      return sendResponse({ error: 'File is empty' }, 400);
    }

    let parseResult;
    try {
      parseResult = parse<WatchRow>(text, {
        header: true,
        skipEmptyLines: true,
      });
    } catch (error) {
      console.error('Error parsing CSV:', error);
      return sendResponse({ error: 'Failed to parse CSV file' }, 400);
    }

    const { data, errors: parseErrors, meta } = parseResult;

    // Log parsing results
    console.log('Parse results:', {
      dataLength: data?.length,
      errorCount: parseErrors?.length,
      headers: meta?.fields,
      sampleRow: data?.[0]
    });

    if (parseErrors && parseErrors.length > 0) {
      return sendResponse({
        error: 'CSV parsing errors',
        details: parseErrors
      }, 400);
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      return sendResponse({ error: 'No valid data found in CSV file' }, 400);
    }

    // Validate required columns
    const requiredColumns = ['model_number', 'brand', 'price'];
    const missingColumns = requiredColumns.filter(col => !meta.fields?.includes(col));
    
    if (missingColumns.length > 0) {
      return sendResponse({
        error: 'Missing required columns',
        details: missingColumns
      }, 400);
    }

    // Connect to MongoDB
    let client;
    try {
      client = await clientPromise;
    } catch (error) {
      console.error('MongoDB connection error:', error);
      return sendResponse({ error: 'Database connection failed' }, 500);
    }

    const db = client.db('watchlyx');
    const collection = db.collection('watches');

    // Process the data
    const watches = [];
    const processingErrors: ProcessingError[] = [];
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      try {
        // Skip empty rows
        if (!row.model_number && !row.brand && !row.price) {
          continue;
        }

        // Validate required fields
        if (!row.model_number || !row.brand || !row.price) {
          processingErrors.push({
            row: i + 1,
            message: 'Missing required fields'
          });
          continue;
        }

        // Parse numeric values
        const supplierPrice = parseFloat(row.price.toString().replace(/[^0-9.-]+/g, ''));
        if (isNaN(supplierPrice)) {
          processingErrors.push({
            row: i + 1,
            message: 'Invalid price format'
          });
          continue;
        }

        watches.push({
          modelNumber: row.model_number.trim(),
          brand: row.brand.trim(),
          name: row.name?.trim() || row.model_number.trim(),
          description: row.description?.trim() || '',
          specifications: row.specifications?.trim() || '',
          supplierPrice,
          finalPrice: Math.round(supplierPrice * 1.2),
          imageUrl: row.image_url?.trim() || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } catch (error) {
        console.error(`Error processing row ${i + 1}:`, error);
        processingErrors.push({
          row: i + 1,
          message: error instanceof Error ? error.message : 'Unknown error processing row'
        });
        continue;
      }
    }

    if (watches.length === 0) {
      return sendResponse({ 
        error: 'No valid watches found in file',
        details: processingErrors
      }, 400);
    }

    // Insert the data
    try {
      // Use updateMany with upsert to handle duplicates
      const operations = watches.map(watch => ({
        updateOne: {
          filter: { modelNumber: watch.modelNumber },
          update: { $set: watch },
          upsert: true
        }
      }));

      const result = await collection.bulkWrite(operations);

      return sendResponse({
        success: true,
        message: 'File processed successfully',
        totalRows: data.length,
        processedRows: watches.length,
        insertedCount: result.upsertedCount,
        updatedCount: result.modifiedCount,
        errors: processingErrors.map(err => `Row ${err.row}: ${err.message}`)
      });
    } catch (error) {
      console.error('MongoDB operation error:', error);
      return sendResponse({ 
        error: 'Failed to save watches to database',
        details: error instanceof Error ? error.message : 'Unknown database error'
      }, 500);
    }

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'An unexpected error occurred',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
} 