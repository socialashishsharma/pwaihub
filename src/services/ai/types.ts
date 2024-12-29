import { QuizDifficulty, QuestionType } from '../../types';

export interface AIServiceConfig {
  apiKey: string;
  endpoint?: string;
  modelName?: string;
}

export interface AIServiceResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface QuizGenerationParams {
  content: string;
  numQuestions: number;
  difficulty: QuizDifficulty;
  questionType: QuestionType;
}

export interface FlashcardGenerationParams {
  content: string;
  numCards?: number;
}

export interface AIService {
  generateQuiz: (params: QuizGenerationParams) => Promise<AIServiceResponse>;
  generateEmbeddings: (text: string) => Promise<number[]>;
  askQuestion: (question: string, context: string) => Promise<string>;
  generateFlashcards: (params: FlashcardGenerationParams) => Promise<AIServiceResponse>;
}