import Tesseract from 'tesseract.js';
import { DocumentProcessingError } from '../documentProcessor';

export async function processImage(file: File): Promise<string> {
  try {
    const result = await performOCR(file);
    
    if (!result.trim()) {
      throw new DocumentProcessingError('No text content found in image');
    }
    
    return result;
  } catch (error) {
    throw new DocumentProcessingError(
      `Failed to process image: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

async function performOCR(file: File): Promise<string> {
  const { data: { text } } = await Tesseract.recognize(
    file,
    'eng',
    {
      logger: () => {}, // Disable logging
      // Use CDN-hosted worker and core files
      workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@5.0.4/dist/worker.min.js',
      corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@4.0.4/tesseract-core.wasm.js',
      // Improved OCR settings
      tessedit_ocr_engine_mode: Tesseract.PSM.AUTO,
      tessedit_pageseg_mode: Tesseract.PSM.AUTO,
    }
  );
  return text;
}