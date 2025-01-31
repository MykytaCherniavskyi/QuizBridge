export interface QuizletSet {
  id: string;
  url: string;
  description: string;
  selected: boolean;
}

export interface SetsState {
  sets: QuizletSet[];
  selectedSet: QuizletSet | null;
  isInitialized: boolean;
}
