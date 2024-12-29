export interface User {
  id: string;
  email: string;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  userId: string;
  createdAt: string;
  embeddings?: number[];
}

export type QuizDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'multiple-choice' | 'short-answer' | 'one-word' | 'long-answer' | 'true-false';

export interface Quiz {
  id: string;
  questions: Question[];
  score?: number;
  totalQuestions: number;
  content?: string;           // Added for regeneration
  difficulty?: QuizDifficulty; // Added for regeneration
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string;
  userAnswer?: string;
  explanation?: string;
}