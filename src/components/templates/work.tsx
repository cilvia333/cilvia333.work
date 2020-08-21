import { Link } from 'gatsby';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import Image from '~/components/image';
import SEO from '~/components/seo';
import { ContentfulWork } from '~/types/graphql-types';

interface Props {
  pageContext: {
    work: ContentfulWork;
  };
}

const Work: React.FC<Props> = ({ pageContext }: Props) => {
  const { work } = pageContext;

  useEffect(() => {
    console.log(work.thumbnail);
  });

  return (
    <>
      <SEO title={work.title ?? ''} />
      <BacgkroundWrapper>
        <BacgkroundImage fluid={work.thumbnail?.fluid} alt={work.title ?? ''} />
      </BacgkroundWrapper>
      <HeaderWrapper>
        <h1>{work.slug}</h1>
        <h2>hoge</h2>
      </HeaderWrapper>
    </>
  );
};

const BacgkroundWrapper = styled.div`
  ${tw`absolute h-screen inset-0 m-0`}
`;

const BacgkroundImage = styled(Image)`
  ${tw`h-full w-full`}

  &::after {
    ${tw`absolute h-full w-full inset-0 m-0 bg-gray-900 opacity-75`}

    content: '';
  }
`;

const HeaderWrapper = styled.div`
  ${tw`absolute h-screen inset-0 m-0`}
`;

export default Work;
