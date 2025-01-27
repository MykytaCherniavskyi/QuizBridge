import { storage } from '@/lib/storage';
import { Middleware } from '@reduxjs/toolkit';
import { initializeTodos, setTodos } from './todo.slice';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function convertToArray<T>(obj: unknown): T[] {
  if (Array.isArray(obj)) {
    return obj;
  }
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    return Object.values(obj);
  }
  return [];
}

function isValidTodo(item: unknown): item is Todo {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof (item as Todo).id === 'string' &&
    typeof (item as Todo).text === 'string' &&
    typeof (item as Todo).completed === 'boolean'
  );
}

function isValidTodoArray(data: unknown): data is Todo[] {
  const array = convertToArray<unknown>(data);
  return array.every(isValidTodo);
}

export const chromeStorageMiddleware: Middleware = (store) => {
  // Load initial state from storage
  storage.local.get(['todos']).then((result) => {
    const todosArray = convertToArray<Todo>(result.todos);
    if (todosArray.length > 0 && isValidTodoArray(todosArray)) {
      store.dispatch(setTodos(todosArray));
    } else {
      store.dispatch(initializeTodos());
    }
  });

  // In extension context, listen for changes in other windows/tabs
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.todos) {
        const todosArray = convertToArray<Todo>(changes.todos.newValue);
        if (isValidTodoArray(todosArray)) {
          store.dispatch(setTodos(todosArray));
        }
      }
    });
  }

  return (next) => (action) => {
    return next(action);
  };
}; 