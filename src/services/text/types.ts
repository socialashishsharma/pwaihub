export interface ChunkOptions {
  maxChunkSize?: number;
  overlap?: number;
  preserveParagraphs?: boolean;
}

export interface TextChunk {
  content: string;
  index: number;
}

export interface TextProcessingResult {
  chunks: TextChunk[];
  totalChunks: number;
  originalLength: number;
}