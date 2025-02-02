import { useState, useCallback, memo } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { addSet } from '@/state/sets.slice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useQuizletUrlValidation } from '../hooks/useQuizletUrlValidation';

function AddSetFormComponent() {
  const [newUrl, setNewUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const { isValid: isUrlValid, validateUrl } = useQuizletUrlValidation();
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (newUrl.trim() && newDescription.trim() && isUrlValid) {
        dispatch(addSet({ url: newUrl.trim(), description: newDescription.trim() }));
        setNewUrl('');
        setNewDescription('');
      }
    },
    [dispatch, newUrl, newDescription, isUrlValid]
  );

  const handleAddNewUrl = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const url = e.target.value;
      setNewUrl(url);
      validateUrl(url);
    },
    [validateUrl]
  );

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(e.target.value);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="mb-2 space-y-2">
      <Input
        type="url"
        value={newUrl}
        onChange={handleAddNewUrl}
        placeholder="Quizlet set URL..."
        className={cn('flex-1', !isUrlValid && 'border-red-500 focus-visible:ring-red-500')}
      />
      <Input
        type="text"
        value={newDescription}
        onChange={handleDescriptionChange}
        placeholder="Description..."
        className="flex-1"
      />
      <TooltipProvider>
        <Tooltip open={!isUrlValid && newUrl !== ''}>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              className={cn(
                'w-full',
                !isUrlValid && 'cursor-not-allowed opacity-50 hover:bg-primary'
              )}
              disabled={!isUrlValid}
            >
              Add Set
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Please enter a valid Quizlet set URL</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}

export const AddSetForm = memo(AddSetFormComponent);
