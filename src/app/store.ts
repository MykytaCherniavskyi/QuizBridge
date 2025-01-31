import { chromeStorageMiddleware } from '@/state/chrome-storage.middleware';
import setsReducer from '@/state/sets.slice';
import wordsReducer from '@/state/words.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    words: wordsReducer,
    sets: setsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(chromeStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
