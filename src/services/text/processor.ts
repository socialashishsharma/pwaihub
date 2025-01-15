import { TextChunker } from './chunker';
import { ChunkOptions, TextProcessingResult } from './types';

export class TextProcessor {
  static process(text: string, options?: ChunkOptions): TextProcessingResult {
    const chunks = TextChunker.chunk(text, options);
    
    return {
      chunks,
      totalChunks: chunks.length,
      originalLength: text.length
    };
  }

  static async processInBatches<T>(
    chunks: TextProcessingResult,
    processor: (chunk: string) => Promise<T>,
    options: {
      maxConcurrent?: number;
      onProgress?: (progress: number) => void;
    } = {}
  ): Promise<T[]> {
    const { maxConcurrent = 3 } = options;
    const results: T[] = [];
    let completed = 0;

    // Process chunks in batches
    for (let i = 0; i < chunks.totalChunks; i += maxConcurrent) {
      const batch = chunks.chunks.slice(i, i + maxConcurrent);
      
      const batchResults = await Promise.all(
        batch.map(async chunk => {
          const result = await processor(chunk.content);
          completed++;
          
          // Report progress
          options.onProgress?.(
            Math.round((completed / chunks.totalChunks) * 100)
          );
          
          return result;
        })
      );

      results.push(...batchResults);
    }

    return results;
  }
}