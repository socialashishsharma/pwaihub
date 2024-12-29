import { generateEmbeddings } from './ai';
import { v4 as uuidv4 } from 'uuid';
import { Document } from '../types';
import { processPDF } from './processors/pdf';
import { processImage } from './processors/imageProcessor';
import { validateFile } from './validators/fileValidator';

export class DocumentProcessingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DocumentProcessingError';
  }
}

export const processDocument = async (file: File): Promise<Document> => {
  try {
    // Validate file
    await validateFile(file);

    // Extract text based on file type
    const text = await extractText(file);
    
    // Create document and generate embeddings in parallel
    const [document, embeddings] = await Promise.all([
      createDocument(file.name, text),
      generateEmbeddings(text).catch(error => {
        console.warn('Failed to generate embeddings:', error);
        return undefined;
      })
    ]);

    if (embeddings) {
      document.embeddings = embeddings;
    }

    return document;
  } catch (error) {
    if (error instanceof DocumentProcessingError) {
      throw error;
    }
    throw new DocumentProcessingError(
      `Failed to process document: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
};

async function extractText(file: File): Promise<string> {
  try {
    let text: string;
    
    switch (file.type) {
      case 'text/plain':
        text = await file.text();
        break;
      case 'application/pdf':
        text = await processPDF(file);
        break;
      case 'image/png':
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/webp':
        text = await processImage(file);
        break;
      default:
        throw new DocumentProcessingError(
          `Unsupported file type: ${file.type}. Supported formats: PDF, PNG, JPEG, and TXT`
        );
    }

    if (!text?.trim()) {
      throw new DocumentProcessingError('No text content found in document');
    }

    return text;
  } catch (error) {
    if (error instanceof DocumentProcessingError) {
      throw error;
    }
    throw new DocumentProcessingError(
      `Failed to extract text: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

async function createDocument(
  fileName: string, 
  content: string,
): Promise<Document> {
  return {
    id: uuidv4(),
    title: fileName,
    content,
    userId: 'user123', // TODO: Replace with actual user ID when auth is implemented
    createdAt: new Date().toISOString(),
  };
}