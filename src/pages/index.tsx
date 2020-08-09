import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import tw from 'twin.macro';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

import IconImg from '../images/icon.jpg';

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="" />
      <TopWrapper>
        <Icon src={IconImg} alt="icon" />
        <Title>cilvia333.work</Title>
      </TopWrapper>
    </Layout>
  );
};

const TopWrapper = styled.div`
  ${tw`flex justify-center items-center flex-col bg-base-200 h-screen`}
`;

const Icon = styled.img`
  width: 210px;
  height: 210px;
  border-radius: 50%;
`;

const Title = styled.h1`
  ${tw`font-header font-bold text-6xl text-black`}
`;

export default IndexPage;
