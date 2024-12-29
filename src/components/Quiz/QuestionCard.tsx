import React from 'react';
import { Question } from '../../types';
import { Check, X } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  userAnswer?: string;
  onAnswer: (questionId: string, answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  userAnswer,
  onAnswer,
}) => {
  const isAnswered = userAnswer !== undefined;
  const isCorrect = isAnswered && userAnswer === question.correctAnswer;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-medium mb-6 dark:text-white">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options?.map((option) => {
          const isSelected = userAnswer === option;
          const isCorrectOption = option === question.correctAnswer;
          
          let buttonClass = `
            w-full text-left px-4 py-3 rounded-lg border transition-all
            ${isAnswered
              ? isSelected
                ? isCorrect
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-red-500 bg-red-50 dark:bg-red-900/20"
                : isCorrectOption
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-200 dark:border-gray-700"
              : "border-gray-200 hover:border-blue-500 dark:border-gray-700 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }
          `;

          return (
            <button
              key={option}
              onClick={() => !isAnswered && onAnswer(question.id, option)}
              disabled={isAnswered}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <span className="dark:text-white">{option}</span>
                {isAnswered && (isSelected || isCorrectOption) && (
                  <span className="ml-2">
                    {isCorrectOption ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">Explanation:</span>{' '}
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;