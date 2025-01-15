import { processPDF } from './pdf';
import { processWord } from './office';
import { processImage } from './image';
import { processPowerPoint } from './powerpoint';
import { ProcessedDocument, SupportedFileType } from '../types';
import { ProcessorError } from '../errors';

type ProcessorMap = {
  [K in SupportedFileType]?: (file: File) => Promise<ProcessedDocument>;
};

const processors: ProcessorMap = {
  'application/pdf': processPDF,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': processWord,
  'application/msword': processWord,
  'application/vnd.ms-powerpoint': processPowerPoint,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': processPowerPoint,
  'image/png': processImage,
  'image/jpeg': processImage,
  'image/webp': processImage,
  'text/plain': async (file: File) => ({
    content: await file.text(),
    metadata: {
      fileName: file.name,
      fileType: file.type as SupportedFileType,
      fileSize: file.size
    }
  })
};

export async function processFile(file: File): Promise<ProcessedDocument> {
  const processor = processors[file.type as SupportedFileType];
  
  if (!processor) {
    throw new ProcessorError(`No processor available for file type: ${file.type}`);
  }

  return processor(file);
}