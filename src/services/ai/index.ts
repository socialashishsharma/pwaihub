import { AIService, AIServiceConfig } from './types';
import { AzureOpenAIService } from './providers/azure-openai';

type AIProvider = 'azure-openai';

export class AIServiceFactory {
  private static instance: AIService;
  private static currentProvider: AIProvider;

  static initialize(provider: AIProvider, config: AIServiceConfig): void {
    if (provider === 'azure-openai') {
      this.instance = new AzureOpenAIService(config);
      this.currentProvider = provider;
    } else {
      throw new Error(`Unsupported AI provider: ${provider}`);
    }
  }

  static getInstance(): AIService {
    if (!this.instance) {
      throw new Error('AI service not initialized. Call initialize() first.');
    }
    return this.instance;
  }

  static getCurrentProvider(): AIProvider {
    return this.currentProvider;
  }
}

// Initialize with Azure OpenAI provider
AIServiceFactory.initialize('azure-openai', {
  apiKey: import.meta.env.VITE_AZURE_OPENAI_API_KEY || '3d4f1c0d159e43d3adf8d8b95613ea3d',
  endpoint: import.meta.env.VITE_AZURE_OPENAI_ENDPOINT || 'https://uxo-dev.openai.azure.com',
  modelName: import.meta.env.VITE_AZURE_OPENAI_MODEL || 'eva4o',
});

// Create the AI service instance
const aiService = AIServiceFactory.getInstance();

// Export the service and its methods
export { aiService };
export const generateEmbeddings = (text: string) => aiService.generateEmbeddings(text);
export const askQuestion = (question: string, context: string) => aiService.askQuestion(question, context);
export const generateQuiz = (params: any) => aiService.generateQuiz(params);
export const generateFlashcards = (params: any) => aiService.generateFlashcards(params);