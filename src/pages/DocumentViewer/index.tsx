import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import ChatInterface from '../../components/Chat/ChatInterface';
import QuizSetupModal from '../../components/Quiz/QuizSetupModal';
import QuizLoader from '../../components/Loader/QuizLoader';
import { generateQuiz, QuizGenerationError } from '../../services/quiz/generator';
import { QuizDifficulty, QuestionType } from '../../types';
import { toast } from 'react-hot-toast';
import Header from './components/Header';
import DocumentContent from './components/DocumentContent';

const DocumentViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { documents, addQuiz } = useStore();
  const document = documents.find(doc => doc.id === id);
  const [showQuizSetup, setShowQuizSetup] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleQuizSetup = async (
    numQuestions: number, 
    difficulty: QuizDifficulty,
    questionType: QuestionType
  ) => {
    if (!document?.content) {
      toast.error('No document content available');
      return;
    }
    
    setIsGenerating(true);
    try {
      const quiz = await generateQuiz({
        content: document.content,
        numQuestions,
        difficulty,
        questionType,
      });
      
      addQuiz(quiz);
      setShowQuizSetup(false);
      navigate(`/quiz/${quiz.id}`);

      // Show appropriate success message based on number of questions generated
      if (quiz.questions.length < numQuestions) {
        toast.success(
          `Generated ${quiz.questions.length} questions successfully!`
        );
      } else {
        toast.success('Quiz generated successfully!');
      }
    } catch (error) {
      console.error('Quiz generation error:', error);
      toast.error(
        error instanceof QuizGenerationError
          ? error.message
          : 'Failed to generate quiz. Please try again.'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  if (!document) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Document not found
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {isGenerating && <QuizLoader />}
      
      <Header
        title={document.title}
        onGenerateQuiz={() => setShowQuizSetup(true)}
        isGenerating={isGenerating}
      />
      
      <DocumentContent content={document.content} />

      <ChatInterface documentContent={document.content} />

      {showQuizSetup && (
        <QuizSetupModal
          onSetup={handleQuizSetup}
          onClose={() => setShowQuizSetup(false)}
          isGenerating={isGenerating}
        />
      )}
    </div>
  );
};

export default DocumentViewer;