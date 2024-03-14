import { useEffect, useState } from 'react';
import { useTimeout } from './useTimeout';

interface Props {
  value: string;
  setSuggestions: React.Dispatch<React.SetStateAction<any[]>>;
  fetchData: (value: string) => Promise<any[]>;
}

export const useDebounce = ({ value, setSuggestions, fetchData }: Props, delay?: number, deps?: any[]) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const { reset, clear } = useTimeout(async () => {
    try {
      const suggestions = await fetchData(inputValue);
      setSuggestions(suggestions );
    } catch (error) {
      console.log(error);
    }
  }, delay);

  useEffect(() => {
    reset();
    return clear;
  }, [inputValue, reset, clear, ...(deps || [])]); // Include optional deps if defined

  return { inputValue, setInputValue };
};
