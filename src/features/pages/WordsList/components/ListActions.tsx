import { useAppDispatch } from '@/app/hooks';
import { toggleWords, deleteWords } from '@/state/words.slice';
import { Button } from '@/components/ui/button';
import { Word } from '@/types/words.types';

interface ListActionsProps {
  words: Word[];
  selectedWords: Word[];
}

export function ListActions({ words, selectedWords }: ListActionsProps) {
  const dispatch = useAppDispatch();

  const handleToggleAll = () => {
    if (selectedWords.length === words.length) {
      dispatch(toggleWords(words.map((word) => word.id)));
    } else {
      dispatch(toggleWords(words.filter((word) => !word.selected).map((word) => word.id)));
    }
  };

  const handleDeleteWords = () => {
    const ids = selectedWords.map((word) => word.id);
    dispatch(deleteWords(ids));
  };

  return (
    <div className="my-2 flex items-center gap-2">
      <Button className="w-28" onClick={handleToggleAll}>
        {selectedWords.length === words.length ? `Unselect All` : `Select All`}
      </Button>
      {selectedWords.length > 0 && <Button onClick={handleDeleteWords}>Delete Selected</Button>}
    </div>
  );
}
