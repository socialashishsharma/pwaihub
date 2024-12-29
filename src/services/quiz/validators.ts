import { RawQuizQuestion } from './types';
import { QuizValidationError } from './errors';
import { validateQuestionBasics } from './utils/validation';

export function validateMultipleChoice(q: RawQuizQuestion, questionNum: number) {
  validateQuestionBasics(q, questionNum);

  if (!Array.isArray(q.options) || q.options.length !== 4) {
    throw new QuizValidationError(
      `Question ${questionNum}: Multiple choice must have exactly 4 options`
    );
  }

  // Validate option format (A), B), C), D))
  const validPrefixes = ['A)', 'B)', 'C)', 'D)'];
  q.options.forEach((option, index) => {
    if (!option.startsWith(validPrefixes[index])) {
      throw new QuizValidationError(
        `Question ${questionNum}: Option ${index + 1} must start with "${validPrefixes[index]}"`
      );
    }
  });

  if (!q.options.includes(q.correctAnswer)) {
    throw new QuizValidationError(
      `Question ${questionNum}: Correct answer must exactly match one of the options`
    );
  }
}

export function validateTrueFalse(q: RawQuizQuestion, questionNum: number) {
  validateQuestionBasics(q, questionNum);

  if (!Array.isArray(q.options) || q.options.length !== 2 || 
      q.options[0] !== 'True' || q.options[1] !== 'False') {
    throw new QuizValidationError(
      `Question ${questionNum}: True/False questions must have exactly ["True", "False"] as options`
    );
  }

  if (q.correctAnswer !== 'True' && q.correctAnswer !== 'False') {
    throw new QuizValidationError(
      `Question ${questionNum}: True/False answer must be exactly "True" or "False"`
    );
  }
}