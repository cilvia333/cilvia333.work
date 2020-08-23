import React, { useState, useCallback, createContext } from 'react';

type LayoutContext = {
  white: boolean;
  setIsWhite: (isWhite: boolean) => void;
};

export const layoutContext = createContext<LayoutContext>({
  white: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsWhite: () => {},
});

export const useLayoutContext = (): LayoutContext => {
  const [white, setWhite] = useState(false);
  const setIsWhite = useCallback((current: boolean): void => {
    setWhite(current);
  }, []);
  return {
    white,
    setIsWhite,
  };
};
