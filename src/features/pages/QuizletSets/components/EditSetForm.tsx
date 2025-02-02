import { useState, useEffect, useCallback, memo } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { editSet } from '@/state/sets.slice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useQuizletUrlValidation } from '../hooks/useQuizletUrlValidation';

interface EditSetFormProps {
  id: string;
  initialUrl: string;
  initialDescription: string;
  onCancel: () => void;
}

function EditSetFormComponent({ id, initialUrl, initialDescription, onCancel }: EditSetFormProps) {
  const [url, setUrl] = useState(initialUrl);
  const [description, setDescription] = useState(initialDescription);
  const { isValid: isUrlValid, validateUrl } = useQuizletUrlValidation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    validateUrl(initialUrl);
  }, [initialUrl, validateUrl]);

  const handleEdit = useCallback(() => {
    if (url.trim() && description.trim() && isUrlValid) {
      dispatch(
        editSet({
          id,
          url: url.trim(),
          description: description.trim(),
        })
      );
      onCancel();
    }
  }, [dispatch, url, description, isUrlValid, id, onCancel]);

  const handleEditUrl = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newUrl = e.target.value;
      setUrl(newUrl);
      validateUrl(newUrl);
    },
    [validateUrl]
  );

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }, []);

  return (
    <div className="flex-1 space-y-2">
      <Input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        className="flex-1"
      />
      <Input
        type="url"
        value={url}
        onChange={handleEditUrl}
        className={cn('flex-1', !isUrlValid && 'border-red-500 focus-visible:ring-red-500')}
      />
      <div className="flex justify-end gap-2">
        <TooltipProvider>
          <Tooltip open={!isUrlValid && url !== ''}>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleEdit}
                className={cn(!isUrlValid && 'cursor-not-allowed opacity-50 hover:bg-background')}
                disabled={!isUrlValid}
              >
                <Check className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Please enter a valid Quizlet set URL</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button size="icon" variant="ghost" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export const EditSetForm = memo(EditSetFormComponent);
