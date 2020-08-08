import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import Header from './header';

type Props = {
  children: string;
};

function Layout({ children }: Props) {
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
        <Header siteTitle={data.site.siteMetadata.title} />
        <HeaderMarginStyle>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Cilvia333 / All rights Reserved.
          </footer>
        </HeaderMarginStyle>
      </ThemeProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
`;

const HeaderMarginStyle = styled.div`
  margin: 0 auto;
  max-width: 960;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`;

export default Layout;
