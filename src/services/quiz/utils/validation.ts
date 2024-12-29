import { RawQuizQuestion } from '../types';
import { QuizValidationError } from '../errors';

export function validateQuestionBasics(q: RawQuizQuestion, questionNum: number) {
  if (!q.question?.trim()) {
    throw new QuizValidationError(`Question ${questionNum}: Missing question text`);
  }

  if (!q.explanation?.trim()) {
    throw new QuizValidationError(`Question ${questionNum}: Must include an explanation`);
  }
}

export function validateOptionFormat(option: string, prefix: string, questionNum: number, optionNum: number) {
  if (!option.startsWith(prefix)) {
    throw new QuizValidationError(
      `Question ${questionNum}: Option ${optionNum} must start with "${prefix}"`
    );
  }
}