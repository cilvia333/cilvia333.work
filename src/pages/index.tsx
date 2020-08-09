import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import Image from '~/components/image';
import SEO from '~/components/seo';

import IconImg from '~/images/icon.png';

const IndexPage: React.FC = () => {
  return (
    <>
      <SEO title="index" />
      <TopWrapper>
        <Icon src={IconImg} alt="icon" />
        <Title>cilvia333.work</Title>
      </TopWrapper>
      <MessageWrapper>
        <MessageCatchText>一緒にワクワクを届けませんか？</MessageCatchText>
      </MessageWrapper>
    </>
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

const MessageWrapper = styled.div`
  ${tw`bg-primary-500 py-64 px-24`}
`;

const MessageCatchText = styled.h1`
  ${tw`font-header font-bold text-4xl text-base-200`}
`;

export default IndexPage;
