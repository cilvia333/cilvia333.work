import React, { useEffect, useState } from 'react';
import { useMount, useUnmount } from 'react-use';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

export type Positions = {
  current: number;
  about: number;
  skill: number;
  contact: number;
};

interface Props {
  position: Positions;
}

const Nav: React.FC<Props> = ({ position }: Props) => {
  const [menuPosition, setMenuPosition] = useState(0);

  const onResize = () => {
    setMenuPosition(Math.floor(window.innerHeight / 6));
  };

  useMount(() => {
    document.addEventListener('resize', onResize);
  });

  useUnmount(() => {
    document.removeEventListener('resize', onResize);
  });

  useEffect(() => {
    onResize();
  }, [window.innerHeight]);

  return (
    <>
      <Wrapper position={menuPosition}>
        <Scale isActive={position.current < position.about}>Top</Scale>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div<{ position: number }>`
  ${tw`fixed text-right w-full`}

  ${({ position }) =>
    css`
      transform: translateY(${position}px);
    `}
`;

const Scale = styled.div<{ isActive: boolean }>`
  ${tw`text-right align-middle`}

  &::after {
    ${tw`bg-gray-900 text-gray-900 inline-block mb-1 ml-2`}

    content: '';
    width: 150px;
    height: 2px;

    ${({ isActive }) =>
      isActive &&
      css`
        width: 200px;
      `}
  }
`;

export default Nav;
