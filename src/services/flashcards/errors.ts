export class FlashcardGenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FlashcardGenerationError';
  }
}