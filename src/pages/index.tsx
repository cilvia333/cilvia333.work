import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';

import About from '~/components/index/about';
import Contact from '~/components/index/contact';
import Skill from '~/components/index/skill';
import Top from '~/components/index/top';
import SEO from '~/components/seo';

const IndexPage: React.FC = () => {
  const [position, setPosition] = useState(0);

  const onScroll = (): void => {
    setPosition(window.pageYOffset);
  };

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return (): void => document.removeEventListener('scroll', onScroll);
  });

  return (
    <>
      <SEO title="index" />
      <BubbleWrapper></BubbleWrapper>
      <Top />
      <About />
      <Skill />
      <Contact />
    </>
  );
};

const BubbleWrapper = styled.div`
  ${tw`absolute h-full w-full inset-0 m-auto`}
`;

export default IndexPage;
