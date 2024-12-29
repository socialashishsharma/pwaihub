import { initializeWorker } from './worker';
import { extractText } from './extractor';
import { DocumentProcessingError } from '../../documentProcessor';

let isWorkerInitialized = false;

export async function processPDF(file: File): Promise<string> {
  try {
    if (!isWorkerInitialized) {
      await initializeWorker();
      isWorkerInitialized = true;
    }

    const text = await extractText(file);
    
    if (!text.trim()) {
      throw new DocumentProcessingError('No text content found in PDF');
    }
    
    return text;
  } catch (error) {
    if (error instanceof DocumentProcessingError) {
      throw error;
    }
    throw new DocumentProcessingError(
      `Failed to process PDF: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}