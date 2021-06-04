import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { Link, navigate, useStaticQuery, graphql } from 'gatsby';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { useWindowSize, useWindowScroll, useEffectOnce } from 'react-use';
import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';

import Image from '~/components/image';
import SEO from '~/components/seo';
import Wave from '~/components/wave';

import { useContentfulImage, layoutContext } from '~/hooks';

import BackArrow from '~/images/back-arrow.inline.svg';

import { media } from '~/styles';

import { ContentfulWork } from '~/types/graphql-types';
import { WorkHeadLine } from '~/types/work';

export const option = {
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: function renderEmbeddedAsset(node: any) {
      const fluid = useContentfulImage(node.data.target.fields.file['ja'].url);
      return (
        <DescriptionImage
          alt={node.data.target.fields.title['ja']}
          fluid={fluid}
        />
      );
    },
    [INLINES.HYPERLINK]: function renderEmbeddedAsset(
      node: any,
      children: any
    ) {
      return (
        <HyperLink
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </HyperLink>
      );
    },
  },
};

interface Props {
  pageContext: {
    work: ContentfulWork;
    defaultPosition: number;
  };
}

const Work: React.FC<Props> = ({ pageContext }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulWork(
        filter: { node_locale: { eq: "ja" } }
        sort: { fields: [updatedAt], order: DESC }
      ) {
        edges {
          node {
            slug
            title
            thumbnail {
              fluid(maxWidth: 1440) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
        }
      }
    }
  `);
  const defaultWorks = data.allContentfulWork.edges.map((edge: any) => {
    return {
      title: edge.node.title ?? '',
      slug: edge.node.slug ?? '',
      thumbnail: edge.node.thumbnail.fluid ?? '',
    } as WorkHeadLine;
  });

  const { work, defaultPosition } = pageContext;
  const { x, y } = useWindowScroll(0);
  const { width, height } = useWindowSize();
  const ctx = useContext(layoutContext);
  const [prevWork, setPrevWork] = useState<WorkHeadLine>();
  const [nextWork, setNextWork] = useState<WorkHeadLine>();

  const handlePrevClick = () => {
    ctx.setWorkPosition(ctx.workPosition - 1);
    navigate(`/works/${prevWork?.slug}`);
  };

  const handleNextClick = () => {
    ctx.setWorkPosition(ctx.workPosition + 1);
    navigate(`/works/${nextWork?.slug}`);
  };

  const getPage = () => {
    const page = Math.floor(ctx.workPosition / 12);

    return page > 0 ? `/${page + 1}` : '';
  };

  const getWavePosition = () => {
    return height - y;
  };

  useEffect(() => {
    if (y >= height * 0.25) {
      ctx.setIsWhite(false);
    } else {
      ctx.setIsWhite(true);
    }
  }, [y]);

  useEffectOnce(() => {
    ctx.setPageTitle('WORKS');
    if (ctx.workPosition < 0) {
      ctx.setWorkPosition(defaultPosition);
      ctx.setWorkList(defaultWorks);
      if (defaultPosition > 0) {
        setPrevWork(defaultWorks[defaultPosition - 1]);
      }
      if (defaultPosition < defaultWorks.length - 1) {
        setNextWork(defaultWorks[defaultPosition + 1]);
      }
    } else {
      if (ctx.workPosition > 0) {
        setPrevWork(ctx.workList[ctx.workPosition - 1]);
      }
      if (ctx.workPosition < ctx.workList.length - 1) {
        setNextWork(ctx.workList[ctx.workPosition + 1]);
      }
    }
  });

  return (
    <>
      <SEO title={work.title ?? 'WORKS'} />
      <BacgkroundWrapper>
        <BacgkroundImage fluid={work.thumbnail?.fluid} alt={work.title ?? ''} />
      </BacgkroundWrapper>
      <WaveWrapper style={{ transform: `translateY(${getWavePosition()}px)` }}>
        <StyledWave color="white" />
      </WaveWrapper>
      <HeaderWrapper>
        <OverViewWrapper isWhite={getWavePosition() > height * 0.75}>
          <TitleWrapper>
            <h1>{work.title}</h1>
            <TagWrapper>
              {work.tags?.map((tag, i) => (
                <TagLink
                  to={`/works/t/${tag?.title ?? ''}`}
                  key={`work_tag-${i}`}
                >{`#${tag?.title ?? ''}`}</TagLink>
              ))}
            </TagWrapper>
          </TitleWrapper>
          <OverView>
            <h4>Concept</h4>
            <p>{work.concept ?? ''}</p>
          </OverView>
          <OverView>
            <h4>Date</h4>
            <p>{work.date ?? ''}</p>
          </OverView>
        </OverViewWrapper>
      </HeaderWrapper>
      <ContentsWrapper>
        <DescriptionWrapper>
          {documentToReactComponents(work.description?.json, option)}
          <DescriptionBackLink
            to={`${ctx.workBack.path}${
              ctx.workBack.path === '/' ? ctx.workBack.scroll : ''
            }${getPage()}`}
          >
            <StyledBackArrow />
            back to {ctx.workBack.title}
          </DescriptionBackLink>
        </DescriptionWrapper>
      </ContentsWrapper>
      <ControlWrapper>
        {prevWork && (
          <Control>
            <ControlText onClick={handlePrevClick} isWhite={ctx.white}>
              PREV WORK
            </ControlText>
            <ControlBG fluid={prevWork?.thumbnail} alt={prevWork?.title} />
          </Control>
        )}
        {nextWork && (
          <Control Next>
            <ControlText onClick={handleNextClick} isWhite={ctx.white} Next>
              NEXT WORK
            </ControlText>
            <ControlBG fluid={nextWork?.thumbnail} alt={nextWork?.title} Next />
          </Control>
        )}
      </ControlWrapper>
    </>
  );
};

