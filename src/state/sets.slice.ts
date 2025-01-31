import { storage } from '@/app/storage';
import { QuizletSet, SetsState } from '@/types/sets.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SetsState = {
  sets: [],
  selectedSet: null,
  isInitialized: false,
};

const setsSlice = createSlice({
  name: 'sets',
  initialState,
  reducers: {
    addSet: (state, action: PayloadAction<{ url: string; description: string }>) => {
      const newSet = {
        id: Date.now().toString(),
        url: action.payload.url,
        description: action.payload.description,
        selected: false,
      };
      state.sets.push(newSet);
      // Save to storage
      storage.local.set({ sets: [...state.sets] });

      // If this is the first set, select it
      if (state.sets.length === 1) {
        state.selectedSet = newSet;
        storage.local.set({ selectedSet: newSet });
      }
    },
    toggleSet: (state, action: PayloadAction<string>) => {
      const set = state.sets.find((set) => set.id === action.payload);
      if (set) {
        set.selected = !set.selected;
        // Save to storage
        storage.local.set({ sets: [...state.sets] });
      }
    },
    editSet: (state, action: PayloadAction<{ id: string; url: string; description: string }>) => {
      const set = state.sets.find((set) => set.id === action.payload.id);
      console.log('set', set, action.payload);
      if (set) {
        set.url = action.payload.url;
        set.description = action.payload.description;
        // Save to storage
        storage.local.set({ sets: [...state.sets] });

        // If the set is selected, update the selected set
        if (state.selectedSet?.id === set.id) {
          console.log('selectedSet', set);
          state.selectedSet = set;
          storage.local.set({ selectedSet: set });
        }
      }
    },
    deleteSets: (state, action: PayloadAction<string[]>) => {
      let setToRemove: QuizletSet | null = null;
      state.sets = state.sets.filter((set) => {
        const result = !action.payload.includes(set.id);

        if (!result && set.id === state.selectedSet?.id) {
          setToRemove = set;
        }

        return result;
      });
      // Save to storage
      storage.local.set({ sets: [...state.sets] });

      // If the set was deleted, update the selected set
      if (setToRemove) {
        state.selectedSet = null;
        storage.local.set({ selectedSet: null });
      }
    },
    setSelectedSet: (state, action: PayloadAction<QuizletSet | null>) => {
      state.selectedSet = action.payload;
      // Save to storage
      storage.local.set({ selectedSet: action.payload });
    },
    setSets: (state, action: PayloadAction<QuizletSet[]>) => {
      // Ensure we're working with an array
      state.sets = [...(Array.isArray(action.payload) ? action.payload : [])];
      state.isInitialized = true;
    },
    initializeSets: (state) => {
      state.sets = [];
      state.isInitialized = true;
    },
  },
});

export const { addSet, toggleSet, editSet, deleteSets, setSets, initializeSets, setSelectedSet } = setsSlice.actions;
export default setsSlice.reducer; 