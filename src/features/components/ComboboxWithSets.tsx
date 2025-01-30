import { CustomCombobox } from './CustomCombobox';
import { withSetsData } from '../hoc/withSetsData';
import { QuizletSet } from '@/state/sets.slice';

interface ComboboxWithSetsProps {
  sets: {
    value: string;
    label: string;
  }[];
  isLoading: boolean;
  selectedSet: QuizletSet | null;
  onSelect: (value: string) => void;
  placeholder?: string;
}

function BaseComboboxWithSets({
  sets,
  isLoading,
  onSelect,
  selectedSet,
  placeholder = 'Select a set...',
}: ComboboxWithSetsProps) {
  return (
    <CustomCombobox
      options={sets}
      isLoading={isLoading}
      onSelect={onSelect}
      placeholder={placeholder}
      selectedSet={selectedSet}
    />
  );
}

export const ComboboxWithSets = withSetsData(BaseComboboxWithSets);
