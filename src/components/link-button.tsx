import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import Wave from '~/components/wave';

interface Props {
  children?: React.ReactNode;
  to: string;
}

const LinkButton: React.FC<Props> = ({ children, to }: Props) => {
  return (
    <>
      <Button to={to}>
        <StyledWave color="yellow" />
        <ButtonText>{children}</ButtonText>
      </Button>
    </>
  );
};

const StyledWave = styled(Wave)`
  ${tw`absolute inset-0 transition-all duration-700 ease-out opacity-0`}
  height: 600%;

  transform: translateY(100%) scaleY(0.333);
`;

const ButtonText = styled.div`
  ${tw`relative`}
`;

const Button = styled(Link)`
  ${tw`relative bg-base-200 text-gray-900 font-header font-bold rounded-full w-full inline-block py-2 text-center overflow-hidden border-primary-500 border-solid border`}

  max-width: 256px;

  &:hover {
    ${StyledWave} {
      ${tw`transition-transform opacity-100`}
      transform: translateY(-50%) scaleY(0.333);
    }
  }
`;

export default LinkButton;
