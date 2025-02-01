import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setSelectedSet } from '@/state/sets.slice';
import { Button } from '@/components/ui/button';
import { ComboboxWithSets } from '@/features/components/ComboboxWithSets';
import { selectSets } from '@/state/selectors/sets.selector';
import { useQuizletSync } from '@/features/hooks/useQuizletSync';
import { selectWords } from '@/state/selectors/words.selector';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { selectSelectedSet } from '@/state/selectors/sets.selector';

export function QuizletSyncSection() {
  const sets = useAppSelector(selectSets);
  const words = useAppSelector(selectWords);
  const selectedSet = useAppSelector(selectSelectedSet);
  const dispatch = useAppDispatch();
  const { handleQuizletSync } = useQuizletSync();

  const handleSetSelect = (value: string) => {
    const [, id] = value.split('-');
    dispatch(setSelectedSet(sets.find((quiletSet) => quiletSet.id === id) || null));
  };

  const selectedWords = words.filter((word) => word.selected);
  const isDisabled = selectedWords.length === 0 || !selectedSet;

  const getValidationMessage = () => {
    if (!selectedSet) {
      return 'Please select a Quizlet set first';
    }
    if (selectedWords.length === 0) {
      return 'Please select words to sync';
    }
    return null;
  };

  const validationMessage = getValidationMessage();

  return (
    <div className="my-2 mt-4 flex items-center gap-2">
      <ComboboxWithSets onSelect={handleSetSelect} placeholder="Select a Quizlet set" />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button variant="quizlet" onClick={handleQuizletSync} disabled={isDisabled}>
                Quizlet Sync
              </Button>
            </div>
          </TooltipTrigger>
          {validationMessage && (
            <TooltipContent>
              <p className="text-sm">{validationMessage}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
