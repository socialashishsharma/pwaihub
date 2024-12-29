import Tesseract from 'tesseract.js';
import { ProcessedDocument } from '../types';
import { DocumentProcessingError } from '../errors';

export async function processImage(file: File): Promise<ProcessedDocument> {
  try {
    const { data: { text } } = await Tesseract.recognize(
      file,
      'eng',
      {
        logger: () => {}, // Disable logging
        workerPath: 'https://cdn.jsdelivr.net/npm/tesseract.js@5.0.4/dist/worker.min.js',
        corePath: 'https://cdn.jsdelivr.net/npm/tesseract.js-core@4.0.4/tesseract-core.wasm.js',
        tessedit_ocr_engine_mode: Tesseract.PSM.AUTO,
        tessedit_pageseg_mode: Tesseract.PSM.AUTO,
      }
    );

    const content = text.trim();
    
    if (!content) {
      throw new DocumentProcessingError('No text content found in image');
    }

    return {
      content,
      metadata: {
        fileName: file.name,
        fileType: file.type as any,
        fileSize: file.size
      }
    };
  } catch (error) {
    console.error('Image Processing Error:', error);
    throw new DocumentProcessingError(
      error instanceof Error ? error.message : 'Failed to process image'
    );
  }
}