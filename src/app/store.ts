import { chromeStorageMiddleware } from '@/state/chrome-storage.middleware';
import { pokemonApiSlice } from '@/state/pokemon-api.slice';
import setsReducer from '@/state/sets.slice';
import wordsReducer from '@/state/words.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    words: wordsReducer,
    sets: setsReducer,
    [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(pokemonApiSlice.middleware)
      .concat(chromeStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
