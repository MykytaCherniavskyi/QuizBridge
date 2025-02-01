export type Theme = 'light' | 'dark';

export interface SettingsState {
  isInitialized: boolean;
  hasInteractedWithEmptyWords: boolean;
  hasInteractedWithEmptySets: boolean;
  theme: Theme;
}
