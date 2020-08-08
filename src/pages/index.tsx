import React from 'react';
import { Link } from 'gatsby';
import { css } from 'styled-components';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

const spacingStyle = css({
  maxWidth: `300px`,
  marginBottom: `1.45rem`,
});

function IndexPage() {
  return (
    <Layout>
      <SEO title="works" />
      <h1>cilvia333.work</h1>
    </Layout>
  );
}

export default IndexPage;
