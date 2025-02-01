import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Separator } from '@/components/ui/separator';
import {
  selectSets,
  selectSetsInitialized,
  selectSelectedSets,
} from '@/state/selectors/sets.selector';
import { AddSetForm } from './components/AddSetForm';
import { ListActions } from './components/ListActions';
import { SetsList } from './components/SetsList';
import { MainSkeleton } from '@/features/components/MainSkeleton';
import { SetsEmptyState } from './components/SetsEmptyState';
import { selectHasInteractedWithEmptySets } from '@/state/selectors/settings.selector';
import { markEmptySetsInteraction } from '@/state/settings.slice';

export function QuizletSetsPage() {
  const sets = useAppSelector(selectSets);
  const isInitialized = useAppSelector(selectSetsInitialized);
  const selectedSets = useAppSelector(selectSelectedSets);
  const hasInteracted = useAppSelector(selectHasInteractedWithEmptySets);
  const dispatch = useAppDispatch();

  if (!isInitialized) {
    return <MainSkeleton type="list" itemCount={3} />;
  }

  const handleAddSet = () => {
    dispatch(markEmptySetsInteraction());
  };

  if (sets.length === 0 && !hasInteracted) {
    return (
      <div className="mx-auto max-w-md p-4">
        <SetsEmptyState onAddSet={handleAddSet} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <AddSetForm />
      {sets.length > 0 && (
        <>
          <Separator />
          <ListActions sets={sets} selectedSets={selectedSets} />
          <SetsList sets={sets} />
        </>
      )}
    </div>
  );
}
