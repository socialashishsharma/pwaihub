import { ProcessedDocument } from '../types';
import { DocumentProcessingError } from '../errors';

export async function processPowerPoint(file: File): Promise<ProcessedDocument> {
  try {
    // For now, we'll throw an error since PowerPoint processing requires additional libraries
    throw new DocumentProcessingError('PowerPoint processing is not yet implemented');
    
  } catch (error) {
    throw new DocumentProcessingError(
      error instanceof Error ? error.message : 'Failed to process PowerPoint document'
    );
  }
}