import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface Props {
  children?: React.ReactNode;
  to: string;
}

const LinkButton: React.FC<Props> = ({ children, to }: Props) => {
  return (
    <>
      <Button to={to}>{children}</Button>
    </>
  );
};

const Button = styled(Link)`
  ${tw`bg-primary-500 text-gray-800 font-header font-bold rounded-full w-full inline-block py-2 text-center`}
  max-width: 256px;
`;

export default LinkButton;
