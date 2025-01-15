import { useState } from 'react';
import { processFile } from '../services/document/processors';
import { ProcessedDocument } from '../services/document/types';
import { DocumentProcessingError } from '../services/document/errors';
import { toast } from 'react-hot-toast';

interface UseFileProcessorOptions {
  onSuccess?: (result: ProcessedDocument) => void;
  onError?: (error: Error) => void;
}

export function useFileProcessor(options: UseFileProcessorOptions = {}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const processDocument = async (file: File): Promise<ProcessedDocument | null> => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      // Process the file
      const result = await processFile(file);
      
      // Update progress
      setProgress(100);
      
      // Call success callback
      options.onSuccess?.(result);
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process file';
      
      // Set error state
      setError(error instanceof Error ? error : new Error(errorMessage));
      
      // Show error toast
      toast.error(errorMessage);
      
      // Call error callback
      options.onError?.(error instanceof Error ? error : new Error(errorMessage));
      
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processDocument,
    isProcessing,
    progress,
    error,
    reset: () => {
      setIsProcessing(false);
      setProgress(0);
      setError(null);
    }
  };
}

export type { UseFileProcessorOptions };
export { DocumentProcessingError };