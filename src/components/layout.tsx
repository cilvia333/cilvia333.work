import { useLocation } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { useEffectOnce } from 'react-use';
import styled, {
  createGlobalStyle,
  ThemeProvider,
  css,
  keyframes,
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
          {path === '/' ? (
            ''
          ) : (
            <Footer>
              <Wave color="yellow" />
            </Footer>
          )}
        </layoutContext.Provider>
      </ThemeProvider>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    position: relative;
  }
  ul {
    list-style: none;
  }
`;

const Main = styled.main<{ isIndex: boolean }>`
  ${tw`w-full h-full font-text bg-base-200`}

  min-height: 75vh;

  ${({ isIndex }) =>
    isIndex &&
    css`
      ${tw`bg-transparent`}
    `}
`;

const Footer = styled.footer`
  ${tw`relative w-full bg-base-200`}
  padding-top: 5vh;
`;
export default Layout;
