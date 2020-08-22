import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import Image from '~/components/image';

import { media } from '~/styles';

interface Props {
  title: string;
  to: string;
  image: string;
}

const Work: React.FC<Props> = ({ title, to, image }: Props) => {
  return (
    <>
      <Wrapper to={to} className="group">
        <Image filename={image} alt={title} />
        <TitleLabelWrapper>
          <TitleLabel>{title}</TitleLabel>
        </TitleLabelWrapper>
      </Wrapper>
    </>
  );
};

const TitleLabelWrapper = styled.div`
  ${tw`absolute w-full h-8 overflow-hidden mx-auto my-0 transition-all duration-200 ease-out`}

  transform-origin: center left;
  transform: rotate(-6deg);
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  bottom: 20px;
  right: 0;
  left: 6px;
`;

const Wrapper = styled(Link)`
  ${tw`block relative w-56 h-56 rounded-circle bg-white overflow-hidden`}

  ${media.lg`
    ${tw`w-32 h-32`}
  `}

  ${media.sm`
    ${tw`w-56 h-56`}
  `}

  &:hover ${TitleLabelWrapper} {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
`;

const TitleLabel = styled.div`
  ${tw`absolute w-full h-8 bg-primary-500 mx-auto my-0 text-gray-900 font-header font-bold text-center leading-none py-2`}
`;

export default Work;
