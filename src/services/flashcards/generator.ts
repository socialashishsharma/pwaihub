import { aiService } from '../ai';
import { Flashcard } from '../../types/flashcard';

export class FlashcardGenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FlashcardGenerationError';
  }
}

export async function generateFlashcards(
  content: string,
  numCards?: number
): Promise<Flashcard[]> {
  if (!content.trim()) {
    throw new FlashcardGenerationError('Content is required');
  }

  try {
    const response = await aiService.generateFlashcards({
      content: content.trim(),
      numCards: numCards && numCards > 0 ? numCards : undefined
    });

    const flashcards = parseFlashcardResponse(response.text);
    
    if (flashcards.length === 0) {
      throw new FlashcardGenerationError('No valid flashcards were generated');
    }

    return flashcards;
  } catch (error) {
    console.error('Flashcard generation error:', error);
    throw new FlashcardGenerationError(
      error instanceof Error ? error.message : 'Failed to generate flashcards'
    );
  }
}

function parseFlashcardResponse(response: string): Flashcard[] {
  try {
    // Find JSON content in the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format: No JSON found');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    if (!Array.isArray(parsed.flashcards)) {
      throw new Error('Invalid response format: Missing flashcards array');
    }

    return parsed.flashcards.map((card: any, index: number) => {
      if (!card.front || !card.back) {
        throw new Error(`Invalid flashcard format at index ${index}`);
      }

      return {
        id: crypto.randomUUID(),
        front: sanitizeContent(card.front),
        back: sanitizeContent(card.back),
        order: index
      };
    });
  } catch (error) {
    throw new Error(
      `Failed to parse flashcard response: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

function sanitizeContent(content: string): string {
  return content
    .trim()
    .replace(/\\n/g, '\n')
    .replace(/\s+/g, ' ');
}