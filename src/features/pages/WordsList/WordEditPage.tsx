import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { editWord } from '@/state/words.slice';
import { selectWords } from '@/state/selectors/words.selector';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function WordEditPage() {
  const { wordId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const words = useAppSelector(selectWords);

  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  useEffect(() => {
    const currentWord = words.find((w) => w.id === wordId);
    if (currentWord) {
      setWord(currentWord.text);
      setDefinition(currentWord.definition || '');
    } else {
      navigate('/words');
    }
  }, [wordId, words, navigate]);

  const handleSave = () => {
    if (wordId && word.trim()) {
      dispatch(
        editWord({
          id: wordId,
          text: word.trim(),
          definition: definition.trim(),
        })
      );
      navigate('/words');
    }
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <Button variant="ghost" size="icon" className="mb-4" onClick={() => navigate('/words')}>
        <ArrowLeft className="h-4 w-4" />
      </Button>

      <Card className="space-y-4 p-6">
        <div className="space-y-2">
          <label htmlFor="word" className="text-sm font-medium">
            Word
          </label>
          <Input
            id="word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter word"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="definition" className="text-sm font-medium">
            Definition
          </label>
          <Textarea
            id="definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="Enter definition"
            rows={4}
            maxLength={500}
            className="h-[210px] resize-none"
          />
          <div className="text-right text-sm text-muted-foreground">
            {definition.length}/500 characters
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => navigate('/words')}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Card>
    </div>
  );
}
