import { Quiz } from '../../types';
import { QuizGenerationOptions } from './types';
import { parseQuizResponse } from './parser';
import { prepareContent } from './content';
import { QuizParseError } from './errors';
import { aiService } from '../ai';

export class QuizGenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuizGenerationError';
  }
}

export async function generateQuiz(options: QuizGenerationOptions): Promise<Quiz> {
  try {
    const chunks = prepareContent(options.content, options.numQuestions);
    const questions = [];
    const questionsPerChunk = Math.ceil(options.numQuestions / chunks.length);
    
    for (const chunk of chunks) {
      try {
        const response = await aiService.generateQuiz({
          content: chunk,
          numQuestions: questionsPerChunk,
          difficulty: options.difficulty,
          questionType: options.questionType,
        });

        const result = parseQuizResponse(response.text, options.questionType);
        questions.push(...result.questions);
      } catch (error) {
        console.warn('Failed to generate questions from chunk:', error);
      }
    }

    if (questions.length === 0) {
      throw new QuizGenerationError('Failed to generate any valid questions');
    }

    const finalQuestions = questions
      .slice(0, options.numQuestions)
      .map(q => ({
        ...q,
        id: crypto.randomUUID()
      }));

    return {
      id: crypto.randomUUID(),
      questions: finalQuestions,
      totalQuestions: finalQuestions.length,
      score: 0,
      content: options.content,
      difficulty: options.difficulty
    };
  } catch (error) {
    console.error('Quiz Generation Error:', error);
    throw new QuizGenerationError(
      error instanceof Error ? error.message : 'Failed to generate quiz'
    );
  }
}