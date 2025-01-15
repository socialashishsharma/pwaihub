import { useState } from 'react';
import { useStore } from '../store/useStore';
import { uploadFile } from '../services/supabase/files';
import { createActivity } from '../services/supabase/activities';
import { processDocument } from '../services/documentProcessor';
import { toast } from 'react-hot-toast';

export function useFileUpload() {
  const { user, addFile, addActivity, addDocument } = useStore();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = async (file: File) => {
    if (!user) {
      toast.error('Please sign in to upload files');
      return;
    }

    setIsUploading(true);
    setProgress(0);

    try {
      // Upload file to Supabase
      const uploadedFile = await uploadFile(file, user.id);
      addFile(uploadedFile);
      setProgress(50);

      // Process document
      const processedDoc = await processDocument(file);
      const document = {
        ...processedDoc,
        fileId: uploadedFile.id,
        userId: user.id
      };
      addDocument(document);
      setProgress(75);

      // Create activity
      const activity = await createActivity(
        user.id,
        'document',
        `Uploaded ${file.name}`,
        { fileId: uploadedFile.id }
      );
      addActivity(activity);
      setProgress(100);

      toast.success('File uploaded successfully!');
      return document;
    } catch (error) {
      toast.error('Failed to upload file');
      throw error;
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return {
    upload,
    isUploading,
    progress
  };
}