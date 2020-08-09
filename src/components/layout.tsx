import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

import Header from '~/components/header';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }: Props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const theme = {
    primary: 'red',
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Cilvia333 / All rights Reserved.
        </footer>
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

export default Layout;
