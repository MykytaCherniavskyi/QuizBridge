import { useAppDispatch } from '@/app/hooks';
import { toggleSet, deleteSets } from '@/state/sets.slice';
import { Button } from '@/components/ui/button';
import { QuizletSet } from '@/types/sets.types';

interface ListActionsProps {
  sets: QuizletSet[];
  selectedSets: QuizletSet[];
}

export function ListActions({ sets, selectedSets }: ListActionsProps) {
  const dispatch = useAppDispatch();

  const handleToggleAll = () => {
    if (selectedSets.length === sets.length) {
      sets.forEach((set) => dispatch(toggleSet(set.id)));
    } else {
      sets.filter((set) => !set.selected).forEach((set) => dispatch(toggleSet(set.id)));
    }
  };

  const handleDeleteSelected = () => {
    const ids = selectedSets.map((set) => set.id);
    dispatch(deleteSets(ids));
  };

  return (
    <div className="my-2 flex items-center gap-2">
      <Button className="w-28" onClick={handleToggleAll}>
        {selectedSets.length === sets.length ? `Unselect All` : `Select All`}
      </Button>
      {selectedSets.length > 0 && <Button onClick={handleDeleteSelected}>Delete Selected</Button>}
    </div>
  );
}
