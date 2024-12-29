import React from 'react';
import { Brain } from 'lucide-react';

interface HeaderProps {
  title: string;
  onGenerateQuiz: () => void;
  isGenerating: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, onGenerateQuiz, isGenerating }) => (
  <div className="flex justify-between items-center">
    <h1 className="text-3xl font-bold dark:text-white">{title}</h1>
    <button
      onClick={onGenerateQuiz}
      disabled={isGenerating}
      className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
    >
      <Brain className="w-5 h-5" />
      <span>Generate Quiz</span>
    </button>
  </div>
);

export default Header;