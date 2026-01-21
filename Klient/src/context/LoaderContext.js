import { createContext } from 'react';

export const LoaderContext = createContext({
  isLoading: false,
  setIsLoading: () => {},
});