import React from 'react';
import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';

import About from '~/components/index/about';
import Contact from '~/components/index/contact';
import Skill from '~/components/index/skill';
import Top from '~/components/index/top';
import SEO from '~/components/seo';

const IndexPage: React.FC = () => {
  return (
    <>
      <SEO title="index" />
      <Top />
      <About />
      <Skill />
      <Contact />
    </>
  );
};

export default IndexPage;
