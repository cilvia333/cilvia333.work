import { Link } from 'gatsby';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';

import Image from '~/components/image';
import Wave from '~/components/wave';

import { media } from '~/styles';

import { ContentfulFluid } from '~/types/graphql-types';

interface Props {
  title: string;
  to: string;
  image: ContentfulFluid;
  className?: string;
}

const Work: React.FC<Props> = ({ title, to, image, className }: Props) => {
  return (
    <>
      <Wrapper className={className}>
        <LinkWrapper to={to} className="group">
          <StyledImage fluid={image} alt={title} />
          <TitleLabelWrapper>
            <StyledWave color="yellow" />
            <TitleLabel>{title}</TitleLabel>
          </TitleLabelWrapper>
        </LinkWrapper>
      </Wrapper>
    </>
  );
};

const rippleBaseKeyframe = keyframes`
  0% {
    transform: scale(1.05);
  }
  5% {
    transform: scale(1);
  }
  7% {
    transform: scale(1.05);
  }
  12% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
`;

const rippleKeyframe = keyframes`
  0% {
    transform: scale(1.1);
    opacity: 1;
  }
  50% {
    transform: scale(1.8);
    opacity: 0;
  }
`;

const StyledImage = styled(Image)`
  ${tw`h-full`}
`;

const TitleLabel = styled.h4`
  ${tw`absolute text-gray-900 font-header font-bold text-center leading-none inline-block m-auto`}

  max-width: 200px;

  bottom: 40px;
  left: 0;
  right: 0;
`;

const TitleLabelWrapper = styled.div`
  ${tw`absolute w-full transition-all duration-200 ease-out opacity-0 text-center inset-0`}

  transform: translateY(100%);
`;

const StyledWave = styled(Wave)`
  ${tw`relative w-full`}

  transform: translateY(10%) scaleY(0.4);
`;

const LinkWrapper = styled(Link)`
  ${tw`w-56 h-56 bg-white overflow-hidden rounded-circle block relative transition-all duration-300 ease-out`}

  ${media.lg`
    ${tw`w-32 h-32`}
  `}

  ${media.sm`
    ${tw`w-56 h-56`}
  `}
`;

const Wrapper = styled.div`
  ${tw`w-56 h-56 relative transition-all duration-300 ease-out`}

  ${media.lg`
    ${tw`w-32 h-32`}
  `}

  ${media.sm`
    ${tw`w-56 h-56`}
  `}

  animation: 3s linear infinite 500ms;

  &::before, &::after {
    ${tw`absolute w-full h-full rounded-circle transition-all duration-300 ease-out inset-0 m-auto border-primary-500 border-2 border-solid opacity-0`}
    animation: 3s linear infinite 500ms;

    z-index: -1;

    content: '';
  }

  &::after {
    animation-delay: 710ms;
  }

  &:hover {
    animation-name: ${rippleBaseKeyframe};

    &::before,
    &::after {
      animation-name: ${rippleKeyframe};
    }

    ${TitleLabelWrapper} {
      ${tw`opacity-100`}

      transform: translateY(0);
    }
  }
`;
export default Work;
