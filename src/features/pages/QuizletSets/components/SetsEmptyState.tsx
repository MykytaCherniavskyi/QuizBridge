import { EmptyState } from '@/features/components/EmptyState';
import { BookCopy } from 'lucide-react';

interface SetsEmptyStateProps {
  onAddSet?: () => void;
}

export function SetsEmptyState({ onAddSet }: SetsEmptyStateProps) {
  return (
    <EmptyState
      icon={<BookCopy className="h-12 w-12" />}
      title="No Quizlet sets added"
      description="Add your Quizlet Flashcard sets to sync words between them. Just paste the URL of your Quizlet Flashcard set to get started."
      action={
        onAddSet
          ? {
              label: 'Add your first set',
              onClick: onAddSet,
            }
          : undefined
      }
    />
  );
}
