import { aiService } from '../ai';
import { Flashcard } from '../../types/flashcard';
import { FlashcardGenerationError } from './errors';
import { parseFlashcardResponse } from './parser';
import { validateContent, validateNumCards } from './validator';
import { createFlashcardPrompt } from './prompt';

export async function generateFlashcards(
  content: string,
  numCards?: number
): Promise<Flashcard[]> {
  try {
    // Validate inputs
    validateContent(content);
    validateNumCards(numCards);

    // Generate flashcards
    const response = await aiService.generateFlashcards({
      content: content.trim(),
      numCards: numCards && numCards > 0 ? numCards : undefined
    });

    if (!response?.text) {
      throw new FlashcardGenerationError('No response received from AI service');
    }

    // Parse and validate response
    const flashcards = parseFlashcardResponse(response.text);
    
    if (flashcards.length === 0) {
      throw new FlashcardGenerationError('No valid flashcards were generated');
    }

    return flashcards;
  } catch (error) {
    console.error('Flashcard generation error:', error);
    
    if (error instanceof FlashcardGenerationError) {
      throw error;
    }
    
    throw new FlashcardGenerationError(
      'Failed to generate flashcards. Please try again with different content.'
    );
  }
}