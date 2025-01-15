import { TextProcessor } from '../text/processor';
import { aiService } from './index';
import { Quiz, QuizDifficulty, QuestionType } from '../../types';
import { Flashcard } from '../../types/flashcard';
import { EssayEvaluation } from '../../types/essay';

export class AITextProcessor {
  static async generateQuiz(
    content: string,
    options: {
      numQuestions: number;
      difficulty: QuizDifficulty;
      questionType: QuestionType;
      onProgress?: (progress: number) => void;
    }
  ): Promise<Quiz> {
    const processed = TextProcessor.process(content);
    const questionsPerChunk = Math.ceil(options.numQuestions / processed.totalChunks);

    const questions = await TextProcessor.processInBatches(
      processed,
      async (chunk) => {
        const response = await aiService.generateQuiz({
          content: chunk,
          numQuestions: questionsPerChunk,
          difficulty: options.difficulty,
          questionType: options.questionType
        });
        return response;
      },
      { onProgress: options.onProgress }
    );

    // Combine and format results
    const combinedQuestions = questions
      .flatMap(response => JSON.parse(response.text).questions)
      .slice(0, options.numQuestions);

    return {
      id: crypto.randomUUID(),
      questions: combinedQuestions,
      totalQuestions: combinedQuestions.length,
      content,
      difficulty: options.difficulty
    };
  }

  static async generateFlashcards(
    content: string,
    options: {
      numCards?: number;
      onProgress?: (progress: number) => void;
    } = {}
  ): Promise<Flashcard[]> {
    const processed = TextProcessor.process(content);
    const cardsPerChunk = options.numCards 
      ? Math.ceil(options.numCards / processed.totalChunks)
      : undefined;

    const flashcards = await TextProcessor.processInBatches(
      processed,
      async (chunk) => {
        const response = await aiService.generateFlashcards({
          content: chunk,
          numCards: cardsPerChunk
        });
        return response;
      },
      { onProgress: options.onProgress }
    );

    // Combine and format results
    const combinedFlashcards = flashcards
      .flatMap(response => JSON.parse(response.text).flashcards)
      .slice(0, options.numCards);

    return combinedFlashcards.map((card, index) => ({
      id: crypto.randomUUID(),
      front: card.front,
      back: card.back,
      order: index
    }));
  }

  static async evaluateEssay(
    content: string,
    options: {
      examType?: string;
      referenceContent?: string;
      onProgress?: (progress: number) => void;
    } = {}
  ): Promise<EssayEvaluation> {
    // For essay evaluation, we'll process in smaller chunks but combine for final evaluation
    const processed = TextProcessor.process(content, { maxChunkSize: 1500 });
    
    // First analyze chunks individually
    const analyses = await TextProcessor.processInBatches(
      processed,
      async (chunk) => {
        const response = await aiService.askQuestion(
          `Analyze this portion of the essay: ${chunk}`,
          options.referenceContent || ''
        );
        return response;
      },
      { onProgress: options.onProgress }
    );

    // Combine analyses for final evaluation
    const combinedAnalysis = analyses.join('\n\n');
    const finalResponse = await aiService.askQuestion(
      `Provide a final evaluation based on these analyses: ${combinedAnalysis}`,
      options.referenceContent || ''
    );

    return JSON.parse(finalResponse) as EssayEvaluation;
  }
}