import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { Link } from 'gatsby';
import React, { useState } from 'react';
import { useMount, useUnmount } from 'react-use';
import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';

import Image from '~/components/image';
import SEO from '~/components/seo';

import { useContentfulImage } from '~/hooks';

import wave01 from '~/images/wave-white_01.png';
import wave02 from '~/images/wave-white_02.png';
import wave03 from '~/images/wave-white_03.png';

import { ContentfulWork } from '~/types/graphql-types';

export const option = {
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
  },
};

interface Props {
  pageContext: {
    work: ContentfulWork;
  };
}

const Work: React.FC<Props> = ({ pageContext }: Props) => {
  const { work } = pageContext;
  const [currentPosition, setCurrentPosition] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const overviewTranslate = () => {
    if (currentPosition <= windowHeight / 4) {
      return currentPosition;
    } else {
      return windowHeight / 4;
    }
  };

  const onScroll = (): void => {
    setCurrentPosition(window.pageYOffset);
  };

  const onResize = () => {
    setWindowHeight(window.innerHeight);
  };

  useMount(() => {
    onScroll();
    document.addEventListener('scroll', onScroll);
    onResize();
    document.addEventListener('resize', onResize);
  });

  useUnmount(() => {
    document.removeEventListener('scroll', onScroll);
    document.removeEventListener('resize', onResize);
  });

  return (
    <>
      <SEO title={work.title ?? ''} />
      <BacgkroundWrapper>
        <BacgkroundImage fluid={work.thumbnail?.fluid} alt={work.title ?? ''} />
      </BacgkroundWrapper>
      <HeaderWrapper>
        <OverViewWrapper>
          <TitleWrapper>
            <h1>{work.title}</h1>
            <TagWrapper>
              {work.tags?.map((tag, i) => (
                <TagLink
                  to={`/works?tag=${tag?.title ?? ''}`}
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
      <WaveWrapper>
        <Wave />
        <Wave />
        <Wave />
      </WaveWrapper>
      <ContentsWrapper>
        <DescriptionWrapper>
          {documentToReactComponents(work.description?.json, option)}
          <DescriptionBackLink to="/works">back to WORKS</DescriptionBackLink>
        </DescriptionWrapper>
      </ContentsWrapper>
    </>
  );
};

const waveKeyframe = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-1920px);
  }
`;

const BacgkroundWrapper = styled.div`
  ${tw`fixed w-full h-screen inset-0`}
`;

const BacgkroundImage = styled(Image)`
  ${tw`absolute inset-0 m-0 h-full w-full`}

  &::after {
    ${tw`absolute h-full w-full inset-0 m-0 bg-gray-900 opacity-75`}

    content: '';
  }
`;

const HeaderWrapper = styled.div`
  ${tw`relative w-full h-screen`}
  padding-top: 80vh;
  height: 120vh;
`;

const OverViewWrapper = styled.div`
  ${tw`text-base-200 w-full m-auto flex justify-start align-top`}

  max-width: 768px;

  & > * {
    ${tw`mr-8`}
  }

  h1 {
    ${tw`font-header font-bold text-4xl leading-none`}
  }
`;

const TitleWrapper = styled.div`
  ${tw`block`}
`;

const TagWrapper = styled.div`
  ${tw`mt-4`}
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
  h4 {
    ${tw`font-header font-bold text-sm leading-none mb-1`}
  }

  p {
    ${tw`font-text text-sm leading-none`}
  }
`;

const WaveWrapper = styled.div`
  ${tw`absolute w-full overflow-hidden m-auto`}
  top: 100vh;
  left: 0;
  right: 0;
  height: 25vh;
`;

const Wave = styled.div`
  ${tw`absolute h-full`}
  animation: ${waveKeyframe} 12s linear infinite 0s;
  background: top left/1920px repeat-x ;
  min-width: 3840px;
  width: 200%;
  top: 0;
  transform: translateX(10px);

  &:nth-child(1) {
    background-image:  url(${wave03});
    left: 240px;
  }

  &:nth-child(2) {
    background-image:  url(${wave02});
    left: 120px;
  }
  &:nth-child(3) {
    background-image:  url(${wave01});
    left: 0;
  }
`;

const ContentsWrapper = styled.div`
  ${tw`relative w-full bg-base-200`}
`;

const DescriptionWrapper = styled.div`
  ${tw`w-full m-auto`}

  max-width: 768px;

  & > * {
    ${tw`mb-16`}
  }
`;

const DescriptionImage = styled(Image)`
  height: 400px;
`;

const DescriptionBackLink = styled(Link)`
  ${tw`relative inline-block align-middle text-sm`}

  &::before {
    ${tw`inline-block bg-gray-900 h-3 w-3 mr-2`}

    content: '';
  }

  &::after {
    ${tw`absolute w-0 m-0 bg-gray-900 transition-all duration-300 ease-out rounded-full`}

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

export default Work;
