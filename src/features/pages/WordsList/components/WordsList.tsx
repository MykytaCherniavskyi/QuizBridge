import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { toggleWords, deleteWords } from '@/state/words.slice';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Pencil, Trash2 } from 'lucide-react';
import { Word } from '@/types/words.types';

interface WordsListProps {
  words: Word[];
}

export function WordsList({ words }: WordsListProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="max-h-[22rem] space-y-2 overflow-y-auto">
      {words.map((word) => (
        <Card key={word.id} className="p-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={word.selected}
              onCheckedChange={() => dispatch(toggleWords([word.id]))}
            />
            <span className="flex-1 truncate text-sm">{word.text}</span>
            <Button size="icon" variant="ghost" onClick={() => navigate(`/words/${word.id}`)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => dispatch(deleteWords([word.id]))}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
