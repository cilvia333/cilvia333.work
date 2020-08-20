import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';

import About from '~/components/index/about';
import Contact from '~/components/index/contact';
import Nav, { Positions } from '~/components/index/nav';
import Skill from '~/components/index/skill';
import Top from '~/components/index/top';

import SEO from '~/components/seo';

const IndexPage: React.FC = () => {
  const [position, setPosition] = useState<Positions>({
    current: 0,
    about: 0,
    skill: 0,
    contact: 0,
  });

  const onScroll = (): void => {
    setPosition({ ...position, contact: window.pageYOffset });
  };

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    return (): void => document.removeEventListener('scroll', onScroll);
  });

  return (
    <>
      <SEO title="index" />
      <BubbleWrapper></BubbleWrapper>
      <Nav position={position} />
      <Top />
      <About
        setPosition={num => {
          setPosition({ ...position, about: num });
        }}
      />
      <Skill
        setPosition={num => {
          setPosition({ ...position, skill: num });
        }}
      />
      <Contact
        setPosition={num => {
          setPosition({ ...position, contact: num });
        }}
      />
    </>
  );
};

const BubbleWrapper = styled.div`
  ${tw`absolute h-full w-full inset-0 m-auto`}
`;

export default IndexPage;
