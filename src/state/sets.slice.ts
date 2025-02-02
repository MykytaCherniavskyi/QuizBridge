import { storage } from '@/app/storage';
import { QuizletSet, SetsState } from '@/types/sets.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: SetsState = {
  sets: [],
  selectedSet: null,
  selectedSetIds: [],
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
      };
      state.sets.push(newSet);
      
      storage.local.set({ 
        sets: state.sets,
      });

      // If this is the first set, select it
      if (state.sets.length === 1) {
        state.selectedSet = newSet;
        storage.local.set({ selectedSet: newSet });
      }
    },
    toggleSet: (state, action: PayloadAction<string>) => {
      const setId = action.payload;
      const index = state.selectedSetIds.indexOf(setId);
      
      if (index === -1) {
        state.selectedSetIds.push(setId);
      } else {
        state.selectedSetIds.splice(index, 1);
      }
    },
    toggleAllSets: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.selectedSetIds = state.sets.map(set => set.id);
      } else {
        state.selectedSetIds = [];
      }
    },
    editSet: (state, action: PayloadAction<{ id: string; url: string; description: string }>) => {
      const setIndex = state.sets.findIndex((set) => set.id === action.payload.id);
      if (setIndex !== -1) {
        const updatedSet = {
          ...state.sets[setIndex],
          url: action.payload.url,
          description: action.payload.description,
        };
        state.sets[setIndex] = updatedSet;
        
        storage.local.set({ sets: state.sets });

        // If the set is selected, update the selected set
        if (state.selectedSet?.id === updatedSet.id) {
          state.selectedSet = updatedSet;
          storage.local.set({ selectedSet: updatedSet });
        }
      }
    },
    deleteSets: (state, action: PayloadAction<string[]>) => {
      const idsToDelete = new Set(action.payload);
      let setToRemove: QuizletSet | null = null;
      
      state.sets = state.sets.filter((set) => {
        const shouldKeep = !idsToDelete.has(set.id);
        if (!shouldKeep && set.id === state.selectedSet?.id) {
          setToRemove = set;
        }
        return shouldKeep;
      });
      
      // Remove deleted IDs from selection
      state.selectedSetIds = state.selectedSetIds.filter(id => !idsToDelete.has(id));
      
      storage.local.set({ 
        sets: state.sets,
      });

      // If the selected set was deleted, update it
      if (setToRemove) {
        state.selectedSet = null;
        storage.local.set({ selectedSet: null });
      }
    },
    setSelectedSet: (state, action: PayloadAction<QuizletSet | null>) => {
      state.selectedSet = action.payload;
      storage.local.set({ selectedSet: action.payload });
    },
    setSets: (state, action: PayloadAction<QuizletSet[]>) => {
      state.sets = [...(Array.isArray(action.payload) ? action.payload : [])];
      state.isInitialized = true;
    },
    initializeSets: (state) => {
      state.sets = [];
      state.isInitialized = true;
    },
  },
});

export const { 
  addSet, 
  toggleSet, 
  toggleAllSets,
  editSet, 
  deleteSets, 
  setSets,
  initializeSets, 
  setSelectedSet 
} = setsSlice.actions;
export default setsSlice.reducer; 