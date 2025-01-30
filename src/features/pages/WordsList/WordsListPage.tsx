import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addWord, toggleWords, editWord, deleteWords } from '@/state/words.slice';
import { setSelectedSet } from '@/state/sets.slice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { ComboboxWithSets } from '@/features/components/ComboboxWithSets';
import {
  selectWords,
  selectWordsInitialized,
  selectSelectedWords,
} from '@/state/selectors/words.selector';
import { selectSets } from '@/state/selectors/sets.selector';

export function WordsListPage() {
  const [newWord, setNewWord] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null);

  const navigate = useNavigate();
  const sets = useAppSelector(selectSets);
  const words = useAppSelector(selectWords);
  const isInitialized = useAppSelector(selectWordsInitialized);
  const wordsSelected = useAppSelector(selectSelectedWords);
  const dispatch = useAppDispatch();

  const handleSetSelect = (value: string) => {
    setSelectedSetId(value);
    const [, id] = value.split('-');
    dispatch(setSelectedSet(sets.find((quiletSet) => quiletSet.id === id) || null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWord.trim()) {
      dispatch(addWord(newWord.trim()));
      setNewWord('');
    }
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleEdit = (id: string) => {
    if (editText.trim()) {
      dispatch(editWord({ id, text: editText.trim() }));
      setEditingId(null);
    }
  };

  const handleQuizletSync = () => {
    console.log('handleQuizletSync');
  };

  const handleToggleAll = () => {
    const selectedWords = words.filter((word) => word.selected);
    if (selectedWords.length === words.length) {
      dispatch(toggleWords(words.map((word) => word.id)));
    } else {
      dispatch(toggleWords(words.filter((word) => !word.selected).map((word) => word.id)));
    }
  };

  const handleDeleteWords = () => {
    const ids = words.filter((word) => word.selected).map((word) => word.id);
    dispatch(deleteWords(ids));
  };

  if (!isInitialized) {
    return <div className="p-4 text-center">Loading words...</div>;
  }

  return (
    <div className="mx-auto max-w-md p-4">
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <Input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Add new word..."
          className="flex-1"
        />
        <Button type="submit">Add</Button>
      </form>

      <div className="my-2 flex items-center gap-2">
        <ComboboxWithSets onSelect={handleSetSelect} placeholder="Select a Quizlet set" />
        <Button
          className="bg-quizlet-primary hover:bg-quizlet-primaryHover"
          onClick={handleQuizletSync}
        >
          Quizlet Sync
        </Button>
      </div>

      <div className="my-2 flex items-center gap-2">
        <Button className="w-28" onClick={handleToggleAll}>
          {wordsSelected.length === words.length ? `Unselect All` : `Select All`}
        </Button>
        {wordsSelected.length > 0 && <Button onClick={handleDeleteWords}>Delete Selected</Button>}
      </div>

      <div className="max-h-[22rem] space-y-2 overflow-y-auto">
        {words.map((word) => (
          <Card key={word.id} className="p-4">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={word.selected}
                onCheckedChange={() => dispatch(toggleWords([word.id]))}
              />
              <span className="flex-1 truncate">{word.text}</span>
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
    </div>
  );
}
