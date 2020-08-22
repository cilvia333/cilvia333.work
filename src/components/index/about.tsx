import React, { useEffect } from 'react';

import styled from 'styled-components';
import tw from 'twin.macro';

import { CenterPosition } from '~/components/index/background';
import LinkButton from '~/components/link-button';

import { media } from '~/styles';

interface Props {
  setPosition: (position: number) => void;
  setCenter: (position: CenterPosition) => void;
}

const About: React.FC<Props> = ({ setPosition, setCenter }: Props) => {
  const componentRef = React.createRef<HTMLElement>();
  const centerRef = React.createRef<HTMLDivElement>();

  const onChangeOffset = () => {
    setPosition(componentRef.current?.offsetTop ?? 0);
  };

  const onChangeCenter = () => {
    const offsetX = centerRef.current?.offsetLeft ?? 0;
    const offsetY = centerRef.current?.offsetTop ?? 0;
    const height = centerRef.current?.offsetHeight ?? 0;
    const width = centerRef.current?.offsetWidth ?? 0;

    setCenter({ x: offsetX + width / 2, y: offsetY + height / 2 });
  };

  useEffect(() => {
    onChangeOffset();
  }, [componentRef.current]);

  useEffect(() => {
    onChangeCenter();
  }, [centerRef.current]);

  return (
    <>
      <Wrapper ref={componentRef} id="about">
        <CatchWrapper>
          <CatchText>
            Cilvia333 <nobr />
            <CatchSmallText>is</CatchSmallText> <br />
            Creater<CatchSmallText>,</CatchSmallText>
            <br />
            Coder <nobr />
            <CatchSmallText>and</CatchSmallText>
            <br />
            Comfort.
          </CatchText>
        </CatchWrapper>
        <Description ref={centerRef}>
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
  ${tw`flex justify-between items-center w-full m-auto`}

  max-width: 1980px;

  @media (min-width: 1921px) {
    padding-right: 448px;
  }

  @media (max-width: 1920px) {
    padding-right: calc(50% - 512px);
  }

  ${media.xl`
    ${tw`pr-16`}
  `}

  ${media.lg`
    ${tw`flex-col px-0`}
  `}
`;

const CatchWrapper = styled.div`
  ${tw`text-base-200`}
`;

const CatchText = styled.h1`
  ${tw`font-header font-bold text-base-200 text-left`}
  font-size: 200px;
  line-height: 1.1;

  @media (max-width: 1685px) {
    font-size: 160px;
  }

  ${media.xl`
    font-size:140px;
  `}

  ${media.lg`
    ${tw`text-justify`}
    text-justify: distribute;
    font-size:160px;
  `}

  ${media.md`
    font-size:140px;
  `}

  ${media.sm`
    font-size:70px;
  `}
`;

const CatchSmallText = styled.span`
  font-size: 80px;

  ${media.md`
    font-size:60px;
  `}

  ${media.sm`
    font-size:40px;
  `}
`;

const Description = styled.div`
  ${tw`py-32`}

  ${media.lg`
    ${tw`py-0 mt-40 w-full text-center`}

    max-width: 512px;
  `}

  ${media.md`
    ${tw`mt-32 px-16`}
  `}

  ${media.sm`
    ${tw`mt-32 px-8`}
  `}
`;

const ProfileWrapper = styled.h1`
  ${tw`font-header font-bold text-base-200 mb-12`}

  ${media.lg`
    ${tw`mb-6 text-center`}
  `}
`;

const Name = styled.div`
  ${tw`text-gray-900 text-4xl leading-none`}

  ${media.lg`
    ${tw`text-3xl`}
  `}

  ${media.sm`
    ${tw`text-2xl`}
  `}
`;

const Pronounce = styled.div`
  ${tw`text-gray-900 text-2xl leading-none`}

  ${media.lg`
    ${tw`text-xl`}
  `}

  ${media.sm`
    ${tw`text-lg`}
  `}
`;

const DescriptionText = styled.div`
  ${tw`text-sm text-gray-900 leading-loose w-full`}
  max-width: 500px;

  ${media.lg`
    max-width: 100%;
  `}

  p {
    ${tw`mb-8`}
    font-feature-settings: 'pkna';

    ${media.lg`
      ${tw`mb-4 text-center`}
    `}
  }
`;

export default About;
