import { Flashcard } from '../../types/flashcard';
import { FlashcardGenerationError } from './errors';

export function parseFlashcardResponse(response: string): Flashcard[] {
  try {
    // Find JSON content in the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new FlashcardGenerationError('Invalid response format: No JSON found');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    if (!Array.isArray(parsed.flashcards)) {
      throw new FlashcardGenerationError('Invalid response format: Missing flashcards array');
    }

    if (parsed.flashcards.length === 0) {
      throw new FlashcardGenerationError('No flashcards were generated');
    }

    return parsed.flashcards.map((card: any, index: number) => {
      if (!card.front?.trim() || !card.back?.trim()) {
        throw new FlashcardGenerationError(
          `Invalid flashcard at index ${index}: Missing front or back content`
        );
      }

      return {
        id: crypto.randomUUID(),
        front: sanitizeContent(card.front),
        back: sanitizeContent(card.back),
        order: index
      };
    });
  } catch (error) {
    if (error instanceof FlashcardGenerationError) {
      throw error;
    }
    throw new FlashcardGenerationError(
      `Failed to parse flashcard response: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

function sanitizeContent(content: string): string {
  return content
    .trim()
    .replace(/\\n/g, '\n')
    .replace(/\s+/g, ' ');
}