import React, { useEffect, useMemo } from 'react';
import { useMound } from 'react-use';
import styled from 'styled-components';
import tw from 'twin.macro';

import { CenterPosition } from '~/components/index/background';

import IconImg from '~/images/index-icon.png';

import { media } from '~/styles';

interface Props {
  setCenter: (position: CenterPosition) => void;
}

const Top: React.FC<Props> = ({ setCenter }: Props) => {
  const centerRef = React.createRef<HTMLImageElement>();

  const onChangeCenter = () => {
    const offsetX = centerRef.current?.offsetLeft ?? 0;
    const offsetY = centerRef.current?.offsetTop ?? 0;
    const height = centerRef.current?.offsetHeight ?? 0;
    const width = centerRef.current?.offsetWidth ?? 0;

    setCenter({ x: offsetX + width / 2, y: offsetY + height / 2 });
  };

  useEffect(() => {
    onChangeCenter();
  }, [centerRef.current]);

  return (
    <>
      <Wrapper id="top">
        <TitleWrapper>
          <Icon src={IconImg} alt="icon" ref={centerRef} />
          <Title>cilvia333.work</Title>
        </TitleWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  ${tw`grid grid-rows-4 grid-flow-col gap-4 h-screen`}
`;

const TitleWrapper = styled.div`
  ${tw`flex justify-start items-center flex-col row-start-2 row-end-4 py-4`}
`;

const Icon = styled.img`
  ${tw`rounded-circle`}

  width: 210px;
  height: 210px;
`;

const Title = styled.h1`
  ${tw`font-header font-bold text-6xl text-gray-900 text-shadow-black mt-4`}

  ${media.sm`
    ${tw`text-5xl`}
  `}
`;

export default Top;
