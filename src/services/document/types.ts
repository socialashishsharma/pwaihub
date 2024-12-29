export type SupportedFileType = 
  | 'application/pdf'
  | 'text/plain'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // docx
  | 'application/msword' // doc
  | 'application/vnd.ms-powerpoint' // ppt
  | 'application/vnd.openxmlformats-officedocument.presentationml.presentation' // pptx
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
  maxFileSize?: number; // in bytes
  allowedTypes?: SupportedFileType[];
}