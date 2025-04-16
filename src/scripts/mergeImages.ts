import { mergeImageLinks } from '../utils/spreadsheetMerger';

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length !== 3) {
    console.error('Usage: npm run merge-images <source-file.csv> <target-file.csv> <output-file.csv>');
    process.exit(1);
  }

  const [sourceFile, targetFile, outputFile] = args;

  try {
    await mergeImageLinks(sourceFile, targetFile, outputFile);
    console.log('Merge completed successfully!');
  } catch (error) {
    console.error('Error during merge:', error);
    process.exit(1);
  }
}

main(); 