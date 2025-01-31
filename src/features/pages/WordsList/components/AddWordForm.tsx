import { useState } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { addWord } from '@/state/words.slice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AddWordForm() {
  const [newWord, setNewWord] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (newWord.trim()) {
      dispatch(addWord(newWord.trim()));
      setNewWord('');
    }
  };

  return (
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
  );
}