const BacgkroundWrapper = styled.div`
  ${tw`fixed w-full h-screen inset-0`}
`;

const BacgkroundImage = styled(Image)`
  ${tw`absolute inset-0 m-0 h-full w-full`}

  &::after {
    ${tw`absolute h-full w-full inset-0 m-0 bg-gray-700 opacity-25`}

    content: '';
  }
`;

const ControlWrapper = styled.div`
  ${tw`fixed w-full h-screen inset-0 z-10 pointer-events-none`}
`;

const Control = styled.div<{ Next?: boolean }>`
  ${tw`absolute h-full pointer-events-none`}
  top: 0;
  bottom: 0;

  ${({ Next }) =>
    Next
      ? css`
          right: 0;
        `
      : css`
          left: 0;
        `}
`;

const ControlBG = styled(Image)<{ Next?: boolean }>`
  ${tw`absolute h-full w-0 transition-all duration-300 ease-out inset-y-0 my-auto mx-0`}

  &::after {
    ${tw`absolute h-full w-full transition-all duration-300 ease-out inset-0 bg-gray-900 opacity-75`}
    content: '';
  }

  ${({ Next }) =>
    Next
      ? css`
          right: 0;
        `
      : css`
          left: 0;
        `}
`;

const ControlText = styled.div<{ Next?: boolean; isWhite: boolean }>`
  ${tw`absolute text-gray-900 text-lg font-header font-bold cursor-pointer pointer-events-auto inset-y-0 my-auto text-center transition-all duration-300 ease-out`}
  writing-mode: vertical-rl;
  z-index: 1;

  ${({ Next }) =>
    Next
      ? css`
          ${tw`pr-4`}
          right: 0;

          &::after {
            ${tw`absolute inset-y-0 my-auto bg-gray-900 transition-all duration-300 ease-out`}
            content: '';
            height: 1px;
            width: 22px;
            right: -4px;
          }
        `
      : css`
          ${tw`pl-4`}
          left: 0;

          &::before {
            ${tw`absolute inset-y-0 my-auto bg-gray-900 transition-all duration-300 ease-out`}
            content: '';
            height: 1px;
            width: 22px;
            left: -4px;
          }
        `}

  ${({ isWhite }) =>
    isWhite &&
    css`
      ${tw`text-base-200`}

      &::before, &::after {
        ${tw`bg-base-200`}
      }
    `}


  &:hover ~ ${ControlBG}{
    width: 100px;
  }
`;

