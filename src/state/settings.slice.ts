import { storage } from '@/app/storage';
import { SettingsState, Theme } from '@/types/settings.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SettingsState = {
  isInitialized: false,
  hasInteractedWithEmptyWords: false,
  hasInteractedWithEmptySets: false,
  theme: 'dark',
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
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      storage.local.set({ settings: { ...state } });
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      storage.local.set({ settings: { ...state } });
    },
  },
});

export const { 
  setSettings, 
  markEmptyWordsInteraction, 
  markEmptySetsInteraction, 
  initializeSettings,
  setTheme,
  toggleTheme
} = settingsSlice.actions;
export default settingsSlice.reducer; 