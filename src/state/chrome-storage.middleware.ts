import { storage } from '@/app/storage';
import { QuizletSet } from '@/types/sets.types';
import { Settings } from '@/types/settings.types';
import { Word } from '@/types/words.types';
import { Middleware } from '@reduxjs/toolkit';
import { initializeSets, setSelectedSet, setSets } from './sets.slice';
import { initializeSettings, setSettings } from './settings.slice';
import { initializeWords, setWords } from './words.slice';

function convertToArray<T>(obj: unknown): T[] {
  if (Array.isArray(obj)) {
    return obj;
  }
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    return Object.values(obj);
  }
  return [];
}

function isValidWord(item: unknown): item is Word {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof (item as Word).id === 'string' &&
    typeof (item as Word).text === 'string' &&
    typeof (item as Word).selected === 'boolean'
  );
}

function isValidSet(item: unknown): item is QuizletSet {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof (item as QuizletSet).id === 'string' &&
    typeof (item as QuizletSet).url === 'string' &&
    typeof (item as QuizletSet).description === 'string'
  );
}

function isValidSettings(settings: unknown): settings is Settings {
  return (
    typeof settings === 'object' &&
    settings !== null &&
    typeof (settings as Settings).hasInteractedWithEmptyWords === 'boolean' &&
    typeof (settings as Settings).hasInteractedWithEmptySets === 'boolean' &&
    typeof (settings as Settings).theme === 'string'
  );
}

function isValidArray(data: unknown, isValidItem: (item: unknown) => boolean): data is (Word[] | QuizletSet[]) {
  const array = convertToArray<unknown>(data);
  return array.every(isValidItem);
}

export const chromeStorageMiddleware: Middleware = (store) => {
  // Load initial state from storage
  storage.local.get(['words', 'sets', 'selectedSet', 'settings']).then((result) => {
    // Handle words
    const wordsArray = convertToArray<Word>(result.words);
    if (wordsArray.length > 0 && isValidArray(wordsArray, isValidWord)) {
      store.dispatch(setWords(wordsArray));
    } else {
      store.dispatch(initializeWords());
    }

    // Handle sets
    const setsArray = convertToArray<QuizletSet>(result.sets);
    if (setsArray.length > 0 && isValidArray(setsArray, isValidSet)) {
      store.dispatch(setSets(setsArray));
    } else {
      store.dispatch(initializeSets());
    }

    // Handle selected set
    const selectedSet = result.selectedSet;
    if (selectedSet && isValidSet(selectedSet)) {
      store.dispatch(setSelectedSet(selectedSet));
    }

    // Handle settings
    const settings = result.settings;
    if (settings && isValidSettings(settings)) {
      store.dispatch(setSettings(settings));
    } else {
      store.dispatch(initializeSettings());
    }
  });

  // In extension context, listen for changes in other windows/tabs
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.words) {
        const wordsArray = convertToArray<Word>(changes.words.newValue);
        if (isValidArray(wordsArray, isValidWord)) {
          store.dispatch(setWords(wordsArray));
        }
      }
      if (changes.sets) {
        const setsArray = convertToArray<QuizletSet>(changes.sets.newValue);
        if (isValidArray(setsArray, isValidSet)) {
          store.dispatch(setSets(setsArray));
        }
      }
      if (changes.selectedSet) {
        const selectedSet = changes.selectedSet.newValue;
        if (selectedSet && isValidSet(selectedSet) || selectedSet === null) {
          store.dispatch(setSelectedSet(selectedSet));
        }
      }
      if (changes.settings) {
        const settings = changes.settings.newValue;
        if (settings && isValidSettings(settings)) {
          store.dispatch(setSettings(settings));
        }
      }
    });
  }

  return (next) => (action) => {
    return next(action);
  };
}; 