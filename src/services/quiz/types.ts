import { QuizDifficulty, QuestionType } from '../../types';

export interface QuizGenerationOptions {
  content: string;
  numQuestions: number;
  difficulty: QuizDifficulty;
  questionType: QuestionType;
}

export interface RawQuizQuestion {
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}