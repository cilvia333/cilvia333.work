import React from 'react';
import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';

import wave01 from '~/images/wave-yellow_01.png';
import wave02 from '~/images/wave-yellow_02.png';
import wave03 from '~/images/wave-yellow_03.png';

const Background: React.FC = () => {
  return (
    <>
      <Wrapper>
        <WaveGrid>
          <WaveWrapper>
            <Wave />
            <Wave />
            <Wave />
          </WaveWrapper>
        </WaveGrid>
      </Wrapper>
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

const Wrapper = styled.div`
  ${tw`absolute h-full w-full inset-0 m-auto bg-primary-500`}

  z-index: -1;
`;

const WaveGrid = styled.section`
  ${tw`grid grid-rows-4 grid-flow-col gap-4 h-screen bg-base-200`}
`;

const WaveWrapper = styled.div`
  ${tw`relative w-full h-full row-start-4 row-end-5 overflow-hidden`}
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

export default Background;
