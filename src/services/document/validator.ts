import { SupportedFileType, DEFAULT_MAX_FILE_SIZE, SUPPORTED_FILE_TYPES } from './config';
import { ValidationError } from './errors';
import { toast } from 'react-hot-toast';

export function validateFile(file: File): void {
  try {
    // Check if file exists
    if (!file) {
      throw new ValidationError('No file provided');
    }

    // Check file size
    if (file.size > DEFAULT_MAX_FILE_SIZE) {
      throw new ValidationError(`File size exceeds ${DEFAULT_MAX_FILE_SIZE / (1024 * 1024)}MB limit`);
    }

    // Check if file is empty
    if (file.size === 0) {
      throw new ValidationError('File is empty');
    }

    // Get supported file types
    const supportedTypes = Object.keys(SUPPORTED_FILE_TYPES);
    
    // Validate file type
    if (!supportedTypes.includes(file.type)) {
      const supportedFormats = Object.values(SUPPORTED_FILE_TYPES)
        .flat()
        .map(ext => ext.replace('.', ''))
        .join(', ');
      throw new ValidationError(
        `Unsupported file type: ${file.type}. Supported formats: ${supportedFormats}`
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'File validation failed';
    toast.error(errorMessage);
    throw error;
  }
}