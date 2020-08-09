import { Link } from 'gatsby';
import React from 'react';

import SEO from '~/components/seo';
import { ContentfulWork } from '~/types/graphql-types';

interface Props {
  pageContext: {
    work: ContentfulWork;
  };
}

const Work: React.FC<Props> = ({ pageContext }: Props) => {
  const { work } = pageContext;

  return (
    <>
      <SEO title="work" />
      <h1>{work.slug}</h1>
      <h2>hoge</h2>
    </>
  );
};

export default Work;
