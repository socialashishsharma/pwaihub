import React, { useState } from 'react';
import { FileText, Upload, HelpCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import EssayUpload from '../components/essay/EssayUpload';
import EssayEvaluationResult from '../components/essay/EssayEvaluationResult';
import { evaluateEssay } from '../services/essay/evaluator';
import { ExamType, EssayEvaluation } from '../types/essay';

const EssayEvaluationPage = () => {
  const [essayContent, setEssayContent] = useState('');
  const [referenceContent, setReferenceContent] = useState('');
  const [examType, setExamType] = useState<ExamType | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [evaluation, setEvaluation] = useState<EssayEvaluation | null>(null);

  const handleEvaluate = async () => {
    if (!essayContent) {
      toast.error('Please upload an essay first');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await evaluateEssay({
        content: essayContent,
        examType,
        referenceContent: referenceContent || undefined,
      });
      setEvaluation(result);
      toast.success('Essay evaluated successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to evaluate essay');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 dark:text-white">
          AI Essay Evaluation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Get detailed feedback and scoring on your essays with AI-powered analysis
        </p>
      </div>

      {!evaluation ? (
        <div className="max-w-3xl mx-auto">
          {/* Step-by-Step Process */}
          <div className="space-y-8">
            {/* Step 1: Essay Upload */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold dark:text-white">
                    1. Upload Your Essay
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    Upload your handwritten or typed essay for evaluation
                  </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Required
                </div>
              </div>
              <EssayUpload
                onUpload={setEssayContent}
                isProcessing={isProcessing}
                label="Drop your essay here or click to browse"
              />
            </div>

            {essayContent && (
              <>
                {/* Step 2: Exam Type */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold dark:text-white">
                        2. Select Exam Type
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Choose the exam type for specialized evaluation criteria
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Optional
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {(['UPSC', 'BANKING'] as ExamType[]).map((type) => (
                      <button
                        key={type}
                        onClick={() => setExamType(type === examType ? undefined : type)}
                        className={`
                          p-4 rounded-lg border-2 transition-all
                          ${examType === type
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-blue-500'
                          }
                        `}
                      >
                        <h3 className="font-medium dark:text-white">{type}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {type === 'UPSC' 
                            ? 'Civil Services Examination'
                            : 'Banking & Financial Services'
                          }
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Reference Material */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold dark:text-white">
                        3. Upload Reference Material
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                        Add reference material to compare against your essay
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Optional
                    </div>
                  </div>
                  <EssayUpload
                    onUpload={setReferenceContent}
                    isProcessing={isProcessing}
                    label="Drop reference material here or click to browse"
                  />
                </div>

                {/* Evaluate Button */}
                <button
                  onClick={handleEvaluate}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-lg shadow-lg transition-colors disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Evaluating Essay...
                    </span>
                  ) : (
                    'Evaluate Essay'
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setEvaluation(null)}
            className="btn-secondary mb-8"
          >
            ← Evaluate Another Essay
          </button>
          <EssayEvaluationResult evaluation={evaluation} />
        </div>
      )}
    </div>
  );
};

export default EssayEvaluationPage;