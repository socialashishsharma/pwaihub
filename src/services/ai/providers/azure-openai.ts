import { AIService, AIServiceConfig, AIServiceResponse, QuizGenerationParams, FlashcardGenerationParams } from '../types';
import { createQuizPrompt } from '../../quiz/prompt';
import { createFlashcardPrompt } from '../../flashcards/prompt';
import { TextSanitizer } from '../../text/sanitizer';
import { toast } from 'react-hot-toast';

export class AzureOpenAIService implements AIService {
  private apiKey: string;
  private endpoint: string;
  private modelName: string;

  constructor(config: AIServiceConfig) {
    this.apiKey = config.apiKey;
    this.endpoint = config.endpoint;
    this.modelName = config.modelName;
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
    // Implement if needed
    return [];
  }

  async askQuestion(question: string, context: string): Promise<string> {
    const prompt = `Context: ${context}\n\nQuestion: ${question}`;
    const response = await this.makeRequest(prompt);
    return response.text;
  }

  private async makeRequest(prompt: string): Promise<AIServiceResponse> {
    try {
      // Sanitize the prompt before sending
      const sanitizedPrompt = TextSanitizer.sanitize(prompt);
      
      // Validate the sanitized prompt
      const validationError = TextSanitizer.validateText(sanitizedPrompt);
      if (validationError) {
        throw new Error(validationError);
      }

      const apiUrl = 'https://benevolent-biscochitos-7e0f3b.netlify.app/.netlify/functions/generate';
      
      const response = await fetch(
        apiUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Origin': window.location.origin,
            // 'Access-Control-Allow-Origin': '*',
          },
          // credentials: 'include',
          mode: 'cors', 
          body: JSON.stringify({
            prompt: sanitizedPrompt
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || response.statusText;
        
        // Handle content filtering specifically
        if (errorMessage.includes('content management policy')) {
          toast.error('The text contains invalid or inappropriate content. Please try with different content.');
          throw new Error('Content filtering policy triggered. Please modify the content and try again.');
        }

        // Handle other errors
        toast.error(this.getErrorMessage(response.status, errorMessage));
        throw new Error(this.getErrorMessage(response.status, errorMessage));
      }

      const data = await response.json();
      return {
        text: data.choices[0].message.content,
        usage: data.usage,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to process request';
      toast.error(errorMessage);
      throw error;
    }
  }

  private getErrorMessage(status: number, message: string): string {
    switch (status) {
      case 401:
        return 'Authentication failed. Please check your API key.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Azure OpenAI service error. Please try again.';
      case 503:
        return 'Azure OpenAI service is temporarily unavailable.';
      default:
        return `Azure OpenAI API error: ${message}`;
    }
  }
}