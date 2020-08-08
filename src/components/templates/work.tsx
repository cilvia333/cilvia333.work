import React from 'react';
import { Link } from 'gatsby';

import Layout from '../layout';
import SEO from '../seo';
import { ContentfulWork } from '../../types/graphql-types';

interface Props {
  pageContext: {
    work: ContentfulWork;
  };
}

const Work: React.FC<Props> = ({ pageContext }: Props) => {
  const { work } = pageContext;

  return (
    <Layout>
      <SEO title="work" />
      <h1>{work.slug}</h1>
      <h2>hoge</h2>
    </Layout>
  );
};

export default Work;
