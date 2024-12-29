import { initializeWorker } from './worker';
import { extractPDFText } from './extractor';
import { DocumentProcessingError } from '../documentProcessor';

let isInitialized = false;

export async function processPDF(file: File): Promise<string> {
  try {
    if (!isInitialized) {
      await initializeWorker();
      isInitialized = true;
    }

    const text = await extractPDFText(file);
    
    if (!text.trim()) {
      throw new DocumentProcessingError('No text content found in PDF');
    }
    
    return text;
  } catch (error) {
    if (error instanceof DocumentProcessingError) {
      throw error;
    }
    throw new DocumentProcessingError(
      `Failed to process PDF: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}