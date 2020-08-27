import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';

import whiteWave01 from '~/images/wave-white_01.png';
import whiteWave02 from '~/images/wave-white_02.png';
import whiteWave03 from '~/images/wave-white_03.png';
import yellowWave01 from '~/images/wave-yellow_01.png';
import yellowWave02 from '~/images/wave-yellow_02.png';
import yellowWave03 from '~/images/wave-yellow_03.png';

interface Props {
  className?: string;
  color: 'yellow' | 'white';
}

const Wave: React.FC<Props> = ({ className, color }: Props) => {
  return (
    <WaveWrapper className={className}>
      <WaveImg color={color} />
      <WaveImg color={color} />
      <WaveImg color={color} />
    </WaveWrapper>
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

const WaveWrapper = styled.div`
  ${tw`relative w-full overflow-hidden`}
  height: 20vw;
`;

const WaveImg = styled.div<{ color: 'yellow' | 'white' }>`
  ${tw`absolute h-full`}
  animation: ${waveKeyframe} 12s linear infinite 0s;
  background: top left/1920px repeat-x ;
  min-width: 3840px;
  width: 200%;
  top: 0;

  transform: translateX(10px);

  &:nth-child(1) {
    left: 240px;
  }

  &:nth-child(2) {
    left: 120px;
  }
  &:nth-child(3) {
    left: 0;
  }

  ${({ color }) =>
    color === 'yellow'
      ? css`
          &:nth-child(1) {
            background-image: url(${yellowWave03});
          }
          &:nth-child(2) {
            background-image: url(${yellowWave02});
          }
          &:nth-child(3) {
            background-image: url(${yellowWave01});
          }
        `
      : css`
          &:nth-child(1) {
            background-image: url(${whiteWave03});
          }

          &:nth-child(2) {
            background-image: url(${whiteWave02});
          }
          &:nth-child(3) {
            background-image: url(${whiteWave01});
          }
        `}
`;

export default Wave;
