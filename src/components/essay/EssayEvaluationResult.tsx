import React from 'react';
import { EssayEvaluation } from '../../types/essay';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';

interface EssayEvaluationResultProps {
  evaluation: EssayEvaluation;
}

const EssayEvaluationResult: React.FC<EssayEvaluationResultProps> = ({ evaluation }) => {
  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <div className="text-center">
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
          {evaluation.score}/10
        </div>
        <p className="text-gray-600 dark:text-gray-400">Overall Score</p>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6">
        <FeedbackSection
          title="Strengths"
          items={evaluation.feedback.strengths}
          icon={<CheckCircle className="w-5 h-5 text-green-500" />}
        />
        <FeedbackSection
          title="Areas for Improvement"
          items={evaluation.feedback.weaknesses}
          icon={<XCircle className="w-5 h-5 text-red-500" />}
        />
      </div>

      {/* Detailed Rubric */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">
          Detailed Evaluation
        </h3>
        <div className="space-y-4">
          {evaluation.rubric.map((item, index) => (
            <div key={index} className="border-b dark:border-gray-700 pb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium dark:text-white">{item.category}</h4>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  {item.score}/10
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {item.feedback}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">
          Suggested Improvements
        </h3>
        <ul className="space-y-3">
          {evaluation.feedback.improvements.map((improvement, index) => (
            <li key={index} className="flex items-start">
              <ArrowRight className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 dark:text-gray-400">{improvement}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Sample Rewrites */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">
          Sample Rewrites
        </h3>
        <div className="space-y-4">
          {evaluation.feedback.sampleRewrites.map((sample, index) => (
            <div 
              key={index}
              className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <p className="text-gray-600 dark:text-gray-300">{sample}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FeedbackSection = ({ 
  title, 
  items, 
  icon 
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
    <h3 className="text-xl font-semibold mb-4 dark:text-white">{title}</h3>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="mr-2 mt-0.5 flex-shrink-0">{icon}</span>
          <span className="text-gray-600 dark:text-gray-400">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default EssayEvaluationResult;