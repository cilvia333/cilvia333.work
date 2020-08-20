import React, { useEffect } from 'react';
import { useEffectOnce } from 'react-use';
import styled from 'styled-components';
import tw from 'twin.macro';

import { CenterPosition } from '~/components/index/background';
import LinkButton from '~/components/link-button';

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
  }, [componentRef.current?.offsetTop]);

  useEffect(() => {
    onChangeCenter();
  }, [
    centerRef.current?.offsetTop,
    centerRef.current?.offsetHeight,
    centerRef.current?.offsetLeft,
    centerRef.current?.offsetWidth,
  ]);

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
  ${tw`flex justify-between items-center pr-12`}
`;

const CatchWrapper = styled.div`
  ${tw`text-base-200`}
`;

const CatchText = styled.h1`
  ${tw`font-header font-bold text-base-200`}
  font-size: 150px;
  line-height: 1.1;
`;

const CatchSmallText = styled.span`
  font-size: 80px;
`;

const Description = styled.div`
  ${tw`py-32`}
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
