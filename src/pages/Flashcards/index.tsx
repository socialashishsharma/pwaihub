import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import EssayUpload from '../../components/essay/EssayUpload';
import FlashcardViewer from './components/FlashcardViewer';
import FlashcardOptions from './components/FlashcardOptions';
import { generateFlashcards } from '../../services/flashcards/generator';
import { Flashcard } from '../../types/flashcard';

const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [numCards, setNumCards] = useState<number | undefined>();
  const navigate = useNavigate();

  const handleUpload = async (content: string) => {
    setIsProcessing(true);
    try {
      const cards = await generateFlashcards(content, numCards);
      setFlashcards(cards);
      toast.success('Flashcards generated successfully!');
    } catch (error) {
      toast.error('Failed to generate flashcards');
      console.error('Flashcard generation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 dark:text-white">
            Smart Flashcards
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Generate interactive flashcards from your study materials
          </p>
        </div>

        {flashcards.length === 0 ? (
          <div className="space-y-8">
            <EssayUpload
              onUpload={handleUpload}
              isProcessing={isProcessing}
              label="Upload Study Material"
            />
            <FlashcardOptions
              numCards={numCards}
              onNumCardsChange={setNumCards}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setFlashcards([])}
              className="btn-secondary"
            >
              ← Generate New Flashcards
            </button>
            <FlashcardViewer flashcards={flashcards} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardsPage;