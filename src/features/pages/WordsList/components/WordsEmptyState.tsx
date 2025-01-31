import { EmptyState } from '@/features/components/EmptyState';
import { FileText } from 'lucide-react';

interface WordsEmptyStateProps {
  onAddWord?: () => void;
}

export function WordsEmptyState({ onAddWord }: WordsEmptyStateProps) {
  return (
    <EmptyState
      icon={<FileText className="h-12 w-12" />}
      title="No words added yet"
      description="Start by adding words to your list. You can add words manually or select text on any webpage and use the context menu."
      action={
        onAddWord
          ? {
              label: 'Add your first word',
              onClick: onAddWord,
            }
          : undefined
      }
    />
  );
}
