import { storage } from '@/app/storage';
import { Word } from '@/types/words.types';

// Create context menu item when extension is installed
chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create({
    id: 'saveWord',
    title: 'Save "%s" to QuizBridge',
    contexts: ['selection']
  });

  if (details.reason === 'install') {
    // Enable the extension
    chrome.action.enable();
    
    // Open welcome page
    chrome.tabs.create({
      url: chrome.runtime.getURL('welcome.html'),
      active: true
    });
  }
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, _tab) => {
  if (info.menuItemId === 'saveWord' && info.selectionText) {
    // Get current words from storage
    const result = await storage.local.get(['words']);
    const words = result.words as Word[] || [];
    
    // Create new word object
    const newWord: Word = {
      id: Date.now().toString(),
      text: info.selectionText.trim().slice(0, 250),
      definition: '',
      selected: false
    };

    // Add new word to array
    words.push(newWord);
    
    // Save updated words array back to storage
    await storage.local.set({ words });
  }
});
