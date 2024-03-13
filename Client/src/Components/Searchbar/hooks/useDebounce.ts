import { useEffect } from 'react';
import { useTimeout } from './useTimeout';


type CallbackFunction = () => void;
type DependencyList = any[]; 

export const useDebounce = (callback: CallbackFunction, delay: number, deps: DependencyList) => {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...deps, reset]);
  useEffect(clear, []);
}
