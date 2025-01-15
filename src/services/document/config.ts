export const DEFAULT_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const SUPPORTED_FILE_TYPES = {
  'application/pdf': '.pdf',
  'text/plain': '.txt',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/msword': '.doc',
  'application/vnd.ms-powerpoint': '.ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
  'image/png': '.png',
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/webp': '.webp'
} as const;

export type SupportedFileType = keyof typeof SUPPORTED_FILE_TYPES;

export function getAcceptedFileTypes(): Record<string, string[]> {
  return Object.entries(SUPPORTED_FILE_TYPES).reduce((acc, [type, extensions]) => {
    acc[type] = Array.isArray(extensions) ? extensions : [extensions];
    return acc;
  }, {} as Record<string, string[]>);
}