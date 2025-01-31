import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectSelectedSet } from '@/state/selectors/sets.selector';
import { selectWords } from '@/state/selectors/words.selector';
import { toggleWords } from '@/state/words.slice';
import { extractQuizletSetId } from '@/utils/utils';

export function useQuizletSync() {
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectWords);
  const selectedSet = useAppSelector(selectSelectedSet);

  const checkContentScriptReady = async (tabId: number): Promise<boolean> => {
    try {
      const response = await chrome.tabs.sendMessage(tabId, { type: 'CHECK_READY' });
      return response.ready;
    } catch {
      return false;
    }
  };

  const waitForContentScript = async (tabId: number, maxAttempts = 10): Promise<boolean> => {
    for (let i = 0; i < maxAttempts; i++) {
      if (await checkContentScriptReady(tabId)) {
        return true;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    return false;
  };

  const handleQuizletSync = async () => {
    if (!selectedSet) {
      alert('Please select a Quizlet set first');
      return;
    }

    const selectedWords = words.filter((word) => word.selected);
    if (selectedWords.length === 0) {
      alert('Please select words to sync');
      return;
    }

    const quizletId = extractQuizletSetId(selectedSet.url);
    if (!quizletId) {
      alert('Invalid Quizlet URL');
      return;
    }

    const editUrl = `https://quizlet.com/${quizletId}/edit`;
    const tabs = await chrome.tabs.query({ url: 'https://quizlet.com/*' });
    let targetTab = tabs.find((tab) => tab.url === editUrl);

    if (!targetTab) {
      targetTab = await chrome.tabs.create({ url: editUrl, active: false });
    }

    if (targetTab?.id) {
      const isReady = await waitForContentScript(targetTab.id);

      if (!isReady) {
        alert('Failed to connect to Quizlet page. Please refresh the page and try again.');
        return;
      }

      try {
        const response = await chrome.tabs.sendMessage(targetTab.id, {
          type: 'SYNC_QUIZLET_WORDS',
          words: selectedWords,
        });

        if (response.success) {
          dispatch(toggleWords(selectedWords.map((word) => word.id)));
          await chrome.tabs.update(targetTab.id, { active: true });
        }
      } catch (error) {
        alert('Error syncing words. Please make sure you are on the Quizlet edit page.');
      }
    }
  };

  return { handleQuizletSync };
} 