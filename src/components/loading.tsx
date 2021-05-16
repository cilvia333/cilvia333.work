import React, { useState, useEffect, useRef } from 'react';
import { useEffectOnce } from 'react-use';
import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';

import Wave from '~/components/wave';

import IconImg from '~/images/index-icon.png';

import { media } from '~/styles';

interface Props {
  onAnimationEnd: () => void;
  delay: boolean;
}

const Loading: React.FC<Props> = ({ onAnimationEnd, delay }: Props) => {
  const [isEnd, setIsEnd] = useState(false);
  const [num, setNum] = useState(0);
  const [count, setCount] = useState(0);
  const refNum = useRef(num);
  const refCount = useRef(count);
  const [letter, setLetter] = useState('/');

  const letters = ['/', '-', '\\', '|'];

  useEffect(() => {
    if (num >= 100) {
      setLetter('');
      setIsEnd(true);
    }
  }, [num]);

  useEffect(() => {
    refNum.current = num;
  }, [num]);

  useEffect(() => {
    refCount.current = count;
  }, [count]);

  useEffectOnce(() => {
    const timer = setInterval(() => {
      if (refNum.current < 100) {
        if (delay) {
          if (refCount.current > 0) {
            setNum(refNum.current + 1);
            setCount(0);
          } else {
            setCount(refCount.current + 1);
            setLetter(letters[Math.floor((refNum.current / 4) % 4)]);
          }
        } else {
          setNum(refNum.current + 1);
          setLetter(letters[Math.floor((refNum.current / 4) % 4)]);
        }
      }
    }, 20);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <>
      <Wrapper isEnd={isEnd} onAnimationEnd={onAnimationEnd}>
        <TitleWrapper>
          <Icon src={IconImg} alt="icon" />
          <Title>cilvia333.work</Title>
          <Loaded>{`${num}% loaded ${letter}`}</Loaded>
        </TitleWrapper>
        <StyledWave color="yellow" />
      </Wrapper>
    </>
  );
};

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Wrapper = styled.section<{ isEnd: boolean }>`
  ${tw`fixed grid grid-rows-4 grid-flow-col gap-4 h-screen w-full bg-base-200 z-30 pointer-events-none`}

  animation: 500ms ease-out forwards 1s;

  ${({ isEnd }) =>
    isEnd &&
    css`
      animation-name: ${fadeOut};
    `}
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

const Loaded = styled.h1`
  ${tw`font-header font-bold text-xl text-gray-900 text-shadow-black mt-4`}
`;

const StyledWave = styled(Wave)`
  ${tw`row-start-4 row-end-5 h-full`}
`;

export default Loading;
