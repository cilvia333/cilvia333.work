import React, { useEffect, useState } from 'react';
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
    setMenuPosition(window.innerHeight / 4);
  };

  useEffect(() => {
    document.addEventListener('resize', onResize);
    return (): void => document.removeEventListener('resize', onResize);
  });

  return (
    <>
      <Wrapper position={menuPosition}>
        <Scale>Top</Scale>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div<{ position: number }>`
  ${tw`fixed`}

  ${({ position }) =>
    css`
      transform: translateY(${position});
    `}
`;

const Scale = styled.div`
  &::after {
    ${tw`bg-gray-900 text-gray-900`}

    content: '';
    width: 250px;
    height: 2px;
  }
`;

export default Nav;
