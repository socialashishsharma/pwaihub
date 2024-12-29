import { create } from 'zustand';
import { User, Document, Quiz } from '../types';

interface Store {
  user: User | null;
  documents: Document[];
  quizzes: Quiz[];
  darkMode: boolean;
  setUser: (user: User | null) => void;
  addDocument: (document: Document) => void;
  addQuiz: (quiz: Quiz) => void;
  toggleDarkMode: () => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  documents: [],
  quizzes: [],
  darkMode: false,
  setUser: (user) => set({ user }),
  addDocument: (document) =>
    set((state) => ({ documents: [...state.documents, document] })),
  addQuiz: (quiz) => set((state) => ({ quizzes: [...state.quizzes, quiz] })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
}));