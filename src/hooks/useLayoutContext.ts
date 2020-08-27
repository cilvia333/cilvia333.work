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
  workBack: {
    path: string;
    scroll: string;
    title: string;
  };
  setWorkBack: (current: {
    path: string;
    scroll: string;
    title: string;
  }) => void;
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
  workBack: {
    path: '/works',
    scroll: '',
    title: 'WORK',
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setWorkBack: () => {},
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
  const [workBack, setCurrentWorkBack] = useState({
    path: '/works',
    scroll: 'string',
    title: 'WORK',
  });
  const setWorkBack = useCallback(
    (current: { path: string; title: string }): void => {
      setCurrentWorkBack(current);
    },
    []
  );
  return {
    white,
    setIsWhite,
    pageTitle,
    setPageTitle,
    workList,
    setWorkList,
    workPosition,
    setWorkPosition,
    workBack,
    setWorkBack,
  };
};
