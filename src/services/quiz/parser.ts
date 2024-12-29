import { v4 as uuidv4 } from 'uuid';
import { Quiz, Question, QuestionType } from '../../types';
import { RawQuizQuestion } from './types';
import { QuizParseError } from './errors';
import { validateMultipleChoice, validateTrueFalse } from './validators';

export function parseQuizResponse(response: string, type: QuestionType): Quiz {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new QuizParseError('Invalid response format: No JSON found');
    }
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    if (!Array.isArray(parsed.questions)) {
      throw new QuizParseError('Invalid response format: Missing questions array');
    }

    // Validate each question based on type
    parsed.questions.forEach((q: RawQuizQuestion, index: number) => {
      switch (type) {
        case 'multiple-choice':
          validateMultipleChoice(q, index + 1);
          break;
        case 'true-false':
          validateTrueFalse(q, index + 1);
          break;
        // Add other question type validations here
      }
    });

    return {
      id: uuidv4(),
      questions: parsed.questions.map(q => ({
        id: uuidv4(),
        type,
        question: q.question.trim(),
        options: q.options?.map(opt => opt.trim()),
        correctAnswer: q.correctAnswer.trim(),
        explanation: q.explanation?.trim() || 'No explanation provided'
      })),
      totalQuestions: parsed.questions.length,
      score: 0
    };
  } catch (error) {
    if (error instanceof QuizParseError) throw error;
    throw new QuizParseError(
      `Failed to parse quiz: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}