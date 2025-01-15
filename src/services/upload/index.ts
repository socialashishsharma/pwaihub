import { processDocument } from '../document/processor';
import { DocumentProcessingError } from '../document/errors';
import { ProcessedDocument } from '../document/types';
import { toast } from 'react-hot-toast';

interface UploadOptions {
  onProgress?: (progress: number) => void;
  onSuccess?: (result: ProcessedDocument) => void;
  onError?: (error: Error) => void;
}

export async function uploadFile(
  file: File,
  options: UploadOptions = {}
): Promise<ProcessedDocument> {
  const { onProgress, onSuccess, onError } = options;

  try {
    // Start progress
    onProgress?.(0);

    // Process the document
    const result = await processDocument(file);

    // Complete progress
    onProgress?.(100);

    // Call success callback
    onSuccess?.(result);

    return result;
  } catch (error) {
    // Handle errors
    const errorMessage = error instanceof DocumentProcessingError
      ? error.message
      : 'Failed to process document';

    // Call error callback
    onError?.(error instanceof Error ? error : new Error(errorMessage));
    
    // Show error toast
    toast.error(errorMessage);

    throw error;
  }
}

// Export types
export type { UploadOptions };
export { DocumentProcessingError };