import { ProcessingOptions, SupportedFileType } from './types';
import { ValidationError } from './errors';
import { DEFAULT_MAX_FILE_SIZE, ALL_SUPPORTED_TYPES } from './config';

export function validateFile(
  file: File,
  options: ProcessingOptions = {}
): void {
  const {
    maxFileSize = DEFAULT_MAX_FILE_SIZE,
    allowedTypes = ALL_SUPPORTED_TYPES
  } = options;

  // Check if file exists
  if (!file) {
    throw new ValidationError('No file provided');
  }

  // Check file size
  if (file.size > maxFileSize) {
    throw new ValidationError(`File size exceeds ${maxFileSize / (1024 * 1024)}MB limit`);
  }

  // Check if file is empty
  if (file.size === 0) {
    throw new ValidationError('File is empty');
  }

  // Validate file type
  if (!allowedTypes.includes(file.type as SupportedFileType)) {
    throw new ValidationError(
      `Unsupported file type: ${file.type}. Supported formats: ${
        allowedTypes.map(type => type.split('/')[1]).join(', ')
      }`
    );
  }
}