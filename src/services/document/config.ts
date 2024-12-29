import { SupportedFileType } from './types';

export const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ALL_SUPPORTED_TYPES: SupportedFileType[] = [
  'application/pdf',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'image/png',
  'image/jpeg',
  'image/webp'
];

export const FILE_TYPE_EXTENSIONS = {
  'application/pdf': '.pdf',
  'text/plain': '.txt',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/msword': '.doc',
  'application/vnd.ms-powerpoint': '.ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
  'image/png': '.png',
  'image/jpeg': '.jpg,.jpeg',
  'image/webp': '.webp'
};