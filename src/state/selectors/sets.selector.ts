import { RootState } from '@/app/store';
import { QuizletSet } from '@/types/sets.types';
import { createSelector } from '@reduxjs/toolkit';

// Base Selectors
export const selectSets = (state: RootState) => state.sets.sets;
export const selectSetsInitialized = (state: RootState) => state.sets.isInitialized;
export const selectSelectedSet = (state: RootState) => state.sets.selectedSet;
export const selectSelectedSetIds = (state: RootState) => state.sets.selectedSetIds;

// Memoized Selectors
export const selectFormattedSets = createSelector(
  [selectSets],
  (sets) => sets.map((set) => ({
    value: `${set.description}-${set.id}`,
    label: set.description,
  }))
);

export const selectSetById = createSelector(
  [selectSets, (_state: RootState, setId: string) => setId],
  (sets, setId) => sets.find((set) => set.id === setId)
);

export const selectSetsCount = createSelector(
  [selectSets],
  (sets) => sets.length
);

export const selectSelectedSetsMap = createSelector(
  [selectSelectedSetIds],
  (selectedIds): Record<string, boolean> => {
    const selectedMap: Record<string, boolean> = {};
    selectedIds.forEach(id => {
      selectedMap[id] = true;
    });
    return selectedMap;
  }
);

export const selectSelectedSets = createSelector(
  [selectSets, selectSelectedSetIds],
  (sets, selectedIds): QuizletSet[] => {
    const selectedMap = new Set(selectedIds);
    return sets.filter(set => selectedMap.has(set.id));
  }
);

export const selectAreAllSetsSelected = createSelector(
  [selectSets, selectSelectedSetIds],
  (sets, selectedIds) => sets.length > 0 && sets.length === selectedIds.length
); 