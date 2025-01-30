import { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';

// Sets Selectors
export const selectSets = (state: RootState) => state.sets.sets;
export const selectSetsInitialized = (state: RootState) => state.sets.isInitialized;
export const selectSelectedSet = (state: RootState) => state.sets.selectedSet;

export const selectFormattedSets = createSelector(
  [selectSets],
  (sets) => sets.map((set) => ({
    value: `${set.description}-${set.id}`,
    label: set.description,
  }))
);

export const selectSetById = createSelector(
  [selectSets, (state: RootState, setId: string) => setId],
  (sets, setId) => sets.find((set) => set.id === setId)
);

export const selectSetsCount = createSelector(
  [selectSets],
  (sets) => sets.length
);

export const selectSelectedSets = createSelector(
  [selectSets],
  (sets) => sets.filter((set) => set.selected)
); 