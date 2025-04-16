import { parse, unparse } from 'papaparse';
import { readFileSync, writeFileSync } from 'fs';

interface WatchModel {
  model_number: string;
  image_url?: string;
  [key: string]: any;
}

interface ParsedData<T> {
  data: T[];
  errors: any[];
  meta: any;
}

export async function mergeImageLinks(
  sourceFilePath: string,
  targetFilePath: string,
  outputFilePath: string
): Promise<void> {
  try {
    // Read and parse both CSV files
    const sourceCsv = readFileSync(sourceFilePath, 'utf-8');
    const targetCsv = readFileSync(targetFilePath, 'utf-8');

    const sourceData = parse<WatchModel>(sourceCsv, {
      header: true,
      skipEmptyLines: true
    }) as ParsedData<WatchModel>;

    const targetData = parse<WatchModel>(targetCsv, {
      header: true,
      skipEmptyLines: true
    }) as ParsedData<WatchModel>;

    // Create a map of model numbers to image links from source
    const imageMap = new Map<string, string>();
    sourceData.data.forEach((row: WatchModel) => {
      if (row.model_number && row.image_url) {
        imageMap.set(row.model_number, row.image_url);
      }
    });

    // Update target data with image links
    const updatedData = targetData.data.map((row: WatchModel) => {
      const imageLink = imageMap.get(row.model_number);
      if (imageLink) {
        return { ...row, image_url: imageLink };
      }
      return row;
    });

    // Convert back to CSV and save
    const updatedCsv = unparse(updatedData, {
      header: true
    });

    writeFileSync(outputFilePath, updatedCsv, 'utf-8');

    console.log(`Successfully merged image links. Updated file saved to: ${outputFilePath}`);
  } catch (error) {
    console.error('Error merging image links:', error);
    throw error;
  }
} 