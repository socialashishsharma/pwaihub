import { QuizGenerationOptions } from './types';
import { getDifficultyGuidelines } from './guidelines';
import { QUIZ_PROMPT_TEMPLATE } from './constants';

export function createQuizPrompt({
  content,
  numQuestions,
  difficulty,
  questionType
}: QuizGenerationOptions): string {
  const header = QUIZ_PROMPT_TEMPLATE.HEADER
    .replace('{numQuestions}', String(numQuestions))
    .replace('{questionType}', questionType);
  
  const requirements = [
    ...(QUIZ_PROMPT_TEMPLATE.REQUIREMENTS[questionType] || []),
    ...QUIZ_PROMPT_TEMPLATE.REQUIREMENTS.common
  ].map(req => 
    req.replace('{difficultyGuidelines}', getDifficultyGuidelines(difficulty))
  );

  const format = QUIZ_PROMPT_TEMPLATE.FORMAT_EXAMPLE[questionType];
  const criticalNotes = QUIZ_PROMPT_TEMPLATE.CRITICAL_NOTES[questionType];

  return `${header}

${content}

STRICT REQUIREMENTS:
${requirements.map((req, i) => `${i + 1}. ${req}`).join('\n')}

FORMAT:
${JSON.stringify(format, null, 2)}

CRITICAL:
${criticalNotes.map(note => `- ${note}`).join('\n')}`;
}