import React from 'react';
import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';

import IconImg from '~/images/icon.png';

const Top: React.FC = () => {
  return (
    <>
      <Wrapper id="top">
        <TitleWrapper>
          <Icon src={IconImg} alt="icon" />
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
  ${tw`font-header font-bold text-6xl text-gray-900 text-shadow-black`}
`;

export default Top;
