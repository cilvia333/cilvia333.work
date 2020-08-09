import { Link } from 'gatsby';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';

import Image from '~/components/image';
import SEO from '~/components/seo';

import IconImg from '~/images/icon.png';
import wave01 from '~/images/wave-yellow_01.png';
import wave02 from '~/images/wave-yellow_02.png';
import wave03 from '~/images/wave-yellow_03.png';

const IndexPage: React.FC = () => {
  return (
    <>
      <SEO title="index" />
      <TopWrapper>
        <TitleWrapper>
          <Icon src={IconImg} alt="icon" />
          <Title>cilvia333.work</Title>
        </TitleWrapper>
        <WaveWrapper>
          <Wave />
          <Wave />
          <Wave />
        </WaveWrapper>
      </TopWrapper>
      <MessageWrapper>
        <MessageCatchText>一緒にワクワクを届けませんか？</MessageCatchText>
      </MessageWrapper>
    </>
  );
};

const waveKeyframe = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-1920px);
  }
`;

const TopWrapper = styled.div`
  ${tw`grid grid-rows-4 grid-flow-col gap-4 bg-base-200 h-screen`}
`;

const TitleWrapper = styled.div`
  ${tw`flex justify-center items-center flex-col row-start-2 row-end-4`}
`;

const WaveWrapper = styled.div`
  ${tw`relative w-full h-full row-start-4 row-end-5`}
`;

const Wave = styled.div`
  ${tw`absolute h-full row-start-4 row-end-5`}
  animation: ${waveKeyframe} 12s linear infinite 0s;
  background: top left/1920px repeat-x ;
  min-width: 3840px;
  width: 200%;
  top: 0;
  transform: translateX(10px);

  &:nth-child(1) {
    background-image:  url(${wave03});
    left: 240px;
  }

  &:nth-child(2) {
    background-image:  url(${wave02});
    left: 120px;
  }
  &:nth-child(3) {
    background-image:  url(${wave01});
    left: 0;
  }
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
