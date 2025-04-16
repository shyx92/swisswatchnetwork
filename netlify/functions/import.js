const { MongoClient } = require('mongodb');
const { parse } = require('papaparse');

const MONGODB_URI = process.env.MONGODB_URI;

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  try {
    // Parse the multipart form data
    const formData = JSON.parse(event.body);
    const fileContent = formData.fileContent;

    if (!fileContent) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No file content provided' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    // Parse CSV
    const { data, errors, meta } = parse(fileContent, {
      header: true,
      skipEmptyLines: true
    });

    // Log parsing results
    console.log('Parse results:', {
      dataLength: data?.length,
      errorCount: errors?.length,
      headers: meta?.fields,
      sampleRow: data?.[0]
    });

    if (errors && errors.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'CSV parsing errors',
          details: errors
        }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No valid data found in CSV file' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    // Validate required columns
    const requiredColumns = ['model_number', 'brand', 'price'];
    const missingColumns = requiredColumns.filter(col => !meta.fields?.includes(col));
    
    if (missingColumns.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: 'Missing required columns',
          details: missingColumns
        }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    // Connect to MongoDB
    const client = await MongoClient.connect(MONGODB_URI);
    const db = client.db('watchlyx');
    const collection = db.collection('watches');

    // Process the data
    const watches = [];
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      try {
        // Skip empty rows
        if (!row.model_number && !row.brand && !row.price) {
          continue;
        }

        // Validate required fields
        if (!row.model_number || !row.brand || !row.price) {
          console.warn(`Skipping row ${i + 1}: Missing required fields`);
          continue;
        }

        // Parse numeric values
        const supplierPrice = parseFloat(row.price.toString().replace(/[^0-9.-]+/g, ''));
        if (isNaN(supplierPrice)) {
          console.warn(`Skipping row ${i + 1}: Invalid price format`);
          continue;
        }

        watches.push({
          modelNumber: row.model_number.trim(),
          brand: row.brand.trim(),
          supplierPrice,
          finalPrice: Math.round(supplierPrice * 1.2),
          imageUrl: row.image_url?.trim() || null,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } catch (error) {
        console.error(`Error processing row ${i + 1}:`, error);
        continue;
      }
    }

    if (watches.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No valid watches found in file' }),
        headers: { 'Content-Type': 'application/json' }
      };
    }

    // Insert the data
    const result = await collection.insertMany(watches);
    await client.close();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'File processed successfully',
        insertedCount: result.insertedCount,
        totalRows: data.length,
        processedRows: watches.length
      }),
      headers: { 'Content-Type': 'application/json' }
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An unexpected error occurred' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
}; 