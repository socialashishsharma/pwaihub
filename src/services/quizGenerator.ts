import { CohereClient } from 'cohere-ai';
import { Quiz, QuizDifficulty, Question } from '../types';
import { v4 as uuidv4 } from 'uuid';

const cohere = new CohereClient({
  token: 'UBiiEl0njDco9RmZC2imhQ8cN9Z93TZnW79V8IHP',
});

export async function generateQuiz(
  documentContent: string,
  numQuestions: number,
  difficulty: QuizDifficulty
): Promise<Quiz> {
  const prompt = createQuizPrompt(documentContent, numQuestions, difficulty);
  
  const response = await cohere.chat({
    message: prompt,
    temperature: 0.7,
    maxTokens: 2000,
  });

  return parseQuizResponse(response.text);
}

function createQuizPrompt(
  content: string,
  numQuestions: number,
  difficulty: QuizDifficulty
): string {
  return `Generate a ${difficulty} difficulty quiz with ${numQuestions} multiple-choice questions based on this content: 

${content}

Format each question as JSON with the following structure:
{
  "questions": [
    {
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Correct option"
    }
  ]
}`;
}

function parseQuizResponse(response: string): Quiz {
  try {
    // Extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No valid JSON found in response');
    
    const parsed = JSON.parse(jsonMatch[0]);
    
    return {
      id: uuidv4(),
      questions: parsed.questions.map((q: any) => ({
        id: uuidv4(),
        type: 'multiple-choice',
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
      })),
      score: 0,
      totalQuestions: parsed.questions.length,
    };
  } catch (error) {
    throw new Error('Failed to parse quiz response');
  }
}