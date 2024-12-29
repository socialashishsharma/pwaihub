import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: 'UBiiEl0njDco9RmZC2imhQ8cN9Z93TZnW79V8IHP',
});

export const generateEmbeddings = async (text: string) => {
  const response = await cohere.embed({
    texts: [text],
    model: 'embed-english-v3.0',
    inputType: 'search_document', // Add this line to specify input type
  });
  return response.embeddings[0];
};

export const askQuestion = async (question: string, context: string) => {
  const response = await cohere.chat({
    message: question,
    temperature: 0.7,
    preamble: `Use this document context to answer questions: ${context}`,
  });
  return response.text;
};