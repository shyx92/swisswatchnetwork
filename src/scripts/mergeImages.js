const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

// Function to merge image links from source CSV to target CSV
function mergeImageLinks(sourcePath, targetPath) {
    try {
        // Read and parse source file (Brand file with images)
        const sourceContent = fs.readFileSync(sourcePath, 'utf8');
        const sourceData = Papa.parse(sourceContent, {
            header: true,
            skipEmptyLines: true
        }).data;

        // Read and parse target file (Price file)
        const targetContent = fs.readFileSync(targetPath, 'utf8');
        const targetData = Papa.parse(targetContent, {
            header: true,
            skipEmptyLines: true
        }).data;

        // Log column names and sample data for debugging
        console.log('Source file columns:', Object.keys(sourceData[0] || {}));
        console.log('Target file columns:', Object.keys(targetData[0] || {}));
        
        // Log first few rows of source data
        console.log('\nFirst 5 rows of source data:');
        sourceData.slice(0, 5).forEach((row, index) => {
            console.log(`Row ${index + 1}:`, row);
        });

        // Log first few rows of target data
        console.log('\nFirst 5 rows of target data:');
        targetData.slice(0, 5).forEach((row, index) => {
            console.log(`Row ${index + 1}:`, row);
        });

        // Create a map of model numbers to their first image URL
        const modelToImage = new Map();
        let processedModels = new Set();

        sourceData.forEach(row => {
            const modelNumber = row.model_number?.trim();
            const imageUrl = row.image_url?.trim();
            
            // Only process if we have both a model number and image URL
            if (modelNumber && imageUrl && !processedModels.has(modelNumber)) {
                modelToImage.set(modelNumber, imageUrl);
                processedModels.add(modelNumber);
            }
        });

        // Log the number of unique models found and sample matches
        console.log(`\nFound ${modelToImage.size} unique models with images`);
        console.log('Sample of first 5 model numbers and their images:');
        let count = 0;
        modelToImage.forEach((image, model) => {
            if (count < 5) {
                console.log(`Model: ${model}, Image: ${image}`);
                count++;
            }
        });

        // Update target data with image URLs
        let updatedCount = 0;
        let unmatchedCount = 0;
        let unmatchedModels = new Set();
        
        targetData.forEach(row => {
            const modelNumber = row.model_number?.trim();
            if (modelNumber) {
                if (modelToImage.has(modelNumber)) {
                    row.image_url = modelToImage.get(modelNumber);
                    updatedCount++;
                } else {
                    unmatchedCount++;
                    if (unmatchedModels.size < 5) {
                        unmatchedModels.add(modelNumber);
                    }
                }
            }
        });

        console.log(`\nUpdated ${updatedCount} rows out of ${targetData.length} target rows`);
        console.log(`Unmatched models: ${unmatchedCount}`);
        console.log('Sample of unmatched model numbers:', Array.from(unmatchedModels));

        // Convert back to CSV and save to the original Price File
        const csv = Papa.unparse(targetData);
        fs.writeFileSync(targetPath, csv);
        console.log(`\nUpdated Price File (USD).csv with new image URLs`);

    } catch (error) {
        console.error('Error merging image links:', error);
        process.exit(1);
    }
}

// Command line interface
if (require.main === module) {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.error('Usage: node mergeImages.js <brand-csv-path> <price-file-path>');
        console.error('Example: node mergeImages.js armani.csv "Price File (USD).csv"');
        process.exit(1);
    }

    const [sourcePath, targetPath] = args;
    mergeImageLinks(sourcePath, targetPath);
} 