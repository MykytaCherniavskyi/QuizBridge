import { useAppSelector } from '@/app/hooks';
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
import { useState } from 'react';

export function QuizletSetsPage() {
  const sets = useAppSelector(selectSets);
  const isInitialized = useAppSelector(selectSetsInitialized);
  const selectedSets = useAppSelector(selectSelectedSets);
  const [isAddingSet, setIsAddingSet] = useState(false);

  if (!isInitialized) {
    return <MainSkeleton type="list" itemCount={3} />;
  }

  if (sets.length === 0 && !isAddingSet) {
    return (
      <div className="mx-auto max-w-md p-4">
        <SetsEmptyState onAddSet={() => setIsAddingSet(true)} />
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
