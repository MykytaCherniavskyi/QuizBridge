import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Separator } from '@/components/ui/separator';
import {
  selectWords,
  selectWordsInitialized,
  selectSelectedWords,
} from '@/state/selectors/words.selector';
import { AddWordForm } from './components/AddWordForm';
import { QuizletSyncSection } from './components/QuizletSyncSection';
import { ListActions } from './components/ListActions';
import { WordsList } from './components/WordsList';
import { MainSkeleton } from '@/features/components/MainSkeleton';
import { WordsEmptyState } from './components/WordsEmptyState';
import { selectHasInteractedWithEmptyWords } from '@/state/selectors/settings.selector';
import { markEmptyWordsInteraction } from '@/state/settings.slice';

export function WordsListPage() {
  const words = useAppSelector(selectWords);
  const isInitialized = useAppSelector(selectWordsInitialized);
  const selectedWords = useAppSelector(selectSelectedWords);
  const hasInteracted = useAppSelector(selectHasInteractedWithEmptyWords);
  const dispatch = useAppDispatch();

  if (!isInitialized) {
    return <MainSkeleton type="list" itemCount={3} />;
  }

  const handleAddWord = () => {
    dispatch(markEmptyWordsInteraction());
  };

  if (words.length === 0 && !hasInteracted) {
    return (
      <div className="mx-auto max-w-md p-4">
        <WordsEmptyState onAddWord={handleAddWord} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <AddWordForm />
      <Separator />
      <QuizletSyncSection />
      {words.length > 0 && (
        <>
          <ListActions words={words} selectedWords={selectedWords} />
          <WordsList words={words} />
        </>
      )}
    </div>
  );
}
