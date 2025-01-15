import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Document, UserFile } from '../../types';

interface DocumentsState {
  documents: Document[];
  files: UserFile[];
  loading: boolean;
  error: string | null;
}

const initialState: DocumentsState = {
  documents: [],
  files: [],
  loading: false,
  error: null
};

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<Document[]>) => {
      state.documents = action.payload;
    },
    addDocument: (state, action: PayloadAction<Document>) => {
      state.documents.push(action.payload);
    },
    setFiles: (state, action: PayloadAction<UserFile[]>) => {
      state.files = action.payload;
    },
    addFile: (state, action: PayloadAction<UserFile>) => {
      state.files.push(action.payload);
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
  setDocuments,
  addDocument,
  setFiles,
  addFile,
  setLoading,
  setError
} = documentsSlice.actions;
export default documentsSlice.reducer;