import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { Flashcard } from '../../../types/flashcard';

interface FlashcardViewerProps {
  flashcards: Flashcard[];
}

const FlashcardViewer: React.FC<FlashcardViewerProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const colors = [
    'bg-yellow-100',
    'bg-pink-100',
    'bg-blue-100',
    'bg-green-100',
    'bg-purple-100'
  ];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="space-y-6">
      {/* Sticky Note Flashcard */}
      <div className="relative h-[400px] perspective-1000">
        <div
          className={`
            absolute inset-0 transform-style-3d transition-transform duration-700
            ${isFlipped ? 'rotate-y-180' : ''}
            cursor-pointer
          `}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of the sticky note */}
          <div 
            className={`
              absolute inset-0 backface-hidden
              ${colors[currentIndex % colors.length]}
              rounded-lg shadow-lg p-8
              transform rotate-1
              border-b-8 border-r-8 border-opacity-10 border-black
            `}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-200 -mt-2 rounded-b-lg shadow-inner"></div>
            <div className="h-full flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl font-handwritten mb-4 text-gray-800">
                {flashcards[currentIndex].front}
              </h3>
              <p className="text-sm text-gray-600 mt-4 font-handwritten">
                (tap to flip)
              </p>
            </div>
          </div>

          {/* Back of the sticky note */}
          <div 
            className={`
              absolute inset-0 backface-hidden rotate-y-180
              ${colors[(currentIndex + 2) % colors.length]}
              rounded-lg shadow-lg p-8
              transform -rotate-1
              border-b-8 border-r-8 border-opacity-10 border-black
            `}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-200 -mt-2 rounded-b-lg shadow-inner"></div>
            <div className="h-full overflow-auto">
              <div 
                className="prose prose-sm max-w-none font-handwritten text-gray-800"
                dangerouslySetInnerHTML={{ __html: flashcards[currentIndex].back }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="text-sm font-handwritten">
          Card {currentIndex + 1} of {flashcards.length}
        </span>
        <button
          onClick={handleNext}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardViewer;