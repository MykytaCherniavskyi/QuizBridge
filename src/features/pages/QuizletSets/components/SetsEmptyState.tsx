import { memo } from 'react';
import { EmptyState } from '@/features/components/EmptyState';
import { BookCopy } from 'lucide-react';

interface SetsEmptyStateProps {
  onAddSet?: () => void;
}

function SetsEmptyStateComponent({ onAddSet }: SetsEmptyStateProps) {
  return (
    <EmptyState
      icon={<BookCopy className="h-12 w-12" />}
      title="No Quizlet sets added"
      description={
        <>
          Add your Quizlet Flashcard sets to sync words between them. Just paste the URL of your
          Quizlet Flashcard set to get started.
          <div className="mt-2 text-sm text-muted-foreground">
            <span className="text-sm font-semibold text-primary">Quizlet Flashcard examples:</span>
            <ul className="list-disc pl-4 text-left">
              <li>https://quizlet.com/123456789/best-flashcard-set-ever</li>
              <li>https://quizlet.com/123456789/edit</li>
            </ul>
          </div>
        </>
      }
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

export const SetsEmptyState = memo(SetsEmptyStateComponent);
