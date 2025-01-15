import mammoth from 'mammoth';
import { ProcessedDocument } from '../types';
import { DocumentProcessingError } from '../errors';
import { toast } from 'react-hot-toast';

export async function processWord(file: File): Promise<ProcessedDocument> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    
    const content = result.value.trim();
    
    if (!content) {
      throw new DocumentProcessingError('No text content found in Word document');
    }

    return {
      content,
      metadata: {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      }
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to process Word document';
    toast.error(errorMessage);
    throw new DocumentProcessingError(errorMessage);
  }
}