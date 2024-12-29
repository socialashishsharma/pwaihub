import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { ArrowLeft } from 'lucide-react';
import QuestionCard from './components/QuestionCard';
import QuizSummary from './components/QuizSummary';
import QuizLoader from '../../components/Loader/QuizLoader';
import QuizHeader from './components/QuizHeader';
import { generateQuiz } from '../../services/quiz/generator';
import { toast } from 'react-hot-toast';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quizzes, addQuiz } = useStore();
  const quiz = quizzes.find(q => q.id === id);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!quiz) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Quiz not found
        </p>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const handleTryAgain = async () => {
    if (!quiz.content || !quiz.difficulty) {
      toast.error('Cannot regenerate quiz: missing required data');
      return;
    }

    setIsGenerating(true);
    try {
      const newQuiz = await generateQuiz({
        content: quiz.content,
        numQuestions: quiz.questions.length,
        difficulty: quiz.difficulty,
        questionType: quiz.questions[0].type
      });
      
      addQuiz(newQuiz);
      navigate(`/quiz/${newQuiz.id}`);
      
      setCurrentQuestionIndex(0);
      setAnswers({});
      setShowResults(false);
      
      toast.success('New quiz generated successfully!');
    } catch (error) {
      console.error('Failed to generate new quiz:', error);
      toast.error('Failed to generate new quiz. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (showResults) {
    return (
      <>
        {isGenerating && <QuizLoader />}
        <QuizSummary
          questions={quiz.questions}
          answers={answers}
          score={calculateScore()}
          onReset={handleTryAgain}
          onBack={() => navigate('/dashboard')}
          isGenerating={isGenerating}
        />
      </>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      {isGenerating && <QuizLoader />}
      
      <QuizHeader
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quiz.questions.length}
        onBack={() => navigate('/dashboard')}
      />

      <QuestionCard
        question={currentQuestion}
        userAnswer={answers[currentQuestion.id]}
        onAnswer={handleAnswer}
      />

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!hasAnsweredCurrent}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastQuestion ? 'Show Results' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default Quiz;