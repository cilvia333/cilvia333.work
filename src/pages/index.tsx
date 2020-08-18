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
      <AboutWrapper>
        <CatchWrapper>
          <CatchText>Cilvia333 is</CatchText>
          <CatchText>Creater,</CatchText>
          <CatchText>Coder and</CatchText>
          <CatchText>Comfort.</CatchText>
        </CatchWrapper>
        <AboutDescription>
          <ProfileWrapper>
            <Name>塩見海怜 / cilvia333</Name>
            <Pronounce>Shiomi Kairi / sílvie333</Pronounce>
          </ProfileWrapper>
          <DescriptionText>
            <p>はじめまして、cilvia333です。</p>
            <p>
              美大生をやりながら、グラフィックデザインとウェブ制作、プログラミングを中心に活動をしています。ちょっとかわいいシンプルなデザインとウェブサイトをつくることが得意です。
            </p>
            <p>
              ワクワクしたあの気持ちを形にしたい！みんなに伝えたい！という一心で自主制作や作品のお手伝いをしてきました。これからもわたしの得意なことを大切に、あなたの伝えたいという気持ちに寄り添ったお手伝いをしていきます。
            </p>
          </DescriptionText>
          <ProfileButton>GO PROFILE!</ProfileButton>
        </AboutDescription>
      </AboutWrapper>
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
  ${tw`flex justify-start items-center flex-col row-start-2 row-end-4 py-4`}
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
  ${tw`rounded-circle`}

  width: 210px;
  height: 210px;
`;

const Title = styled.h1`
  ${tw`font-header font-bold text-6xl text-black text-shadow-black`}
`;

const AboutWrapper = styled.div`
  ${tw`bg-primary-500 flex justify-between items-center`}
`;

const CatchWrapper = styled.div`
  ${tw`text-base-200 w-2/4`}
`;

const CatchText = styled.h1`
  ${tw`font-header font-bold text-base-200`}
  font-size: 160px;
  line-height: 1;
`;

const ProfileWrapper = styled.h1`
  ${tw`font-header font-bold text-base-200`}
`;

const AboutDescription = styled.div`
  ${tw`text-gray-800  py-32 px-24  w-2/4`}
`;

const DescriptionText = styled.div`
  ${tw`text-gray-800 my-16 w-full`}
  max-width: 500px;

  p {
    ${tw`my-8`}
    font-feature-settings: 'pkna';
  }
`;

const ProfileButton = styled.div`
  ${tw`bg-primary-500 text-gray-800 font-header font-bold rounded-full`}
`;

const Name = styled.div`
  ${tw`text-gray-800 text-4xl leading-none`}
`;

const Pronounce = styled.div`
  ${tw`text-gray-800  text-2xl leading-none`}
`;

export default IndexPage;
