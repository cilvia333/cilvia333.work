import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';

import { Positions } from '~/components/index/nav';
import Wave from '~/components/wave';

import { media } from '~/styles';

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
  const { width, height } = useWindowSize();

  const currentPosition = (current: number): string => {
    const topDiff = current;
    const aboutDiff = current - position.about;
    const skillDiff = current - position.skill;
    const contactDiff = current - position.contact;
    const breakPosition = windowHeight / 4;

    if (topDiff <= position.about - breakPosition) {
      return 'top';
    } else if (
      -breakPosition <= aboutDiff &&
      aboutDiff <= position.skill - position.about - breakPosition
    ) {
      return 'about';
    } else if (
      -breakPosition <= skillDiff &&
      skillDiff <= position.contact - position.skill - breakPosition
    ) {
      return 'skill';
    } else if (-breakPosition <= contactDiff) {
      return 'contact';
    } else {
      return '';
    }
  };

  const onResize = () => {
    setWindowHeight(height);
  };

  useEffect(() => {
    console.log(height);
    onResize();
  }, [width]);

  return (
    <>
      <Wrapper>
        <WaveGrid>
          <StyledWave color="yellow" />
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
  transition: all ease 1000ms;

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

          ${media.lg`
            transform: translate(${center.about.x - 96}px, ${center.about.y -
            96}px)
              scale(3.5);
          `}

        & ${Bubble} {
          ${tw`bg-base-200`}
        }
      `;
    } else if (position === 'skill') {
      return css`
        transform: translate(${center.skill.x - 96}px, ${center.skill.y - 96}px)
          scale(11);

        ${media.lg`
            transform: translate(${center.skill.x - 96}px, ${center.skill.y -
          96}px)
              scale(10);
          `}

          ${media.md`
            transform: translate(${center.skill.x - 96}px, ${center.skill.y -
            96}px)
              scale(8);
          `}

        ${media.sm`
            transform: translate(${center.skill.x - 96}px, ${center.skill.y -
          96}px)
              scale(20);
          `}

        ${Bubble} {
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

          ${media.lg`
            transform: translate(
              ${center.contact.x - 96}px,
              ${center.contact.y - 96}px
            )
            scale(2.7);
          `}

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

const StyledWave = styled(Wave)`
  ${tw`row-start-4 row-end-5 h-full`}
`;

export default Background;
