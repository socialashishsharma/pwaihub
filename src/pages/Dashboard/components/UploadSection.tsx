import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useStore } from '../../../store/useStore';
import { processDocument, DocumentProcessingError } from '../../../services/documentProcessor';
import UploadError from '../../../components/Upload/UploadError';
import UploadProgress from '../../../components/Upload/UploadProgress';

const UploadSection: React.FC = () => {
  const addDocument = useStore((state) => state.addDocument);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    setIsProcessing(true);
    
    try {
      const file = acceptedFiles[0];
      const processedDoc = await processDocument(file);
      addDocument(processedDoc);
    } catch (error) {
      if (error instanceof DocumentProcessingError) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred while processing the document');
      }
      console.error('Error processing document:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [addDocument]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'],
      'text/plain': ['.txt']
    },
    multiple: false,
    disabled: isProcessing
  });

  return (
    <div className="space-y-4">
      {error && (
        <UploadError 
          message={error} 
          onDismiss={() => setError(null)} 
        />
      )}
      
      {isProcessing ? (
        <UploadProgress />
      ) : (
        <div
          {...getRootProps()}
          className={`
            p-8 border-2 border-dashed rounded-lg text-center cursor-pointer
            transition-colors duration-200
            ${isDragActive 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-700 hover:border-blue-500'
            }
          `}
        >
          <input {...getInputProps()} />
          <Upload className="w-8 h-8 mx-auto mb-4 text-blue-500" />
          <p className="text-lg font-medium dark:text-white">
            {isDragActive
              ? 'Drop your documents here'
              : 'Drag & drop documents or click to browse'
            }
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Supports PDF, PNG, JPEG, and TXT files
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadSection;