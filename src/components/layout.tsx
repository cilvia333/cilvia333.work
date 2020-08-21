import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import React, { useEffect, useState } from 'react';
import styled, {
  createGlobalStyle,
  ThemeProvider,
  css,
  keyframes,
} from 'styled-components';
import tw from 'twin.macro';

import Header from '~/components/header';

import wave01 from '~/images/wave-yellow_01.png';
import wave02 from '~/images/wave-yellow_02.png';
import wave03 from '~/images/wave-yellow_03.png';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  const [path, setPath] = useState('');
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  const theme = {
    primary: 'red',
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Main isIndex={path === '/'}>{children}</Main>
        {path === '/' ? (
          ''
        ) : (
          <Footer>
            <WaveWrapper>
              <Wave />
              <Wave />
              <Wave />
            </WaveWrapper>
          </Footer>
        )}
      </ThemeProvider>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
`;

const waveKeyframe = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-1920px);
  }
`;

const Main = styled.main<{ isIndex: boolean }>`
  ${tw`relative w-full h-full font-text bg-base-200`}

  min-height: 80vh;

  ${({ isIndex }) =>
    isIndex &&
    css`
      ${tw`bg-transparent`}
    `}
`;

const Footer = styled.footer`
  ${tw`relative w-full bg-base-200`}
`;

const WaveWrapper = styled.div`
  ${tw`relative w-full overflow-hidden`}
  height: 20vh;
`;

const Wave = styled.div`
  ${tw`absolute h-full`}
  animation: ${waveKeyframe} 12s linear infinite 0s;
  background: top left/1920px repeat-x ;
  min-width: 3840px;
  width: 200%;
  top: 0;
  transform: translateX(10px);

  &:nth-child(1) {
    background-image:  url(${wave03});
    left: 240px;
  }

  &:nth-child(2) {
    background-image:  url(${wave02});
    left: 120px;
  }
  &:nth-child(3) {
    background-image:  url(${wave01});
    left: 0;
  }
`;
export default Layout;
