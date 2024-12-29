import { AIService, AIServiceConfig, AIServiceResponse, QuizGenerationParams, FlashcardGenerationParams } from '../types';
import { createQuizPrompt } from '../../quiz/prompt';
import { createFlashcardPrompt } from '../../flashcards/prompt';

export class AzureOpenAIService implements AIService {
  private apiKey: string;
  private endpoint: string;
  private modelName: string;

  constructor(config: AIServiceConfig) {
    this.apiKey = config.apiKey;
    this.endpoint = config.endpoint;
    this.modelName = config.modelName;
  }

  private async makeRequest(prompt: string): Promise<AIServiceResponse> {
    const response = await fetch(
      `${this.endpoint}/openai/deployments/${this.modelName}/chat/completions?api-version=2023-03-15-preview`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
          temperature: 0.3,
          max_tokens: 2000,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Azure OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      text: data.choices[0].message.content,
      usage: data.usage,
    };
  }

  async generateFlashcards(params: FlashcardGenerationParams): Promise<AIServiceResponse> {
    const prompt = createFlashcardPrompt(params);
    return this.makeRequest(prompt);
  }

  async generateQuiz(params: QuizGenerationParams): Promise<AIServiceResponse> {
    const prompt = createQuizPrompt(params);
    return this.makeRequest(prompt);
  }

  async generateEmbeddings(text: string): Promise<number[]> {
    // Implement embeddings generation if needed
    return [];
  }

  async askQuestion(question: string, context: string): Promise<string> {
    const prompt = `Context: ${context}\n\nQuestion: ${question}`;
    const response = await this.makeRequest(prompt);
    return response.text;
  }
}