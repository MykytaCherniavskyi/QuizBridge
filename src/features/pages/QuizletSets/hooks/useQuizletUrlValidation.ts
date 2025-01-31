import { extractQuizletSetId } from '@/utils/utils';
import { useCallback, useState } from 'react';

export function useQuizletUrlValidation() {
  const [isValid, setIsValid] = useState(true);

  const validateUrl = useCallback((url: string) => {
    const setId = extractQuizletSetId(url);
    setIsValid(!!setId || url === '');
  }, []);

  return { isValid, validateUrl };
} 