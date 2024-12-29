import React from 'react';
import { HelpCircle } from 'lucide-react';

interface FlashcardOptionsProps {
  numCards?: number;
  onNumCardsChange: (num: number | undefined) => void;
}

const FlashcardOptions: React.FC<FlashcardOptionsProps> = ({
  numCards,
  onNumCardsChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold dark:text-white">
            Flashcard Options
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Customize your flashcard generation
          </p>
        </div>
        <div className="relative group">
          <HelpCircle className="w-5 h-5 text-gray-400" />
          <div className="absolute right-0 w-64 p-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            Leave empty for AI to determine the optimal number of flashcards
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Number of Flashcards (Optional)
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={numCards || ''}
            onChange={(e) => onNumCardsChange(e.target.value ? Number(e.target.value) : undefined)}
            placeholder="AI will optimize if left empty"
            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default FlashcardOptions;