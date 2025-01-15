import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Loader2, X } from 'lucide-react';
import { useFileUpload } from '../../hooks/useFileUpload';
import { getAcceptedFileTypes } from '../../services/document/config';
import { toast } from 'react-hot-toast';

interface FileUploadProps {
  onUpload: (content: string) => void;
  isProcessing?: boolean;
  label?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUpload,
  isProcessing = false,
  label
}) => {
  const { upload, isUploading, error, reset } = useFileUpload({
    onSuccess: (result) => {
      onUpload(result.content);
      toast.success('File processed successfully!');
    }
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (files) => {
      if (files.length === 0) return;
      await upload(files[0]);
    },
    accept: getAcceptedFileTypes(),
    multiple: false,
    disabled: isProcessing || isUploading,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const isLoading = isProcessing || isUploading;

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
          <div className="flex items-start">
            <X className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-700 dark:text-red-200">{error.message}</p>
            </div>
            <button
              onClick={reset}
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
          ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'}
          ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer hover:border-blue-500'}
        `}
      >
        <input {...getInputProps()} />
        
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="mt-4 text-lg font-medium dark:text-white">
              {isProcessing ? 'Processing document...' : 'Uploading file...'}
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

export default FileUpload;