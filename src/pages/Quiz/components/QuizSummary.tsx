import React from 'react';
import { Question } from '../../../types';
import { ArrowLeft, RotateCcw } from 'lucide-react';

interface QuizSummaryProps {
  questions: Question[];
  answers: Record<string, string>;
  score: number;
  onReset: () => void;
  onBack: () => void;
  isGenerating: boolean;
}

const QuizSummary: React.FC<QuizSummaryProps> = ({
  questions,
  answers,
  score,
  onReset,
  onBack,
  isGenerating
}) => {
  const percentage = (score / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Quiz Results</h2>
        
        <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
          <p className="text-3xl font-bold mb-2 dark:text-white">
            {score} / {questions.length}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {percentage}% Correct
          </p>
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div
                key={question.id}
                className="p-4 border rounded-lg dark:border-gray-700"
              >
                <p className="font-medium mb-2 dark:text-white">
                  {index + 1}. {question.question}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-medium">Your answer:</span>{' '}
                  <span className={isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
                    {userAnswer}
                  </span>
                </p>
                {!isCorrect && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    <span className="font-medium">Correct answer:</span>{' '}
                    {question.correctAnswer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <button
            onClick={onReset}
            disabled={isGenerating}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            {isGenerating ? 'Generating...' : 'Try Again'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizSummary;