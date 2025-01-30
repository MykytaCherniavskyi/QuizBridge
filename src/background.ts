import { storage } from './app/storage';

// Listen for installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set default settings
    chrome.storage.local.set({
      settings: {
        theme: 'light',
        notifications: true,
      },
    });
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'FROM_CONTENT') {
    console.log('Message from content script:', message.data);
    sendResponse({ status: 'received' });
  }
  return true;
});

// Example of using chrome.storage
async function getSettings() {
  const data = await chrome.storage.local.get('settings');
  return data.settings;
}

// Example of sending message to content script
async function sendMessageToContent(tabId: number, message: unknown) {
  try {
    const response = await chrome.tabs.sendMessage(tabId, message);
    console.log('Response from content script:', response);
  } catch (error) {
    console.error('Error sending message to content script:', error);
  }
}

// Example of browser action handling
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    sendMessageToContent(tab.id, { type: 'TOGGLE_FEATURE' });
  }
});

// Create context menu item when extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'saveWord',
    title: 'Save "%s" to Words List',
    contexts: ['selection']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'saveWord' && info.selectionText) {
    // Get current words from storage
    const result = await storage.local.get(['words']);
    const words = result.words || [];
    
    // Create new word object
    const newWord = {
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
