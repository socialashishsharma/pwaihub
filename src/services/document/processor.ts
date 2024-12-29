import { ProcessedDocument, ProcessingOptions, SupportedFileType } from './types';
import { validateFile } from './validator';
import { processPDF } from './processors/pdf';
import { processWord } from './processors/office';
import { processImage } from './processors/image';
import { DocumentProcessingError } from './errors';

export async function processDocument(
  file: File,
  options?: ProcessingOptions
): Promise<ProcessedDocument> {
  try {
    // Validate file first
    validateFile(file, options);

    // Process based on file type
    const fileType = file.type as SupportedFileType;
    let result: ProcessedDocument;

    switch (fileType) {
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
            fileType: fileType,
            fileSize: file.size
          }
        };
        break;

      default:
        throw new DocumentProcessingError(`Unsupported file type: ${fileType}`);
    }

    // Validate result
    if (!result.content.trim()) {
      throw new DocumentProcessingError('No text content found in document');
    }

    return result;
  } catch (error) {
    if (error instanceof DocumentProcessingError) {
      throw error;
    }
    throw new DocumentProcessingError(
      `Failed to process document: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}