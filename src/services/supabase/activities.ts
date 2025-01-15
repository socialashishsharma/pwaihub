import { supabase } from '../supabase';
import { UserActivity } from '../../types';

export async function createActivity(
  userId: string,
  type: 'quiz' | 'essay' | 'flashcard' | 'document',
  action: string,
  metadata: Record<string, any> = {}
): Promise<UserActivity> {
  try {
    const { data, error } = await supabase
      .from('activities')
      .insert({
        user_id: userId,
        type,
        action,
        metadata
      })
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      userId: data.user_id,
      type: data.type,
      action: data.action,
      metadata: data.metadata,
      createdAt: data.created_at
    };
  } catch (error) {
    console.error('Error creating activity:', error);
    throw error;
  }
}

export async function getActivities(userId: string): Promise<UserActivity[]> {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) throw error;

    return data.map(activity => ({
      id: activity.id,
      userId: activity.user_id,
      type: activity.type,
      action: activity.action,
      metadata: activity.metadata,
      createdAt: activity.created_at
    }));
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
}