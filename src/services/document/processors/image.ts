import Tesseract from 'tesseract.js';
import { ProcessedDocument } from '../types';
import { DocumentProcessingError } from '../errors';
import { TextSanitizer } from '../../text/sanitizer';
import { toast } from 'react-hot-toast';

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

    // Sanitize the extracted text
    const sanitizedText = TextSanitizer.sanitize(text);
    
    // Validate the sanitized text
    const validationError = TextSanitizer.validateText(sanitizedText);
    if (validationError) {
      throw new DocumentProcessingError(validationError);
    }
    
    return {
      content: sanitizedText,
      metadata: {
        fileName: file.name,
        fileType: file.type as any,
        fileSize: file.size
      }
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to process image';
    toast.error(errorMessage);
    throw new DocumentProcessingError(errorMessage);
  }
}