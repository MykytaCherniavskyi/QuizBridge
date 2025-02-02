export type Theme = 'light' | 'dark';

export interface Settings {
  hasInteractedWithEmptyWords: boolean;
  hasInteractedWithEmptySets: boolean;
  theme: Theme;
}

export interface SettingsState extends Settings {
  isInitialized: boolean;
}
