// Add these new types
export interface UserFile {
  id: string;
  userId: string;
  name: string;
  type: string;
  size: number;
  url: string;
  createdAt: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  type: 'quiz' | 'essay' | 'flashcard' | 'document';
  action: string;
  metadata: Record<string, any>;
  createdAt: string;
}

// Update existing types
export interface Document {
  id: string;
  title: string;
  content: string;
  userId: string;
  fileId: string;
  createdAt: string;
  embeddings?: number[];
}