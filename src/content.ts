import { storage } from "@/app/storage";
import { Word } from "@/types/words.types";
import { wait } from "@/utils/utils";

function getLastRowElements(): { termSide: HTMLDivElement; definitionSide: HTMLDivElement } | null {
  const activeRow = document.querySelectorAll('div[contenteditable="true"][role="textbox"]');

  if (!activeRow.length) {
    return null;
  }
  const termSide = activeRow[activeRow.length - 4] as HTMLDivElement;
  const definitionSide = activeRow[activeRow.length - 3] as HTMLDivElement;
  return { termSide, definitionSide };
}

// Function to find and fill term row
async function fillTermRow(word: { text: string; definition: string }) {
  const lastRowElements = getLastRowElements();
  
  if (!lastRowElements) {
    return false;
  }
  const { termSide, definitionSide } = lastRowElements;
  if (termSide.textContent?.length) {
    await findAndClickAddRowButton();
  }

  if (definitionSide.textContent?.length) {
    definitionSide.textContent = word.definition;
  }

  if (termSide && definitionSide) {
    // Using contentEditable to set content
    termSide.focus();
    termSide.textContent = word.text;

    definitionSide.focus();
    definitionSide.textContent = word.definition;
    return true;
  }
  console.log('Failed to find term or definition elements');
  return false;
}

async function findAndClickAddRowButton() {
  // Find and click add row button
  const addCardButton = document.getElementById('addRow') as HTMLElement;
  
  if (addCardButton) {
    addCardButton.click();
    await wait(500);
  } else {
    console.log('Add row link not found');
  }
}

// Main function to handle sync
async function handleQuizletSync(words: Array<{ text: string; definition: string, id: string }>, syncedWords: Array<{ text: string; definition: string, id: string }>) {
  const lastRowElements = getLastRowElements();
  
  if (!lastRowElements) {
    return;
  }
  if (lastRowElements.termSide.textContent?.length || lastRowElements.definitionSide.textContent?.length) {
    await findAndClickAddRowButton();
  }
  
  for (const word of words) {    
    // Fill current row
    const success = await fillTermRow(word);
    
    if (!success) {
      continue;
    }
    syncedWords.push(word);

    await findAndClickAddRowButton();
  }
}

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {  
  if (message.type === 'CHECK_READY') {
    sendResponse({ ready: true });
    return true;
  }
  
  if (message.type === 'SYNC_QUIZLET_WORDS') {
    const syncedWords: Word[] = [];

    handleQuizletSync(message.words, syncedWords)
      .then(() => storage.local.get(['words']))
      .then(({ words }) => {
        const wordToStore = (words as Word[]).filter((word: { id: string }) => !syncedWords.some((syncedWord) => syncedWord.id === word.id));
        return storage.local.set({ words: wordToStore });
      })
      .catch(error => {
        console.error('Sync failed:', error);
      });

    // Send initial response to keep the message channel open
    sendResponse({ success: true });
    return true;
  }
});