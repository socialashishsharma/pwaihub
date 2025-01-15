import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import FileUpload from '../../components/Upload/FileUpload';
import FlashcardViewer from './components/FlashcardViewer';
import FlashcardOptions from './components/FlashcardOptions';
import { AITextProcessor } from '../../services/ai/textProcessor';
import { Flashcard } from '../../types/flashcard';

const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [numCards, setNumCards] = useState<number | undefined>();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUpload = async (content: string) => {
    setIsProcessing(true);
    try {
      const cards = await AITextProcessor.generateFlashcards(content, {
        numCards,
        onProgress: setUploadProgress
      });
      setFlashcards(cards);
      toast.success('Flashcards generated successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate flashcards');
    } finally {
      setIsProcessing(false);
      setUploadProgress(0);
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
            <FileUpload
              onUpload={handleUpload}
              isProcessing={isProcessing}
              label="Upload Study Material"
            />
            {uploadProgress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
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