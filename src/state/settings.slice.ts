import { storage } from '@/app/storage';
import { SettingsState } from '@/types/settings.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SettingsState = {
  isInitialized: false,
  hasInteractedWithEmptyWords: false,
  hasInteractedWithEmptySets: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Partial<SettingsState>>) => {
      Object.assign(state, action.payload);
    },
    markEmptyWordsInteraction: (state) => {
      state.hasInteractedWithEmptyWords = true;
      // Save to storage
      storage.local.set({ settings: { ...state } });
    },
    markEmptySetsInteraction: (state) => {
      state.hasInteractedWithEmptySets = true;
      // Save to storage
      storage.local.set({ settings: { ...state } });
    },
    initializeSettings: (state) => {
      state.isInitialized = true;
    },
  },
});

export const { 
  setSettings, 
  markEmptyWordsInteraction, 
  markEmptySetsInteraction, 
  initializeSettings 
} = settingsSlice.actions;
export default settingsSlice.reducer; 