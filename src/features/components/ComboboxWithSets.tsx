import { CustomCombobox, CustomComboboxProps } from './CustomCombobox';
import { withSetsData } from '@/features/hoc/withSetsData';

function BaseComboboxWithSets({
  options,
  isLoading,
  onSelect,
  selectedSet,
  placeholder = 'Select a set...',
}: CustomComboboxProps) {
  return (
    <CustomCombobox
      options={options}
      isLoading={isLoading}
      onSelect={onSelect}
      placeholder={placeholder}
      selectedSet={selectedSet}
    />
  );
}

export const ComboboxWithSets = withSetsData(BaseComboboxWithSets);
