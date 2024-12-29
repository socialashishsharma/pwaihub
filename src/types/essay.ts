export type ExamType = 'UPSC' | 'BANKING';

export interface EssayEvaluation {
  id: string;
  content: string;
  score: number;
  feedback: {
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
    sampleRewrites: string[];
  };
  rubric: {
    category: string;
    score: number;
    feedback: string;
  }[];
  examType?: ExamType;
  referenceContent?: string;
  createdAt: string;
}

export interface EssayEvaluationRequest {
  content: string;
  examType?: ExamType;
  referenceContent?: string;
}