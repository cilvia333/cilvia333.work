import React, { useState, useCallback, createContext } from 'react';

type LayoutContext = {
  white: boolean;
  setIsWhite: (isWhite: boolean) => void;
  pageTitle: string;
  setPageTitle: (current: string) => void;
};

export const layoutContext = createContext<LayoutContext>({
  white: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsWhite: () => {},
  pageTitle: 'TOP',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPageTitle: () => {},
});

export const useLayoutContext = (): LayoutContext => {
  const [white, setWhite] = useState(false);
  const setIsWhite = useCallback((current: boolean): void => {
    setWhite(current);
  }, []);
  const [pageTitle, setCurrentPageTitle] = useState('TOP');
  const setPageTitle = useCallback((current: string): void => {
    setCurrentPageTitle(current);
  }, []);
  return {
    white,
    setIsWhite,
    pageTitle,
    setPageTitle,
  };
};
