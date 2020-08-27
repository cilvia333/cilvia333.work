import { Link, navigate } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
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
}

const WorkCard: React.FC<Props> = ({
  thumbnail,
  title,
  tags,
  to,
  onClick,
}: Props) => {
  const onLinkClick = e => {
    onClick();
    navigate(to ?? '');
  };

  return (
    <>
      <Wrapper>
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

const Wrapper = styled.li`
  ${tw`w-1/2 pb-12`}

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
  `}
`;

const ThumbnailWrapper = styled.div`
  ${tw`relative w-full cursor-pointer`}
`;

const Thumbnail = styled(Image)`
  ${tw`absolute inset-0 w-full h-full`}

  border-radius: 1rem;
`;

const Title = styled.h2`
  ${tw`text-gray-900 text-xl font-header font-bold leading-none mt-2 cursor-pointer`}
`;

const TagWrapper = styled.div`
  ${tw`w-full mt-2`}
`;

const TagLink = styled(Link)`
  ${tw`relative font-header font-bold leading-none text-primary-500 mr-2`}

  &::after {
    ${tw`absolute w-0 m-0 bg-primary-500 transition-all duration-300 ease-out rounded-full`}

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
