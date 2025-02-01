import { RootState } from '@/app/store';

export const selectSettingsInitialized = (state: RootState) => state.settings.isInitialized;
export const selectHasInteractedWithEmptyWords = (state: RootState) => state.settings.hasInteractedWithEmptyWords;
export const selectHasInteractedWithEmptySets = (state: RootState) => state.settings.hasInteractedWithEmptySets; 