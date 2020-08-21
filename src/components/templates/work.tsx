import { Link } from 'gatsby';
import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';

import Image from '~/components/image';
import SEO from '~/components/seo';

import wave01 from '~/images/wave-white_01.png';
import wave02 from '~/images/wave-white_02.png';
import wave03 from '~/images/wave-white_03.png';

import { ContentfulWork } from '~/types/graphql-types';

interface Props {
  pageContext: {
    work: ContentfulWork;
  };
}

const Work: React.FC<Props> = ({ pageContext }: Props) => {
  const { work } = pageContext;

  useEffect(() => {
    console.log(work);
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
      <DescriptionWrapper></DescriptionWrapper>
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
  ${tw`relative w-full h-screen grid grid-rows-4 grid-flow-col gap-4`}
`;

const OverViewWrapper = styled.div`
  ${tw`row-start-4 row-end-5 text-base-200 w-full m-auto flex justify-start align-top`}

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
  ${tw`relative w-full overflow-hidden`}

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

const DescriptionWrapper = styled.div`
  ${tw`relative w-full`}

  max-width: 768px;
`;

export default Work;
