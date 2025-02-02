import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toggleAllSets, deleteSets } from '@/state/sets.slice';
import { Button } from '@/components/ui/button';
import { QuizletSet } from '@/types/sets.types';
import { selectAreAllSetsSelected } from '@/state/selectors/sets.selector';

interface ListActionsProps {
  selectedSets: QuizletSet[];
}

export function ListActions({ selectedSets }: ListActionsProps) {
  const dispatch = useAppDispatch();
  const areAllSelected = useAppSelector(selectAreAllSetsSelected);

  const handleToggleAll = () => {
    dispatch(toggleAllSets(!areAllSelected));
  };

  const handleDeleteSelected = () => {
    const ids = selectedSets.map((set) => set.id);
    dispatch(deleteSets(ids));
  };

  return (
    <div className="my-2 flex items-center gap-2">
      <Button className="w-28" onClick={handleToggleAll}>
        {areAllSelected ? 'Unselect All' : 'Select All'}
      </Button>
      {selectedSets.length > 0 && <Button onClick={handleDeleteSelected}>Delete Selected</Button>}
    </div>
  );
}
