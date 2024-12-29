import { QuizDifficulty, QuestionType } from '../../types';

export function getDifficultyGuidelines(difficulty: QuizDifficulty): string {
  switch (difficulty) {
    case 'easy':
      return 'Questions should test basic recall and simple comprehension';
    case 'medium':
      return 'Questions should require understanding and application of concepts';
    case 'hard':
      return 'Questions should require analysis and synthesis of multiple concepts';
  }
}

export function getQuestionTypeGuidelines(type: QuestionType): string {
  switch (type) {
    case 'multiple-choice':
      return 'Each question MUST have exactly 4 distinct options. The correct answer MUST be one of these options.';
    case 'short-answer':
      return 'Answers should be brief (1-2 sentences). Questions should be specific and focused.';
    case 'one-word':
      return 'Answers MUST be single words found in the text. Questions should target specific terms or concepts.';
    case 'long-answer':
      return 'Questions should require detailed explanations. Provide clear criteria for what constitutes a complete answer.';
    case 'true-false':
      return 'Statements must be unambiguously true or false based on the text. No "partially true" statements allowed.';
  }
}

export function getQuestionFormat(type: QuestionType): string {
  const baseFormat = {
    question: "The actual question text",
    explanation: "Explanation of the correct answer"
  };

  switch (type) {
    case 'multiple-choice':
      return JSON.stringify({
        ...baseFormat,
        options: ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: "The exact text of the correct option"
      }, null, 2);
      
    case 'true-false':
      return JSON.stringify({
        ...baseFormat,
        options: ["True", "False"],
        correctAnswer: "True or False"
      }, null, 2);
      
    case 'one-word':
      return JSON.stringify({
        ...baseFormat,
        correctAnswer: "single_word_answer"
      }, null, 2);
      
    case 'short-answer':
    case 'long-answer':
      return JSON.stringify({
        ...baseFormat,
        correctAnswer: "The expected answer text",
        criteria: ["Key point 1", "Key point 2"]
      }, null, 2);
  }
}