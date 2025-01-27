import { storage } from '@/lib/storage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  isInitialized: boolean;
}

const initialState: TodoState = {
  todos: [],
  isInitialized: false,
};

// Load initial state from storage
storage.local.get(['todos']).then((result) => {
  if (result.todos) {
    initialState.todos = result.todos;
    initialState.isInitialized = true;
  }
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = {
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
      // Save to storage
      storage.local.set({ todos: [...state.todos] });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        // Save to storage
        storage.local.set({ todos: [...state.todos] });
      }
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        // Save to storage
        storage.local.set({ todos: [...state.todos] });
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      // Save to storage
      storage.local.set({ todos: [...state.todos] });
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      // Ensure we're working with an array
      state.todos = [...(Array.isArray(action.payload) ? action.payload : [])];
      state.isInitialized = true;
    },
    initializeTodos: (state) => {
      state.todos = [];
      state.isInitialized = true;
    },
  },
});

export const { addTodo, toggleTodo, editTodo, deleteTodo, setTodos, initializeTodos } = todoSlice.actions;
export default todoSlice.reducer; 