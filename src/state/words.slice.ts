import { storage } from '@/app/storage';
import { Word, WordsState } from '@/types/words.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: WordsState = {
  words: [],
  isInitialized: false,
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWord: (state, action: PayloadAction<string>) => {
      const newWord = {
        id: Date.now().toString(),
        text: action.payload,
        definition: '',
        selected: false,
      };
      state.words.push(newWord);
      // Save to storage
      storage.local.set({ words: [...state.words] });
    },
    toggleWords: (state, action: PayloadAction<string[]>) => {
      const words = state.words.filter((word) => action.payload.includes(word.id));
      words.forEach((word) => {
        word.selected = !word.selected;
      });
      // Save to storage
      storage.local.set({ words: [...state.words] });
    },
    editWord: (state, action: PayloadAction<{ id: string; text: string; definition?: string }>) => {
      const word = state.words.find((word) => word.id === action.payload.id);
      if (word) {
        word.text = action.payload.text;
        if (action.payload.definition !== undefined) {
          word.definition = action.payload.definition;
        }
        // Save to storage
        storage.local.set({ words: [...state.words] });
      }
    },
    deleteWords: (state, action: PayloadAction<string[]>) => {
      state.words = state.words.filter((word) => !action.payload.includes(word.id));
      // Save to storage
      storage.local.set({ words: [...state.words] });
    },
    setWords: (state, action: PayloadAction<Word[]>) => {
      // Ensure we're working with an array
      state.words = [...(Array.isArray(action.payload) ? action.payload : [])];
      state.isInitialized = true;
    },
    initializeWords: (state) => {
      state.words = [];
      state.isInitialized = true;
    },
  },
});

export const { addWord, toggleWords, editWord, deleteWords, setWords, initializeWords } = wordsSlice.actions;
export default wordsSlice.reducer;