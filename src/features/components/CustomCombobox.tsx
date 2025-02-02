'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { QuizletSet } from '@/types/sets.types';

export interface CustomComboboxProps {
  options: { value: string; label: string }[];
  isLoading: boolean;
  onSelect: (value: string) => void;
  placeholder?: string;
  selectedSet: QuizletSet | null;
}

export function CustomCombobox({
  options,
  onSelect,
  placeholder,
  selectedSet,
}: CustomComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    selectedSet?.id ? `${selectedSet.description}-${selectedSet.id}` : ''
  );

  useEffect(() => {
    setValue(selectedSet?.id ? `${selectedSet.description}-${selectedSet.id}` : '');
  }, [selectedSet]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value ? options.find((option) => option.value === value)?.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>Nothing found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    onSelect(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
