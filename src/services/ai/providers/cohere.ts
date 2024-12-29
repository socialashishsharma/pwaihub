import { CohereClient } from 'cohere-ai';
import { AIService, AIServiceConfig, AIServiceResponse, QuizGenerationParams, FlashcardGenerationParams } from '../types';
import { createQuizPrompt } from '../../quiz/prompt';
import { createFlashcardPrompt } from '../../flashcards/prompt';

export class CohereService implements AIService {
  private client: CohereClient;

  constructor(config: AIServiceConfig) {
    this.client = new CohereClient({ token: config.apiKey });
  }

  async generateQuiz(params: QuizGenerationParams): Promise<AIServiceResponse> {
    const prompt = createQuizPrompt(params);
    const response = await this.client.chat({
      message: prompt,
      temperature: 0.7,
      maxTokens: 2000,
    });

    return {
      text: response.text,
    };
  }

  async generateFlashcards(params: FlashcardGenerationParams): Promise<AIServiceResponse> {
    const prompt = createFlashcardPrompt(params);
    const response = await this.client.chat({
      message: prompt,
      temperature: 0.7,
      maxTokens: 2000,
    });

    return {
      text: response.text,
    };
  }

  async generateEmbeddings(text: string): Promise<number[]> {
    const response = await this.client.embed({
      texts: [text],
      model: 'embed-english-v3.0',
      inputType: 'search_document',
    });
    return response.embeddings[0];
  }

  async askQuestion(question: string, context: string): Promise<string> {
    const response = await this.client.chat({
      message: question,
      temperature: 0.7,
      preamble: `Use this document context to answer questions: ${context}`,
    });
    return response.text;
  }
}