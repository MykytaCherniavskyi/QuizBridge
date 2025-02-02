import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toggleSet, deleteSets } from '@/state/sets.slice';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Pencil, Trash2, Link as LinkIcon } from 'lucide-react';
import { QuizletSet } from '@/types/sets.types';
import { EditSetForm } from './EditSetForm';
import { selectSelectedSetsMap } from '@/state/selectors/sets.selector';

interface SetsListProps {
  sets: QuizletSet[];
}

export function SetsList({ sets }: SetsListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const selectedSetsMap = useAppSelector(selectSelectedSetsMap);

  const handleOpenLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="max-h-[20rem] space-y-2 overflow-y-auto">
      {sets.map((set) => (
        <Card key={set.id} className="p-4">
          <div className="flex items-center gap-2">
            <Checkbox
              className="h-5 w-5"
              checked={selectedSetsMap[set.id] || false}
              onCheckedChange={() => dispatch(toggleSet(set.id))}
            />

            {editingId === set.id ? (
              <EditSetForm
                id={set.id}
                initialUrl={set.url}
                initialDescription={set.description}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex flex-1 items-center justify-between">
                <div className="max-w-44 flex-1">
                  <div className="truncate font-medium">{set.description}</div>
                  <div className="truncate text-sm text-muted-foreground">{set.url}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" onClick={() => handleOpenLink(set.url)}>
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => setEditingId(set.id)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => dispatch(deleteSets([set.id]))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
