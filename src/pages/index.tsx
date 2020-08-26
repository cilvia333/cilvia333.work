import React, { useState } from 'react';
import { useWindowScroll, useMount, useUnmount } from 'react-use';

import styled from 'styled-components';
import tw from 'twin.macro';

import About from '~/components/index/about';
import Background, { CenterPosition } from '~/components/index/background';
import Contact from '~/components/index/contact';
import Nav from '~/components/index/nav';
import Skill from '~/components/index/skill';
import Top from '~/components/index/top';

import SEO from '~/components/seo';

const IndexPage: React.FC = () => {
  const [aboutPosition, setAboutPosition] = useState(0);
  const [skillPosition, setSkillPosition] = useState(0);
  const [contactPosition, setContactPosition] = useState(0);
  const { x, y } = useWindowScroll();
  const [aboutCenter, setAboutCenter] = useState<CenterPosition>({
    x: 0,
    y: 0,
  });
  const [skillCenter, setSkillCenter] = useState<CenterPosition>({
    x: 0,
    y: 0,
  });
  const [contactCenter, setContactCenter] = useState<CenterPosition>({
    x: 0,
    y: 0,
  });
  const [topCenter, setTopCenter] = useState<CenterPosition>({
    x: 0,
    y: 0,
  });

  return (
    <>
      <SEO title="index" />
      <Background
        position={{
          current: y,
          about: aboutPosition,
          skill: skillPosition,
          contact: contactPosition,
        }}
        center={{
          top: topCenter,
          about: aboutCenter,
          skill: skillCenter,
          contact: contactCenter,
        }}
      />
      <Nav
        position={{
          current: y,
          about: aboutPosition,
          skill: skillPosition,
          contact: contactPosition,
        }}
      />
      <Top
        setCenter={position => {
          setTopCenter(position);
        }}
      />
      <About
        setPosition={num => {
          setAboutPosition(num);
        }}
        setCenter={position => {
          setAboutCenter(position);
        }}
      />
      <Skill
        setPosition={num => {
          setSkillPosition(num);
        }}
        setCenter={position => {
          setSkillCenter(position);
        }}
      />
      <Contact
        setPosition={num => {
          setContactPosition(num);
        }}
        setCenter={position => {
          setContactCenter(position);
        }}
      />
    </>
  );
};
export default IndexPage;
