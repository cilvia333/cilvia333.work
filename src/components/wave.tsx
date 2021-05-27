import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';

import whiteWave01 from '~/images/wave-white_01.png';
import whiteWave02 from '~/images/wave-white_02.png';
import whiteWave03 from '~/images/wave-white_03.png';
import yellowWave01 from '~/images/wave-yellow_01.png';
import yellowWave02 from '~/images/wave-yellow_02.png';
import yellowWave03 from '~/images/wave-yellow_03.png';
import yellowWave from '~/images/wave.svg';

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
      <Bg color={color} />
    </WaveWrapper>
  );
};

const waveKeyframe1 = keyframes`
  0% {
    transform: translateX(0) translateY(0);
  }
  25% {
    transform: translateX(-480px) translateY(20px);
  }
  50% {
    transform: translateX(-960px) translateY(0);
  }
  75% {
    transform: translateX(-1440px) translateY(-20px);
  }
  100% {
    transform: translateX(-1920px) translateY(0px);
  }
`;

const waveKeyframe2 = keyframes`
  0% {
    transform: translateX(-480px) translateY(0);
  }
  25% {
    transform: translateX(-960px) translateY(-10px);
  }
  50% {
    transform: translateX(-1440px) translateY(0);
  }
  75% {
    transform: translateX(-1920px) translateY(30px);
  }
  100% {
    transform: translateX(-2400px) translateY(0);
  }
`;

const waveKeyframe3 = keyframes`
  0% {
    transform: translateX(-760px) translateY(0);
  }
  25% {
    transform: translateX(-1240px) translateY(40px);
  }
  50% {
    transform: translateX(-1720px) translateY(0);
  }
  75% {
    transform: translateX(-2200px) translateY(40px);
  }
  100% {
    transform: translateX(-2680px) translateY(0px);
  }
`;

const WaveWrapper = styled.div`
  ${tw`relative w-full`}
  height: 20vh;
`;

const WaveImg = styled.div<{ color: 'yellow' | 'white' }>`
  ${tw`absolute h-full top-0 z-10`}
  animation: linear infinite;
  background: top left/1920px repeat-x;
  min-width: 5760px;
  width: 300%;
  opacity: 80%;

  &:nth-of-type(1) {
    left: -240px;
    animation-name: ${waveKeyframe1};
    animation-duration: 32.2s;
  }

  &:nth-of-type(2) {
    left: -120px;
    animation-name: ${waveKeyframe2};
    animation-duration: 24.5s;
  }
  &:nth-of-type(3) {
    left: 0;
    animation-name: ${waveKeyframe3};
    animation-duration: 14s;
  }

  ${({ color }) =>
    color === 'yellow'
      ? css`
          &:nth-of-type(1) {
            opacity: 40%;
            background-image: url(${yellowWave});
          }
          &:nth-of-type(2) {
            opacity: 55%;
            background-image: url(${yellowWave});
          }
          &:nth-of-type(3) {
            opacity: 80%;
            background-image: url(${yellowWave});
          }
        `
      : css`
          &:nth-of-type(1) {
            background-image: url(${whiteWave03});
          }

          &:nth-of-type(2) {
            background-image: url(${whiteWave02});
          }
          &:nth-of-type(3) {
            background-image: url(${whiteWave01});
          }
        `}
`;

const Bg = styled.div<{ color: 'yellow' | 'white' }>`
  ${tw`absolute bottom-0 w-full `}

  height: 50%;

  ${({ color }) =>
    color === 'yellow'
      ? css`
          background-image: linear-gradient(
            to bottom,
            rgba(252, 191, 59, 0),
            rgba(252, 191, 59, 1),
            rgba(252, 191, 59, 1)
          );
        `
      : css`
          background-image: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0),
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 1)
          );
        `}
`;

export default Wave;
