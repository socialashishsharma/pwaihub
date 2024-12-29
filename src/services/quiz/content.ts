import { chunk } from './utils';

// Optimized chunk sizes for better question generation
const MAX_CHUNK_LENGTH = 2500;  // Reduced for more reliable generation
const MIN_CHUNK_LENGTH = 500;   // Increased minimum for better context
const OVERLAP_SIZE = 200;       // Fixed overlap size

export function prepareContent(content: string, numQuestions: number): string[] {
  // Clean and normalize content
  const cleanContent = content
    .replace(/\s+/g, ' ')
    .replace(/[^\w\s.,!?;:()"'-]/g, '')
    .trim();

  // Split into meaningful segments
  const segments = cleanContent
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length >= 50);  // Filter out very short segments

  // Calculate optimal chunk size
  const targetSize = Math.min(
    Math.ceil(segments.join(' ').length / numQuestions),
    MAX_CHUNK_LENGTH
  );

  // Create overlapping chunks
  const chunks: string[] = [];
  let currentChunk = '';
  let lastOverlap = '';

  for (const segment of segments) {
    if (currentChunk.length + segment.length > targetSize) {
      if (currentChunk) {
        chunks.push(currentChunk);
        lastOverlap = currentChunk.slice(-OVERLAP_SIZE);
        currentChunk = lastOverlap + ' ' + segment;
      } else {
        currentChunk = segment;
      }
    } else {
      currentChunk += (currentChunk ? ' ' : '') + segment;
    }
  }

  if (currentChunk.length >= MIN_CHUNK_LENGTH) {
    chunks.push(currentChunk);
  }

  // Ensure we have enough chunks for the requested questions
  if (chunks.length < numQuestions) {
    // Split larger chunks if needed
    const newChunks: string[] = [];
    for (const chunk of chunks) {
      if (chunk.length > targetSize * 1.5) {
        const subChunks = splitChunk(chunk, targetSize);
        newChunks.push(...subChunks);
      } else {
        newChunks.push(chunk);
      }
    }
    return newChunks;
  }

  return chunks;
}

function splitChunk(chunk: string, targetSize: number): string[] {
  const sentences = chunk.split(/[.!?]+/);
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    if (current.length + sentence.length > targetSize) {
      if (current) chunks.push(current);
      current = sentence;
    } else {
      current += (current ? '. ' : '') + sentence;
    }
  }

  if (current) chunks.push(current);
  return chunks;
}