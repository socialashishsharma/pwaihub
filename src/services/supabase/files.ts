import { supabase } from '../supabase';
import { UserFile } from '../../types';

export async function uploadFile(file: File, userId: string): Promise<UserFile> {
  try {
    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);

    // Create file record in database
    const { data: fileRecord, error: dbError } = await supabase
      .from('files')
      .insert({
        user_id: userId,
        name: file.name,
        type: file.type,
        size: file.size,
        url: publicUrl
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return {
      id: fileRecord.id,
      userId: fileRecord.user_id,
      name: fileRecord.name,
      type: fileRecord.type,
      size: fileRecord.size,
      url: fileRecord.url,
      createdAt: fileRecord.created_at
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}