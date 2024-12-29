import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import Typed from 'typed.js';
import toast from 'react-hot-toast';

const Hero = () => {
  const typedRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useStore();

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['quizzes', 'notes', 'flashcards', 'tests', 'evaluations'],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      backDelay: 1500,
    });

    return () => typed.destroy();
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      // Show a toast notification if user is not logged in
      toast.error('Please sign in to continue', {
        duration: 3000,
        position: 'top-center',
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Create accurate{' '}
          <span ref={typedRef} className="text-blue-600 dark:text-blue-400"></span>
          <br />
          with AI from your course material in seconds
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Transform your study materials into powerful learning tools. Upload any document
          and let AI help you learn more effectively.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={handleGetStarted}
            className="btn-primary px-8 py-4 text-lg"
          >
            Get Started for Free
          </button>
          <button 
            onClick={() => navigate('/features')}
            className="btn-secondary px-8 py-4 text-lg"
          >
            See How It Works
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Stat number="1M+" label="Documents Processed" />
          <Stat number="500K+" label="Quizzes Generated" />
          <Stat number="100K+" label="Active Users" />
        </div>
      </div>
    </div>
  );
};

const Stat = ({ number, label }: { number: string; label: string }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
      {number}
    </div>
    <div className="text-gray-600 dark:text-gray-300">{label}</div>
  </div>
);

export default Hero;