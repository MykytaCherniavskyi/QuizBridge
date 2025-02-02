export interface QuizletSet {
  id: string;
  url: string;
  description: string;
}

export interface SetsState {
  sets: QuizletSet[];
  selectedSet: QuizletSet | null;
  selectedSetIds: string[];
  isInitialized: boolean;
}
