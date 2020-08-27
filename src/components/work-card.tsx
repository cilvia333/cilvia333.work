import { Link, navigate } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import Image from '~/components/image';

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
  ${tw`w-full py-2`}
  max-width: 256px;
`;

const ThumbnailWrapper = styled.div`
  ${tw`w-full h-32 cursor-pointer`}
`;

const Thumbnail = styled(Image)`
  ${tw`w-full h-full`}

  border-radius: 1rem;
`;

const Title = styled.h2`
  ${tw`text-gray-900 text-xl font-header font-bold leading-none mt-2 cursor-pointer`}
`;

const TagWrapper = styled.div`
  ${tw`w-full`}
`;

const TagLink = styled(Link)`
  ${tw`relative font-header font-bold text-sm leading-none text-primary-500 mr-2`}

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
