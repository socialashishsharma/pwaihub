import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { processDocument } from '../../services/document/processor';
import { DocumentProcessingError } from '../../services/document/errors';
import { ALL_SUPPORTED_TYPES, FILE_TYPE_EXTENSIONS } from '../../services/document/config';

interface DocumentUploadProps {
  onUpload: (content: string) => Promise<void>;
  isProcessing: boolean;
  label?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onUpload,
  isProcessing,
  label
}) => {
  const [uploadError, setUploadError] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (files) => {
      if (files.length === 0) return;
      
      setUploadError(null);
      
      try {
        const result = await processDocument(files[0]);
        await onUpload(result.content);
      } catch (error) {
        console.error('Document processing error:', error);
        const errorMessage = error instanceof DocumentProcessingError
          ? error.message
          : 'Failed to process document';
        setUploadError(errorMessage);
        toast.error(errorMessage);
      }
    },
    accept: FILE_TYPE_EXTENSIONS,
    multiple: false,
    disabled: isProcessing,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  return (
    <div className="space-y-4">
      {uploadError && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
          <div className="flex items-start">
            <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-700 dark:text-red-200">{uploadError}</p>
            </div>
            <button
              onClick={() => setUploadError(null)}
              className="ml-4 text-red-500 hover:text-red-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div
        {...getRootProps()}
        className={`
          p-8 border-2 border-dashed rounded-lg text-center transition-colors
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-700'
          }
          ${isProcessing ? 'cursor-not-allowed' : 'cursor-pointer hover:border-blue-500'}
        `}
      >
        <input {...getInputProps()} />
        
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="mt-4 text-lg font-medium dark:text-white">
              Processing document...
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              This may take a moment
            </p>
          </div>
        ) : (
          <div>
            <Upload className="w-12 h-12 text-blue-500 mx-auto" />
            <p className="mt-4 text-lg font-medium dark:text-white">
              {label || 'Drop your document here'}
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Supports PDF, Word, PowerPoint, Images, and Text files (max 10MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;