import { DocumentProcessingError } from '../documentProcessor';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const SUPPORTED_TYPES = [
  'text/plain',
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp'
];

export async function validateFile(file: File): Promise<void> {
  // Check if file exists
  if (!file) {
    throw new DocumentProcessingError('No file provided');
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new DocumentProcessingError('File size exceeds 10MB limit');
  }

  // Validate file type
  if (!SUPPORTED_TYPES.includes(file.type)) {
    throw new DocumentProcessingError(
      `Unsupported file type: ${file.type}. Supported formats: PDF, PNG, JPEG, and TXT`
    );
  }

  // Validate file is not empty
  if (file.size === 0) {
    throw new DocumentProcessingError('File is empty');
  }
}