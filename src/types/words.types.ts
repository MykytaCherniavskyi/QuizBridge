
export interface Word {
  id: string;
  text: string;
  definition: string;
  selected: boolean;
}

export interface WordsState {
  words: Word[];
  isInitialized: boolean;
}