import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addSet, toggleSet, editSet, deleteSets } from '@/state/sets.slice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Pencil, Trash2, Check, X, Link as LinkIcon } from 'lucide-react';
import {
  selectSets,
  selectSetsInitialized,
  selectSelectedSets,
} from '@/state/selectors/sets.selector';

export function QuizletSetsPage() {
  const [newUrl, setNewUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const sets = useAppSelector(selectSets);
  const isInitialized = useAppSelector(selectSetsInitialized);
  const selectedSets = useAppSelector(selectSelectedSets);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUrl.trim() && newDescription.trim()) {
      dispatch(addSet({ url: newUrl.trim(), description: newDescription.trim() }));
      setNewUrl('');
      setNewDescription('');
    }
  };

  const startEditing = (id: string, url: string, description: string) => {
    setEditingId(id);
    setEditUrl(url);
    setEditDescription(description);
  };

  const handleEdit = (id: string) => {
    if (editUrl.trim() && editDescription.trim()) {
      dispatch(
        editSet({
          id,
          url: editUrl.trim(),
          description: editDescription.trim(),
        })
      );
      setEditingId(null);
    }
  };

  const handleOpenLink = (url: string) => {
    window.open(url, '_blank');
  };

  const handleDeleteWords = () => {
    const ids = sets.filter((set) => set.selected).map((set) => set.id);
    dispatch(deleteSets(ids));
  };

  const handleToggleAll = () => {
    if (selectedSets.length === sets.length) {
      sets.forEach((set) => dispatch(toggleSet(set.id)));
    } else {
      sets.filter((set) => !set.selected).forEach((set) => dispatch(toggleSet(set.id)));
    }
  };

  if (!isInitialized) {
    return <div className="p-4 text-center">Loading sets...</div>;
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <Input
          type="url"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Quizlet set URL..."
          className="flex-1"
        />
        <Input
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="Description..."
          className="flex-1"
        />
        <Button type="submit" className="w-full">
          Add Set
        </Button>
      </form>

      <div className="my-2 flex items-center gap-2">
        <Button className="w-28" onClick={handleToggleAll}>
          {selectedSets.length === sets.length ? `Unselect All` : `Select All`}
        </Button>
        {selectedSets.length > 0 && <Button onClick={handleDeleteWords}>Delete Selected</Button>}
      </div>

      <div className="max-h-96 space-y-2 overflow-y-auto">
        {sets.map((set) => (
          <Card key={set.id} className="p-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={set.selected}
                onCheckedChange={() => dispatch(toggleSet(set.id))}
              />

              {editingId === set.id ? (
                <div className="flex-1 space-y-2">
                  <Input
                    type="url"
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="flex-1"
                  />
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(set.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
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
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => startEditing(set.id, set.url, set.description)}
                    >
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
    </div>
  );
}
