import React, { useState } from 'react';
import { useMount, useUnmount } from 'react-use';
import styled from 'styled-components';
import tw from 'twin.macro';

import About from '~/components/index/about';
import Background from '~/components/index/background';
import Contact from '~/components/index/contact';
import Nav from '~/components/index/nav';
import Skill from '~/components/index/skill';
import Top from '~/components/index/top';

import SEO from '~/components/seo';

const IndexPage: React.FC = () => {
  const [aboutPosition, setAboutPosition] = useState(0);
  const [skillPosition, setSkillPosition] = useState(0);
  const [contactPosition, setContactPosition] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);

  const onScroll = (): void => {
    setCurrentPosition(window.pageYOffset);
  };

  useMount(() => {
    document.addEventListener('scroll', onScroll);
  });

  useUnmount(() => {
    document.removeEventListener('scroll', onScroll);
  });

  return (
    <>
      <SEO title="index" />
      <Background />
      <Nav
        position={{
          current: currentPosition,
          about: aboutPosition,
          skill: skillPosition,
          contact: contactPosition,
        }}
      />
      <Top />
      <About
        setPosition={num => {
          setAboutPosition(num);
        }}
      />
      <Skill
        setPosition={num => {
          setSkillPosition(num);
        }}
      />
      <Contact
        setPosition={num => {
          setContactPosition(num);
        }}
      />
    </>
  );
};
export default IndexPage;
