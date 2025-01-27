import { chromeStorageMiddleware } from '@/state/chrome-storage.middleware';
import counterReducer from '@/state/counter.slice';
import { pokemonApiSlice } from '@/state/pokemon-api.slice';
import todoReducer from '@/state/todo.slice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer,
    [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(pokemonApiSlice.middleware)
      .concat(chromeStorageMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
