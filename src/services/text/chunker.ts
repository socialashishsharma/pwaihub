import { ChunkOptions, TextChunk } from './types';

export class TextChunker {
  private static readonly DEFAULT_CHUNK_SIZE = 2000;
  private static readonly DEFAULT_OVERLAP = 200;
  private static readonly MIN_CHUNK_SIZE = 100;

  static chunk(text: string, options: ChunkOptions = {}): TextChunk[] {
    const {
      maxChunkSize = this.DEFAULT_CHUNK_SIZE,
      overlap = this.DEFAULT_OVERLAP,
      preserveParagraphs = true
    } = options;

    // Clean and normalize text
    const cleanText = this.normalizeText(text);
    
    if (cleanText.length <= maxChunkSize) {
      return [{ content: cleanText, index: 0 }];
    }

    const chunks: TextChunk[] = [];
    let currentChunk = '';
    let chunkIndex = 0;

    // Split text into paragraphs or sentences
    const segments = preserveParagraphs 
      ? cleanText.split(/\n\s*\n/)
      : cleanText.split(/[.!?]+/);

    for (const segment of segments) {
      const trimmedSegment = segment.trim();
      if (!trimmedSegment) continue;

      if (currentChunk.length + trimmedSegment.length > maxChunkSize) {
        if (currentChunk) {
          chunks.push({ content: currentChunk.trim(), index: chunkIndex++ });
          // Keep overlap from previous chunk
          currentChunk = currentChunk.slice(-overlap) + ' ' + trimmedSegment;
        } else {
          currentChunk = trimmedSegment;
        }
      } else {
        currentChunk += (currentChunk ? '\n\n' : '') + trimmedSegment;
      }
    }

    if (currentChunk.length >= this.MIN_CHUNK_SIZE) {
      chunks.push({ content: currentChunk.trim(), index: chunkIndex });
    }

    return chunks;
  }

  private static normalizeText(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')
      .trim();
  }
}