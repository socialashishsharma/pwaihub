import { aiService } from '../ai';
import { EssayEvaluation, EssayEvaluationRequest } from '../../types/essay';

export class EssayEvaluationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EssayEvaluationError';
  }
}

export async function evaluateEssay(request: EssayEvaluationRequest): Promise<EssayEvaluation> {
  try {
    const prompt = createEvaluationPrompt(request);
    const response = await aiService.askQuestion(prompt, request.referenceContent || '');
    
    // Parse the AI response into structured feedback
    const evaluation = JSON.parse(response) as EssayEvaluation;
    
    return {
      ...evaluation,
      id: crypto.randomUUID(),
      content: request.content,
      createdAt: new Date().toISOString(),
      examType: request.examType,
      referenceContent: request.referenceContent,
    };
  } catch (error) {
    throw new EssayEvaluationError(
      `Failed to evaluate essay: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

function createEvaluationPrompt(request: EssayEvaluationRequest): string {
  const examSpecificGuidelines = request.examType 
    ? getExamGuidelines(request.examType)
    : '';

  return `
Evaluate this essay ${request.examType ? `for ${request.examType} exam` : ''} and provide detailed feedback.
${examSpecificGuidelines}

Essay Content:
${request.content}

${request.referenceContent ? `Reference Material:\n${request.referenceContent}` : ''}

Provide a detailed evaluation in the following JSON format:
{
  "score": <number between 0-10>,
  "feedback": {
    "strengths": ["strength1", "strength2", ...],
    "weaknesses": ["weakness1", "weakness2", ...],
    "improvements": ["improvement1", "improvement2", ...],
    "sampleRewrites": ["sample1", "sample2", ...]
  },
  "rubric": [
    {
      "category": "<category name>",
      "score": <number between 0-10>,
      "feedback": "<detailed feedback>"
    },
    ...
  ]
}`;
}

function getExamGuidelines(examType: string): string {
  switch (examType) {
    case 'UPSC':
      return `
Consider UPSC essay evaluation criteria:
- Clear and effective expression
- Comprehensive coverage of the topic
- Well-structured arguments
- Current affairs integration
- Balanced perspective
- Conclusion quality`;
    
    case 'BANKING':
      return `
Consider Banking exam essay criteria:
- Professional tone
- Financial sector awareness
- Technical accuracy
- Practical examples
- Clear communication
- Logical flow`;
    
    default:
      return '';
  }
}