import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserActivity } from '../../types';

interface ActivitiesState {
  activities: UserActivity[];
  loading: boolean;
  error: string | null;
}

const initialState: ActivitiesState = {
  activities: [],
  loading: false,
  error: null
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<UserActivity[]>) => {
      state.activities = action.payload;
    },
    addActivity: (state, action: PayloadAction<UserActivity>) => {
      state.activities.unshift(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const {
  setActivities,
  addActivity,
  setLoading,
  setError
} = activitiesSlice.actions;
export default activitiesSlice.reducer;