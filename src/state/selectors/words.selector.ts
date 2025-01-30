import { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';

// Words Selectors
export const selectWords = (state: RootState) => state.words.words;
export const selectWordsInitialized = (state: RootState) => state.words.isInitialized;

export const selectSelectedWords = createSelector(
  [selectWords],
  (words) => words.filter((word) => word.selected)
);

export const selectWordById = createSelector(
  [selectWords, (state: RootState, wordId: string) => wordId],
  (words, wordId) => words.find((word) => word.id === wordId)
);

export const selectWordsCount = createSelector(
  [selectWords],
  (words) => words.length
);

export const selectSelectedWordsCount = createSelector(
  [selectSelectedWords],
  (selectedWords) => selectedWords.length
);