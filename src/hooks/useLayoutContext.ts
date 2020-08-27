import React, { useState, useCallback, createContext } from 'react';
import { ContentfulFluid } from '~/types/graphql-types';

type WorkHeadLine = {
  title: string;
  slug: string;
  thumbnail: ContentfulFluid;
};

type LayoutContext = {
  white: boolean;
  setIsWhite: (isWhite: boolean) => void;
  pageTitle: string;
  setPageTitle: (current: string) => void;
  workList: WorkHeadLine[];
  setWorkList: (current: WorkHeadLine[]) => void;
  workPosition: number;
  setWorkPosition: (current: number) => void;
  workBackPath: string;
  setWorkBackPath: (current: string) => void;
};

export const layoutContext = createContext<LayoutContext>({
  white: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsWhite: () => {},
  pageTitle: 'TOP',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPageTitle: () => {},
  workList: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWorkList: () => {},
  workPosition: -1,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWorkPosition: () => {},
  workBackPath: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWorkBackPath: () => {},
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
  const [workList, setCurrentWorkList] = useState<WorkHeadLine[]>([]);
  const setWorkList = useCallback((current: WorkHeadLine[]): void => {
    setCurrentWorkList(current);
  }, []);
  const [workPosition, setCurrentWorkPosition] = useState(-1);
  const setWorkPosition = useCallback((current: number): void => {
    setCurrentWorkPosition(current);
  }, []);
  const [workBackPath, setCurrentWorkBackPath] = useState('');
  const setWorkBackPath = useCallback((current: string): void => {
    setCurrentWorkBackPath(current);
  }, []);
  return {
    white,
    setIsWhite,
    pageTitle,
    setPageTitle,
    workList,
    setWorkList,
    workPosition,
    setWorkPosition,
    workBackPath,
    setWorkBackPath,
  };
};