const HeaderWrapper = styled.div`
  ${tw`relative w-full h-screen`}
`;

const OverViewWrapper = styled.div<{ isWhite: boolean }>`
  ${tw`absolute inset-x-0 my-0 mx-auto text-gray-900 w-full m-auto flex justify-start align-top pointer-events-auto`}

  max-width: 768px;
  bottom: 64px;

  ${media.md`
    ${tw`px-16`}
    max-width: 100%;
    bottom: 32px;
  `}

  ${media.sm`
    ${tw`px-16 flex-col`}
  `}

  & > * {
    ${tw`mr-8 transition-all duration-300 ease-out`}
  }

  h1,
  h4,
  p {
    ${tw`transition-all duration-300 ease-out`}
  }

  h1 {
    ${tw`font-header font-bold text-4xl leading-none`}

    ${media.md`
    ${tw`text-2xl`}
  `}
  }

  ${({ isWhite }) =>
    isWhite &&
    css`
      ${tw`text-base-200`}
    `}
`;

const TitleWrapper = styled.div`
  ${tw`block`}
`;

const TagWrapper = styled.div`
  ${tw`mt-4`}

  ${media.sm`
    ${tw`mt-2`}
  `}
`;

const TagLink = styled(Link)`
  ${tw`relative font-header font-bold text-xl leading-none text-primary-500 mr-2`}

  &::after {
    ${tw`absolute w-0 m-0 bg-primary-500 transition-all duration-300 ease-out rounded-full`}

    content: '';
    height: 2px;
    bottom: 3px;
    left: 0;
  }

  &:hover {
    &::after {
      ${tw`w-full`}
    }
  }
`;

const OverView = styled.div`
  ${media.sm`
    ${tw`mt-2`}
  `}

  h4 {
    ${tw`font-header font-bold text-sm leading-none mb-1`}
  }

  p {
    ${tw`font-text text-sm leading-none`}
  }
`;

const WaveWrapper = styled.div`
  ${tw`absolute m-auto pointer-events-none w-full`}
  top: 0;
  height: 150vh;

  &::after {
    ${tw`absolute m-auto block pointer-events-none bg-base-200 w-full`}
    content: "";
    bottom: 0;
    height: 130vh;
  }
`;

const StyledWave = styled(Wave)`
  ${tw`absolute m-auto pointer-events-none`}
  top: 0;
  height: 25vh;
`;

const ContentsWrapper = styled.div`
  ${tw`relative w-full bg-base-200`}
`;

const DescriptionWrapper = styled.div`
  ${tw`w-full m-auto text-gray-900 text-sm`}

  max-width: 768px;
  line-height: 35px;

  ${media.md`
    ${tw`px-16 mt-16`}
    max-width: 100%;
  `}

  & > * {
    ${tw`mb-8`}
  }
`;

const DescriptionImage = styled(Image)`
  ${tw`h-full`}
`;

const HyperLink = styled.a`
  ${tw`relative text-primary-500 `}

  &::after {
    ${tw`absolute w-0 m-0 bg-primary-500 transition-all duration-300 ease-out rounded-full`}

    content: '';
    height: 1px;
    bottom: 0;
    left: 0;
  }

  &:hover {
    &::after {
      ${tw`w-full`}
    }
  }
`;

const DescriptionBackLink = styled(Link)`
  ${tw`relative inline-block align-middle text-sm`}

  &::after {
    ${tw`absolute w-0 m-0 bg-gray-900 transition-all duration-300 ease-out rounded-full`}

    content: '';
    height: 1px;
    bottom: 6px;
    left: 0;
  }

  &:hover {
    &::after {
      ${tw`w-full`}
    }
  }
`;

const StyledBackArrow = styled(BackArrow)`
  ${tw`inline-block text-gray-900 h-3 w-3 mr-2 fill-current`}
`;

export default Work;
