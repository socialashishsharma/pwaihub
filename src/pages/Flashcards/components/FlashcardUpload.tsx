import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader } from 'lucide-react';
import { processDocument, DocumentProcessingError } from '../../../services/documentProcessor';
import { toast } from 'react-hot-toast';

interface FlashcardUploadProps {
  onUpload: (content: string) => Promise<void>;
  isGenerating: boolean;
}

const FlashcardUpload: React.FC<FlashcardUploadProps> = ({ 
  onUpload, 
  isGenerating 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (files) => {
      if (files.length === 0) {
        toast.error('Please select a file');
        return;
      }
      
      setIsProcessing(true);
      try {
        const file = files[0];
        
        // Validate file size before processing
        const MAX_SIZE = 10 * 1024 * 1024; // 10MB
        if (file.size > MAX_SIZE) {
          throw new DocumentProcessingError('File size exceeds 10MB limit');
        }

        const processedDoc = await processDocument(file);
        if (!processedDoc.content.trim()) {
          throw new DocumentProcessingError('No text content found in document');
        }

        await onUpload(processedDoc.content);
      } catch (error) {
        console.error('Upload error:', error);
        toast.error(
          error instanceof DocumentProcessingError
            ? error.message
            : 'Failed to process document. Please try again.'
        );
      } finally {
        setIsProcessing(false);
      }
    },
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt']
    },
    multiple: false,
    disabled: isGenerating || isProcessing,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const isLoading = isGenerating || isProcessing;

  return (
    <div
      {...getRootProps()}
      className={`
        p-8 border-2 border-dashed rounded-lg text-center transition-colors
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-300 dark:border-gray-700'
        }
        ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer hover:border-blue-500'}
      `}
    >
      <input {...getInputProps()} />
      {isLoading ? (
        <div className="flex flex-col items-center">
          <Loader className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="mt-4 text-lg font-medium dark:text-white">
            {isProcessing ? 'Processing document...' : 'Generating flashcards...'}
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            This may take a moment
          </p>
        </div>
      ) : (
        <div>
          <Upload className="w-12 h-12 text-blue-500 mx-auto" />
          <p className="mt-4 text-lg font-medium dark:text-white">
            Drop your study material here
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Supports PDF and TXT files (max 10MB)
          </p>
        </div>
      )}
    </div>
  );
};

export default FlashcardUpload;