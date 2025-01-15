import { create } from 'zustand';
import { User, Document, Quiz, UserFile, UserActivity } from '../types';

interface Store {
  user: User | null;
  documents: Document[];
  quizzes: Quiz[];
  files: UserFile[];
  activities: UserActivity[];
  darkMode: boolean;
  setUser: (user: User | null) => void;
  addDocument: (document: Document) => void;
  addQuiz: (quiz: Quiz) => void;
  addFile: (file: UserFile) => void;
  addActivity: (activity: UserActivity) => void;
  toggleDarkMode: () => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  documents: [],
  quizzes: [],
  files: [],
  activities: [],
  darkMode: false,
  setUser: (user) => set({ user }),
  addDocument: (document) =>
    set((state) => ({ documents: [...state.documents, document] })),
  addQuiz: (quiz) => 
    set((state) => ({ quizzes: [...state.quizzes, quiz] })),
  addFile: (file) =>
    set((state) => ({ files: [...state.files, file] })),
  addActivity: (activity) =>
    set((state) => ({ activities: [activity, ...state.activities] })),
  toggleDarkMode: () => 
    set((state) => ({ darkMode: !state.darkMode })),
}));