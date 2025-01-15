import { FlashcardGenerationError } from './errors';

export function validateContent(content: string): void {
  if (!content?.trim()) {
    throw new FlashcardGenerationError('Content is required for flashcard generation');
  }

  if (content.length < 50) {
    throw new FlashcardGenerationError('Content is too short for meaningful flashcard generation');
  }
}

export function validateNumCards(numCards: number | undefined): void {
  if (numCards !== undefined) {
    if (numCards < 1) {
      throw new FlashcardGenerationError('Number of cards must be at least 1');
    }
    if (numCards > 50) {
      throw new FlashcardGenerationError('Maximum number of cards is 50');
    }
  }
}