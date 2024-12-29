export class DocumentProcessingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DocumentProcessingError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}