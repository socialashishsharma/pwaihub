export class QuizParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuizParseError';
  }
}

export class QuizValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuizValidationError';
  }
}