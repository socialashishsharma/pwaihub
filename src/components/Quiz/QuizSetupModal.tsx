import React, { useState } from 'react';
import { X } from 'lucide-react';
import { QuizDifficulty, QuestionType } from '../../types';

interface QuizSetupModalProps {
  onSetup: (numQuestions: number, difficulty: QuizDifficulty, questionType: QuestionType) => void;
  onClose: () => void;
  isGenerating?: boolean;
}

const QuizSetupModal: React.FC<QuizSetupModalProps> = ({ 
  onSetup, 
  onClose,
  isGenerating = false
}) => {
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState<QuizDifficulty>('medium');
  const [questionType, setQuestionType] = useState<QuestionType>('multiple-choice');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSetup(numQuestions, difficulty, questionType);
  };

  if (isGenerating) {
    return null; // Don't render modal while generating
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-40">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold dark:text-white">Quiz Setup</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Question Type
            </label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value as QuestionType)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
            >
              <option value="multiple-choice">Multiple Choice</option>
              <option value="short-answer">Short Answer</option>
              <option value="one-word">One Word</option>
              <option value="long-answer">Long Answer</option>
              <option value="true-false">True/False</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Number of Questions
            </label>
            <select
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
            >
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty Level
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as QuizDifficulty)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700 dark:text-white"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Generate Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizSetupModal;