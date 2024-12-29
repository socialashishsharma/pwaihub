import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, Loader, CheckCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface EssayUploadProps {
  onUpload: (content: string) => void;
  isProcessing: boolean;
  label?: string;
  isReference?: boolean;
}

type UploadState = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

const EssayUpload: React.FC<EssayUploadProps> = ({ 
  onUpload, 
  isProcessing,
  label,
  isReference = false
}) => {
  const [uploadState, setUploadState] = useState<UploadState>('idle');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number } | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: async (files) => {
      const file = files[0];
      try {
        setUploadState('uploading');
        setUploadedFile({
          name: file.name,
          size: file.size
        });

        if (file.type === 'text/plain') {
          const content = await file.text();
          onUpload(content);
          setUploadState('success');
          toast.success(`${isReference ? 'Reference' : 'Essay'} uploaded successfully!`);
          return;
        }

        setUploadState('processing');
        const reader = new FileReader();
        reader.onload = async (e) => {
          const content = e.target?.result as string;
          onUpload(content);
          setUploadState('success');
          toast.success(`${isReference ? 'Reference' : 'Essay'} processed successfully!`);
        };
        reader.readAsText(file);
      } catch (error) {
        setUploadedFile(null);
        setUploadState('error');
        toast.error('Error processing file. Please try again.');
        console.error('Error processing file:', error);
      }
    },
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt']
    },
    multiple: false,
    disabled: isProcessing || uploadState === 'processing',
    maxSize: 10 * 1024 * 1024
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    setUploadState('idle');
    onUpload('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStateIcon = () => {
    switch (uploadState) {
      case 'uploading':
        return <Loader className="w-8 h-8 text-yellow-500 animate-spin" />;
      case 'processing':
        return <Loader className="w-8 h-8 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'error':
        return <X className="w-8 h-8 text-red-500" />;
      default:
        return <Upload className="w-12 h-12 text-blue-500" />;
    }
  };

  const getStateMessage = () => {
    switch (uploadState) {
      case 'uploading':
        return 'Uploading file...';
      case 'processing':
        return 'Processing document...';
      case 'success':
        return 'Upload complete!';
      case 'error':
        return 'Upload failed';
      default:
        return isReference 
          ? 'Drop reference material here or click to browse'
          : 'Drop your essay here or click to browse';
    }
  };

  const getUploadStateStyles = () => {
    const baseStyles = 'relative p-8 border-2 border-dashed rounded-lg transition-all duration-300';
    const stateStyles = {
      idle: isDragActive 
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
        : 'border-gray-300 dark:border-gray-700 hover:border-blue-500',
      uploading: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
      processing: 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
      success: 'border-green-500 bg-green-50 dark:bg-green-900/20',
      error: 'border-red-500 bg-red-50 dark:bg-red-900/20'
    };

    return `${baseStyles} ${stateStyles[uploadState]}`;
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label || (isReference ? 'Reference Material' : 'Essay Upload')}
        </h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {isReference ? 'Optional' : 'Required'}
        </span>
      </div>

      <div
        {...getRootProps()}
        className={`${getUploadStateStyles()} ${
          (isProcessing || uploadState === 'processing') ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        <input {...getInputProps()} />
        
        {uploadedFile ? (
          <div className="flex items-center justify-center space-x-4">
            {getStateIcon()}
            <div className="text-left flex-1">
              <h4 className="font-medium dark:text-white">{uploadedFile.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatFileSize(uploadedFile.size)}
              </p>
              <p className="text-xs mt-1 font-medium" style={{ color: getStateColor(uploadState) }}>
                {getStateMessage()}
              </p>
            </div>
            {uploadState !== 'processing' && uploadState !== 'uploading' && (
              <button
                onClick={handleRemove}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500 hover:text-red-500" />
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            {getStateIcon()}
            <p className="mt-4 text-sm font-medium dark:text-white">
              {getStateMessage()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Supports PDF, PNG, JPEG, and TXT files (max 10MB)
            </p>
          </div>
        )}

        {(uploadState === 'processing' || uploadState === 'uploading') && (
          <div className="absolute inset-0 bg-white/50 dark:bg-gray-900/50 flex items-center justify-center rounded-lg backdrop-blur-sm">
            <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg">
              <Loader className="w-5 h-5 animate-spin" style={{ color: getStateColor(uploadState) }} />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {getStateMessage()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getStateColor = (state: UploadState): string => {
  switch (state) {
    case 'uploading':
      return '#EAB308'; // yellow-500
    case 'processing':
      return '#3B82F6'; // blue-500
    case 'success':
      return '#22C55E'; // green-500
    case 'error':
      return '#EF4444'; // red-500
    default:
      return '#3B82F6'; // blue-500
  }
};

export default EssayUpload;