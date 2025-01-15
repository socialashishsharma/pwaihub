import React, { useState } from 'react';
import { 
  Brain, 
  FileText, 
  Languages, 
  PenTool, 
  Library,
  Upload 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { processDocument } from '../../services/documentProcessor';
import toast from 'react-hot-toast';

const Features = () => {
  const navigate = useNavigate();
  const { addDocument } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuizGeneration = async (file: File) => {
    setIsProcessing(true);
    try {
      const processedDoc = await processDocument(file);
      addDocument(processedDoc);
      navigate(`/document/${processedDoc.id}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to process document');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Transform Your Learning Experience
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Quiz Generation Feature */}
          <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <Brain className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              AI-Powered Quiz Generation
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Upload your study materials and get instant, customized quizzes to test your knowledge.
            </p>
            <label className="block">
              <input
                type="file"
                className="hidden"
                // accept=".pdf,.txt,.doc,.docx"
                accept=".txt, .pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleQuizGeneration(file);
                }}
                disabled={isProcessing}
              />
              <span className="btn-primary inline-block cursor-pointer">
                {isProcessing ? 'Processing...' : 'Generate Quiz Now'}
              </span>
            </label>
          </div>

          {/* Essay Evaluation Feature */}
          <div className="p-6 rounded-xl bg-purple-50 dark:bg-purple-900/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <PenTool className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Essay Evaluation
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Get detailed feedback and grading on your written work with AI-powered analysis.
            </p>
            <button
              onClick={() => navigate('/essay-evaluation')}
              className="btn-primary bg-purple-600 hover:bg-purple-700"
            >
              Evaluate Essay
            </button>
          </div>

          {/* Flashcards Feature */}
          <div 
            className="p-6 rounded-xl bg-green-50 dark:bg-green-900/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            onClick={() => navigate('/flashcards')}
          >
            <Library className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Smart Flashcards
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Create interactive flashcards automatically from your documents for efficient revision.
            </p>
            <button className="btn-primary bg-green-600 hover:bg-green-700">
              Create Flashcards
            </button>
          </div>

          {/* Additional Features */}
          <FeatureCard
            icon={Languages}
            title="Multilingual Support"
            description="Generate summaries and explanations in your preferred language."
          />
          <FeatureCard
            icon={Upload}
            title="Easy Document Upload"
            description="Drag and drop your files or browse to upload. Supports PDF, Word, and more."
          />
          <FeatureCard
            icon={FileText}
            title="Comprehensive Notes"
            description="Get AI-generated detailed notes and summaries from your study materials."
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
    <Icon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300">
      {description}
    </p>
  </div>
);

export default Features;