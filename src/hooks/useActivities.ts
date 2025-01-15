import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { getActivities } from '../services/supabase/activities';
import { UserActivity } from '../types';

export function useActivities() {
  const { user } = useStore();
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (user) {
      fetchActivities();
    }
  }, [user]);

  const fetchActivities = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await getActivities(user.id);
      setActivities(data);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Failed to fetch activities'));
    } finally {
      setLoading(false);
    }
  };

  return {
    activities,
    loading,
    error,
    refetch: fetchActivities
  };
}