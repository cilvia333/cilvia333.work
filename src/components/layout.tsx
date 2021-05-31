import { useLocation } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';
import styled, {
  createGlobalStyle,
  ThemeProvider,
  css,
} from 'styled-components';
import tw from 'twin.macro';

import Header from '~/components/header';
import Loading from '~/components/loading';
import Wave from '~/components/wave';

import { useLayoutContext, layoutContext } from '~/hooks';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  const [path, setPath] = useState('');
  const [isFirst, setIsFirst] = useState(true);
  const [isDelay, setIsDelay] = useState(false);
  const location = useLocation();
  const ctx = useLayoutContext();

  const theme = {
    primary: 'red',
  };

  const onAnimationEnd = () => {
    setIsFirst(false);
  };

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  useEffectOnce(() => {
    setTimeout(() => {
      if (
        document
          .getElementsByTagName('html')[0]
          .classList.contains('wf-active') != true
      ) {
        setIsDelay(true);
      }
    }, 1000);
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <layoutContext.Provider value={ctx}>
          <GlobalStyle />
          {isFirst ? (
            <Loading onAnimationEnd={onAnimationEnd} delay={isDelay} />
          ) : null}
          <Header />
          <Main isIndex={path === '/'}>{children}</Main>
          <Footer background={path === '/' ? 'yellow' : 'white'}>
            <Wave color={path === '/' ? 'white' : 'yellow'} />
            <p>©︎ 2020 cilvia333</p>
          </Footer>
        </layoutContext.Provider>
      </ThemeProvider>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    ${tw`bg-base-200`}
    margin: 0;
    padding: 0;
    position: relative;
    box-sizing: border-box;
  }
  ul {
    list-style: none;
  }
`;

const Main = styled.main<{ isIndex: boolean }>`
  ${tw`w-full h-full font-text`}

  min-height: 75vh;

  ${({ isIndex }) =>
    isIndex &&
    css`
      ${tw`bg-transparent`}
    `}
`;

const Footer = styled.footer<{ background: 'yellow' | 'white' }>`
  padding-top: 5vh;
  ${tw`relative w-full`}
  z-index:-1;

  p {
    ${tw`absolute inset-x-0 bottom-0 pb-4 text-sm z-20 text-center font-header font-semibold`}
  }

  ${({ background }) =>
    background === 'yellow'
      ? css`
          ${tw`bg-primary-500`}
        `
      : css`
          ${tw`bg-base-200`}
        `}
`;

export default Layout;
