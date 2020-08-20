import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import LinkButton from '~/components/link-button';

const About: React.FC = () => {
  return (
    <>
      <Wrapper>
        <CatchWrapper>
          <CatchText>Cilvia333 is</CatchText>
          <CatchText>Creater,</CatchText>
          <CatchText>Coder and</CatchText>
          <CatchText>Comfort.</CatchText>
        </CatchWrapper>
        <Description>
          <ProfileWrapper>
            <Name>塩見海怜 / cilvia333</Name>
            <Pronounce>Shiomi Kairi / sílviə333</Pronounce>
          </ProfileWrapper>
          <DescriptionText>
            <p>はじめまして、cilvia333です。</p>
            <p>
              美大生をやりながら、グラフィックデザインとウェブ制作、プログラミングを中心に活動をしています。
              <br />
              ちょっとかわいいシンプルなデザインとウェブサイトをつくることが得意です。
            </p>
            <p>
              ワクワクしたあの気持ちを形にしたい！みんなに伝えたい！という一心で自主制作や作品のお手伝いをしてきました。
              <br />
              これからもわたしの得意なことを大切に、あなたの伝えたいという気持ちに寄り添ったお手伝いをしていきます。
            </p>
          </DescriptionText>
          <LinkButton to="/profile">GO PROFILE!</LinkButton>
        </Description>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
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

const Description = styled.div`
  ${tw`py-32 px-24 w-2/4`}
`;

const ProfileWrapper = styled.h1`
  ${tw`font-header font-bold text-base-200  mb-12`}
`;

const Name = styled.div`
  ${tw`text-gray-900 text-4xl leading-none`}
`;

const Pronounce = styled.div`
  ${tw`text-gray-900 text-2xl leading-none`}
`;

const DescriptionText = styled.div`
  ${tw`text-sm text-gray-900 leading-loose w-full`}
  max-width: 500px;

  p {
    ${tw`mb-8`}
    font-feature-settings: 'pkna';
  }
`;

export default About;
