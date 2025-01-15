export type SupportedFileType = 
  | 'application/pdf'
  | 'text/plain'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/msword'
  | 'application/vnd.ms-powerpoint'
  | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  | 'image/png'
  | 'image/jpeg'
  | 'image/webp';

export interface ProcessedDocument {
  content: string;
  metadata: {
    fileName: string;
    fileType: SupportedFileType;
    fileSize: number;
    pageCount?: number;
  };
}

export interface ProcessingOptions {
  maxFileSize?: number;
  allowedTypes?: SupportedFileType[];
  onProgress?: (progress: number) => void;
}