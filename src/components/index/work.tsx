import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import Image from '~/components/image';

interface Props {
  title: string;
  to: string;
  image: string;
}

const Work: React.FC<Props> = ({ title, to, image }: Props) => {
  return (
    <>
      <Wrapper to={to}>
        <Image filename={image} alt={title} />
        <TitleLabel>{title}</TitleLabel>
      </Wrapper>
    </>
  );
};

const Wrapper = styled(Link)`
  ${tw`block relative w-56 h-56 rounded-circle bg-white overflow-hidden`}
`;

const TitleLabel = styled.div`
  ${tw`absolute w-full h-8 bg-primary-500 overflow-hidden mx-auto my-0 text-gray-900 font-header font-bold text-center`}
  transform: rotate(-6deg);
  bottom: 20px;
  right: 0;
  left: 0;
`;

export default Work;
