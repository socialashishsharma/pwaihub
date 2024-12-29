import { FlashcardGenerationParams } from '../ai/types';

export function createFlashcardPrompt(params: FlashcardGenerationParams): string {
  const numCardsText = params.numCards 
    ? `exactly ${params.numCards}` 
    : 'between 5 and 10';

  return `Generate ${numCardsText} flashcards from the following content. Each flashcard should focus on a key concept or important point.

Content to process:
${params.content}

Requirements:
1. Front side should be a clear, concise question or concept (1-2 sentences)
2. Back side should provide a comprehensive explanation
3. Use HTML formatting on the back side for better readability
4. Each card should be self-contained and meaningful
5. Avoid duplicate information across cards
6. Focus on the most important concepts

Return ONLY valid JSON in this exact format:
{
  "flashcards": [
    {
      "front": "Clear, concise question or key concept",
      "back": "Detailed explanation with <strong>key points</strong> and <ul><li>supporting details</li></ul>"
    }
  ]
}

CRITICAL:
- Return ONLY the JSON object
- No text before or after the JSON
- Ensure valid HTML formatting in the "back" field
- Each flashcard must have both "front" and "back" fields`;
}