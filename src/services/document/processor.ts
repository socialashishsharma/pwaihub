import { ProcessedDocument, ProcessingOptions } from './types';
import { validateFile } from './validator';
import { processPDF } from './processors/pdf';
import { processWord } from './processors/office';
import { processImage } from './processors/image';
import { DocumentProcessingError } from './errors';
import { toast } from 'react-hot-toast';

export async function processDocument(
  file: File,
  options?: ProcessingOptions
): Promise<ProcessedDocument> {
  try {
    // Validate file first
    validateFile(file);

    // Process based on file type
    let result: ProcessedDocument;

    switch (file.type) {
      case 'application/pdf':
        result = await processPDF(file);
        break;

      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/msword':
        result = await processWord(file);
        break;

      case 'image/png':
      case 'image/jpeg':
      case 'image/webp':
        result = await processImage(file);
        break;

      case 'text/plain':
        result = {
          content: await file.text(),
          metadata: {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size
          }
        };
        break;

      default:
        throw new DocumentProcessingError(`Unsupported file type: ${file.type}`);
    }

    // Validate result
    if (!result.content.trim()) {
      throw new DocumentProcessingError('No text content found in document');
    }

    return result;
  } catch (error) {
    // Show error toast
    toast.error(
      error instanceof Error 
        ? error.message 
        : 'Failed to process document'
    );
    
    throw error;
  }
}