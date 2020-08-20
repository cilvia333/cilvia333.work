import React, { useEffect, useState } from 'react';
import { useMount, useUnmount } from 'react-use';
import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';

import { Positions } from '~/components/index/nav';

import wave01 from '~/images/wave-yellow_01.png';
import wave02 from '~/images/wave-yellow_02.png';
import wave03 from '~/images/wave-yellow_03.png';

export type CenterPosition = {
  x: number;
  y: number;
};

interface Props {
  position: Positions;
  center: {
    top: CenterPosition;
    about: CenterPosition;
    skill: CenterPosition;
    contact: CenterPosition;
  };
}

const Background: React.FC<Props> = ({ position, center }: Props) => {
  const [windowHeight, setWindowHeight] = useState(0);

  const currentPosition = (current: number): string => {
    const topDiff = current;
    const aboutDiff = current - position.about;
    const skillDiff = current - position.skill;
    const contactDiff = current - position.contact;

    if (topDiff <= position.about - windowHeight / 2) {
      return 'top';
    } else if (
      windowHeight / -2 <= aboutDiff &&
      aboutDiff <= position.skill - position.about - windowHeight / 2
    ) {
      return 'about';
    } else if (
      windowHeight / -2 <= skillDiff &&
      skillDiff <= position.contact - position.skill - windowHeight / 2
    ) {
      return 'skill';
    } else if (windowHeight / -2 <= contactDiff) {
      return 'contact';
    } else {
      return '';
    }
  };

  const onResize = () => {
    setWindowHeight(window.innerHeight);
  };

  useMount(() => {
    onResize();
    document.addEventListener('resize', onResize);
  });

  useUnmount(() => {
    document.removeEventListener('resize', onResize);
  });

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
        <BubbleWrapper>
          <BubbleOuter
            position={currentPosition(position.current)}
            center={center}
          >
            <Bubble />
          </BubbleOuter>
        </BubbleWrapper>
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

const bubbleKeyframe = keyframes`
  0% {
    transform: rotate(0);
    border-top-left-radius: 7rem;
    border-top-right-radius: 6rem;
    border-bottom-right-radius: 6.5rem;
    border-bottom-left-radius: 6rem;
  }
  50% {
    border-top-left-radius: 6.5rem;
    border-top-right-radius: 5.5rem;
    border-bottom-right-radius: 6rem;
    border-bottom-left-radius: 6.5rem;
  }
  100% {
    transform: rotate(360deg);
    border-top-left-radius: 7rem;
    border-top-right-radius: 6rem;
    border-bottom-right-radius: 6.5rem;
    border-bottom-left-radius: 6rem;
  }
`;

const Wrapper = styled.div`
  ${tw`absolute h-full w-full inset-0 m-auto bg-primary-500 overflow-hidden`}

  z-index: -1;
`;

const BubbleWrapper = styled.div`
  ${tw`absolute w-full h-full overflow-hidden m-0`}
`;

const Bubble = styled.div`
  ${tw`h-48 w-48 m-0`}

  transition: all cubic-bezier(0, 0.67, 0.8, 1) 1.2s;
  animation: ${bubbleKeyframe} 4s linear infinite;
`;

const BubbleOuter = styled.div<{ position: string; center: any }>`
  ${tw`absolute h-48 w-48`}

  transform-origin: center;
  transition: all cubic-bezier(0, 0.67, 0.8, 1) 500ms;

  ${({ position, center }) => {
    if (position === 'top') {
      return css`
        transform: translate(${center.top.x - 96}px, ${center.top.y - 96}px)
          scale(1.2);

        & ${Bubble} {
          ${tw`bg-primary-500`}
        }
      `;
    } else if (position === 'about') {
      return css`
        transform: translate(${center.about.x - 96}px, ${center.about.y - 96}px)
          scale(4);
        transition-duration: 1000ms;
        transition-timing-function: ease;

        & ${Bubble} {
          ${tw`bg-base-200`}
        }
      `;
    } else if (position === 'skill') {
      return css`
        transform: translate(${center.skill.x - 96}px, ${center.skill.y - 96}px)
          scale(11);

        & ${Bubble} {
          ${tw`bg-base-200`}
        }
      `;
    } else if (position === 'contact') {
      return css`
        transform: translate(
            ${center.contact.x - 96}px,
            ${center.contact.y - 96}px
          )
          scale(2.7);

        & ${Bubble} {
          ${tw`bg-base-200`}
        }
      `;
    }
  }}
`;

const WaveGrid = styled.div`
  ${tw`absolute grid grid-rows-4 grid-flow-col gap-4 w-full h-screen bg-base-200`}
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
