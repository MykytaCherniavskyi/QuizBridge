import { ComponentType } from 'react';
import { useAppSelector } from '@/app/hooks';
import { QuizletSet } from '@/types/sets.types';
import {
  selectSets,
  selectSetsInitialized,
  selectSelectedSet,
  selectFormattedSets,
} from '@/state/selectors/sets.selector';

interface WithSetsDataProps {
  options: {
    value: string;
    label: string;
  }[];
  isLoading: boolean;
  selectedSet: QuizletSet | null;
}

export function withSetsData<P extends WithSetsDataProps>(WrappedComponent: ComponentType<P>) {
  return function WithSetsDataComponent(props: Omit<P, keyof WithSetsDataProps>) {
    const formattedSets = useAppSelector(selectFormattedSets);
    const isInitialized = useAppSelector(selectSetsInitialized);
    const selectedSet = useAppSelector(selectSelectedSet);

    return (
      <WrappedComponent
        {...(props as P)}
        options={formattedSets}
        isLoading={!isInitialized}
        selectedSet={selectedSet}
      />
    );
  };
}
