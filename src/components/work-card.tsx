import { Link, navigate } from 'gatsby';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';

import Image from '~/components/image';

import { media } from '~/styles';

import { ContentfulFluid } from '~/types/graphql-types';

interface Props {
  thumbnail?: ContentfulFluid;
  title?: string;
  tags?: {
    title?: string;
  }[];
  to?: string;
  onClick: () => void;
  className: string;
}

const WorkCard: React.FC<Props> = ({
  thumbnail,
  title,
  tags,
  to,
  onClick,
  className,
}: Props) => {
  const onLinkClick = e => {
    onClick();
    navigate(to ?? '');
  };

  return (
    <>
      <Wrapper className={className}>
        <ThumbnailWrapper onClick={onLinkClick}>
          <Thumbnail fluid={thumbnail} alt={title ?? ''} />
        </ThumbnailWrapper>
        <Title onClick={onLinkClick}>{title}</Title>
        <TagWrapper>
          {tags?.map((tag, i) => (
            <TagLink
              to={`/works/t/${tag?.title ?? ''}`}
              key={`work_tag-${i}`}
            >{`#${tag?.title ?? ''}`}</TagLink>
          ))}
        </TagWrapper>
      </Wrapper>
    </>
  );
};

const displayKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translateY(50%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.li`
  ${tw`w-1/2 pb-12`}
  animation: ${displayKeyframes} 1s ease-out forwards;

  &:nth-child(2n) {
    ${tw`pl-8`}
  }
  &:nth-child(2n + 1) {
    ${tw`pr-8`}
  }

  &:nth-last-child(1),
  &:nth-last-child(2) {
    ${tw`pb-0`}
  }

  &:nth-child(1),
  &:nth-child(2) {
    animation-delay: 0ms;
  }
  &:nth-child(3),
  &:nth-child(4) {
    animation-delay: 150ms;
  }
  &:nth-child(5),
  &:nth-child(6) {
    animation-delay: 300ms;
  }
  &:nth-child(7),
  &:nth-child(8) {
    animation-delay: 450ms;
  }
  &:nth-child(9),
  &:nth-child(10) {
    animation-delay: 600ms;
  }
  &:nth-child(11),
  &:nth-child(12) {
    animation-delay: 750ms;
  }

  ${media.sm`
    ${tw`w-full pb-8`}

    &:nth-child(2n) {
    ${tw`pl-0`}
    }
    &:nth-child(2n + 1) {
      ${tw`pr-0`}
    }

    &:nth-last-child(2) {
      ${tw`pb-8`}
    }

    &:last-child {
      ${tw`pb-0`}
    }

    &:nth-child(1){
      animation-delay: 0ms;
    }
    &:nth-child(2){
      animation-delay: 100ms;
    }
    &:nth-child(3){
      animation-delay: 200ms;
    }
    &:nth-child(4){
      animation-delay: 300ms;
    }
    &:nth-child(5){
      animation-delay: 400ms;
    }
    &:nth-child(6){
      animation-delay: 500ms;
    }
    &:nth-child(7){
      animation-delay: 600ms;
    }
    &:nth-child(8){
      animation-delay: 700ms;
    }
    &:nth-child(9){
      animation-delay: 800ms;
    }
    &:nth-child(10){
      animation-delay: 900ms;
    }
    &:nth-child(11){
      animation-delay: 1000ms;
    }
    &:nth-child(12){
      animation-delay: 1100ms;
    }
  `}
`;

const Thumbnail = styled(Image)`
  ${tw`inset-0 w-full h-full transition-all duration-300 ease-out`}

  position: absolute !important;
  transform: scale(1);
`;

const ThumbnailWrapper = styled.div`
  ${tw`relative w-full cursor-pointer overflow-hidden`}

  border-radius: 1rem;

  &::before {
    ${tw`w-full block`}

    content: '';
    padding-bottom: 56.25%;
  }

  &:hover {
    ${Thumbnail} {
      transform: scale(1.1);
    }
  }
`;

const Title = styled.h2`
  ${tw`text-gray-900 text-xl font-header font-bold leading-none mt-2 cursor-pointer`}
`;

const TagWrapper = styled.div`
  ${tw`w-full mt-2`}
`;

const TagLink = styled(Link)`
  ${tw`relative font-header font-normal leading-none text-primary-600 mr-2`}

  &::after {
    ${tw`absolute w-0 m-0 bg-primary-600 transition-all duration-300 ease-out rounded-full`}

    content: '';
    height: 1px;
    bottom: 2px;
    left: 0;
  }

  &:last-child {
    ${tw`mr-0`}
  }

  &:hover {
    &::after {
      ${tw`w-full`}
    }
  }
`;

export default WorkCard;
