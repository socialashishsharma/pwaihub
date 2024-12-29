import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface QuizHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  onBack: () => void;
}

const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentQuestion,
  totalQuestions,
  onBack
}) => (
  <div className="mb-8 flex items-center justify-between">
    <button
      onClick={onBack}
      className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
    >
      <ArrowLeft className="w-5 h-5 mr-2" />
      Back to Dashboard
    </button>
    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
      Question {currentQuestion} of {totalQuestions}
    </div>
  </div>
);

export default QuizHeader;