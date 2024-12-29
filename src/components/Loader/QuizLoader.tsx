import React from 'react';
import { Brain, Sparkles } from 'lucide-react';

const phrases = [
  "Brewing brilliant questions...",
  "Training mini AI professors...",
  "Crafting knowledge challenges...",
  "Sprinkling quiz magic...",
  "Gathering wisdom bytes..."
];

const QuizLoader = () => {
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];

  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center p-8 rounded-xl">
        <div className="relative inline-block mb-6">
          <Brain className="w-12 h-12 text-purple-500 animate-bounce" />
          <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
        </div>
        <h3 className="text-xl font-semibold mb-2 dark:text-white">
          {randomPhrase}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Creating your personalized quiz experience
        </p>
      </div>
    </div>
  );
};

export default QuizLoader;