import { Link, graphql, useStaticQuery } from 'gatsby';
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import { CenterPosition } from '~/components/index/background';
import SkillWork from '~/components/index/skill-work';
import LinkButton from '~/components/link-button';

import { useIntersectionObserver } from '~/hooks';

import LineWaveSvg from '~/images/line-wave.svg';
import MoreTriBottomSvg from '~/images/more-tri-bottom.svg';
import MoreTriSvg from '~/images/more-tri.svg';

import { media } from '~/styles';

import { WorkHeadLine } from '~/types/work';

type Skills = {
  title: string;
  description: string;
  slug: string;
  works: WorkHeadLine[];
};

interface Props {
  setPosition: (position: number) => void;
  setCenter: (position: CenterPosition) => void;
}

const Skill: React.FC<Props> = ({ setPosition, setCenter }: Props) => {
  const skills: Skills[] = [
    {
      title: 'LP制作',
      description:
        'ウェブデザイン〜アニメーション、実装まで。かわいいデザインから、シンプルでスタイリッシュなデザインまで幅広く。CMSやSEO対策、アクセシビリティにも気を配ります。',
      works: [],
      slug: 'web',
    },
    {
      title: 'DTP・装丁デザイン',
      description:
        '同人誌やZINE、CDジャケットなどのデザイン。特殊装丁や印刷のディレクションなども対応可能です。',
      works: [],
      slug: 'dtp',
    },
    {
      title: 'ロゴデザイン',
      description:
        'VTuberからお店のロゴまで。幅広い媒体での利用も考えたデザインを行います。',
      works: [],
      slug: 'logo',
    },
  ];

  const data = useStaticQuery(graphql`
    query {
      skills: allContentfulSkill(filter: { node_locale: { eq: "ja" } }) {
        edges {
          node {
            slug
            works {
              title
              slug
              thumbnail {
                title
                fluid(maxWidth: 1440) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  `);
  data.skills.edges.forEach(edge => {
    const works = edge.node.works.map(work => {
      return {
        title: work.title,
        slug: work.slug,
        image: work.thumbnail.fluid,
      } as WorkHeadLine;
    });

    if (edge.node.slug === 'web') {
      skills[0].works = works;
    } else if (edge.node.slug === 'dtp') {
      skills[1].works = works;
    } else if (edge.node.slug === 'logo') {
      skills[2].works = works;
    } else {
      throw new Error(`Cannot find ${edge.node.slug}`);
    }
  });

  const componentRef = React.createRef<HTMLElement>();
  const [headerRef, isHeaderIntersection] = useIntersectionObserver();
  const intersection = skills.map(() => {
    const [ref, isIntersection] = useIntersectionObserver<HTMLLIElement>();
    return {
      ref,
      isIntersection,
    };
  });

  const onChangeOffset = () => {
    const offsetX = componentRef.current?.offsetLeft ?? 0;
    const offsetY = componentRef.current?.offsetTop ?? 0;
    const height = componentRef.current?.offsetHeight ?? 0;
    const width = componentRef.current?.offsetWidth ?? 0;

    setPosition(offsetY);
    setCenter({ x: offsetX + width / 2, y: offsetY + height / 2 });
  };

  useEffect(() => {
    onChangeOffset();
  }, [componentRef.current]);

  return (
    <>
      <Wrapper ref={componentRef} id="skill">
        <Header ref={headerRef} isIntersection={isHeaderIntersection}>
          <h3>skill</h3>
          <h2>できること</h2>
          <p>こんなお手伝いができます！</p>
        </Header>
        <ContentsWrapper>
          {skills.map((skill, i) => {
            return (
              <ContentWrapper
                key={`skill-content${i}`}
                ref={intersection[i].ref}
                id={`skill-${i + 1}`}
              >
                <ContentTitle isIntersected={intersection[i].isIntersection}>
                  <ContentNum>{i + 1}</ContentNum>
                  {skill.title}
                </ContentTitle>
                <ContentDescription
                  isIntersected={intersection[i].isIntersection}
                >
                  {skill.description}
                </ContentDescription>
                <WorksWrapper>
                  {skill.works.map((work, j) => {
                    return (
                      <>
                        <StyledWork
                          to={`/works/${work.slug}`}
                          title={work.title}
                          image={work.image}
                          number={i + 1}
                          position={j}
                          works={skill.works}
                          key={`skill-work${i}_${j}`}
                          isIntersected={intersection[i].isIntersection}
                        />
                        {j < 3 && (
                          <WorkDivider key={`skill-work-devider${i}_${j}`} />
                        )}
                      </>
                    );
                  })}
                  <WorkMoreLinkButton to={`/works/t/${skill.slug}`}>
                    <WorkMoreImage />
                    <WorkMoreImage />
                    <WorkMoreImage />
                    more
                  </WorkMoreLinkButton>
                </WorksWrapper>
              </ContentWrapper>
            );
          })}
        </ContentsWrapper>
        <OtherWorks>
          <h3>ほかにこんな作品も！</h3>
          <LinkButton to="/works">GO WORKS!</LinkButton>
        </OtherWorks>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  ${tw`w-full py-32`}

  & > * {
    ${tw`my-16`}
  }

  ${media.lg`
    ${tw`px-32`}
  `}

  ${media.md`
    ${tw`px-16`}
  `}

  ${media.sm`
    ${tw`px-8`}
  `}
`;

const Header = styled.div<{ isIntersection: boolean }>`
  ${tw`flex justify-between items-center flex-col`}

  h3 {
    ${tw`font-header font-bold text-2xl text-gray-500 leading-none mb-2 opacity-0 transition-all duration-300 ease-out`}
    transform: translateY(10%);

    ${media.sm`
      ${tw`text-xl`}
    `}
  }

  h2 {
    ${tw`inline-block relative font-header font-bold text-4xl text-gray-900 leading-none mb-8 opacity-0 transition-all duration-300 ease-out`}

    ${media.sm`
      ${tw`text-3xl`}
    `}

    &::before, &::after {
      ${tw`absolute bg-primary-500 m-0 transition-all duration-300 ease-out`}
      content: '';
      height: 12px;
      width: 54%;
      background: url(${LineWaveSvg}) no-repeat;
      background-size: cover;
      bottom: -24px;
    }

    &::before {
      right: -4%;
      background-position: center right -100%;
    }

    &::after {
      left: -4%;
      background-position: center left -100%;
    }
  }

  p {
    ${tw`font-header font-bold text-xl text-gray-900 opacity-0 transition-all duration-300 ease-out delay-200`}
    transform: translateY(10%);

    ${media.sm`
      ${tw`text-lg`}
    `}
  }

  ${({ isIntersection }) =>
    isIntersection &&
    css`
      h3 {
        ${tw`opacity-100`}
        transform: translateY(0);
      }
      h2 {
        ${tw`opacity-100`}

        &::before {
          background-position: center right 0%;
        }

        &::after {
          background-position: center left 0%;
        }
      }
      p {
        ${tw`opacity-100`}
        transform: translateY(0);
      }
    `}
`;

const ContentsWrapper = styled.ol`
  ${tw`w-full m-auto`}

  max-width: 1024px;
  list-style: none;
`;

const ContentWrapper = styled.li`
  ${tw`w-full my-24`}

  max-width: 1024px;

  & > * {
    ${tw`my-4`}
  }
`;

const ContentTitle = styled.div<{ isIntersected: boolean }>`
  ${tw`font-header font-bold text-3xl text-gray-900 leading-10 transition-all duration-300 ease-out opacity-0`}

  ${media.sm`
    ${tw`text-2xl leading-8`}
  `}

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      ${tw`opacity-100`}
    `}
`;

const ContentNum = styled.div`
  ${tw`text-base-200 bg-primary-500 rounded-circle w-10 h-10 inline-block text-center mr-2`}

  ${media.sm`
    ${tw`w-8 h-8`}
  `}
`;

const ContentDescription = styled.div<{ isIntersected: boolean }>`
  ${tw`text-sm text-gray-900 leading-loose w-full transition-all duration-300 ease-out opacity-0`}
  max-width: 530px;

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      ${tw`opacity-100`}
    `}
`;

const WorksWrapper = styled.div`
  ${tw`text-gray-900 flex justify-between items-center`}

  & > * {
    &:nth-child(1) {
      transition-delay: 0;
    }
    &:nth-child(2) {
      transition-delay: 100ms;
    }
    &:nth-child(3) {
      transition-delay: 200ms;
    }
    &:nth-child(4) {
      transition-delay: 300ms;
    }
    &:nth-child(5) {
      transition-delay: 400ms;
    }
    &:nth-child(6) {
      transition-delay: 500ms;
    }
  }

  ${media.sm`
    ${tw`flex-col`}

    & > * {
      ${tw`mb-4`}
    }
  `}
`;

const StyledWork = styled(({ isIntersected, ...props }: any) => (
  <SkillWork {...props} />
))`
  ${tw`transition-all duration-300 ease-out opacity-0`}
  transform: translateY(10%);

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      ${tw`opacity-100`}
      transform: translateY(0);
    `}
`;

const WorkDivider = styled.div`
  ${tw`h-5 w-5 rounded-circle bg-primary-500`}

  ${media.lg`
    ${tw`w-4 h-4`}
  `}
`;

const WorkMoreImage = styled.div`
  ${tw`absolute h-20 w-20 font-header text-gray-900 opacity-0 transition-all duration-300 ease-out`}

  background: url(${MoreTriSvg}) center/contain no-repeat;

  z-index: -1;

  &:nth-child(1) {
    ${tw`opacity-100 delay-200`}
      transform: translateX(0) scale(1);
  }
  &:nth-child(2) {
    ${tw`delay-100`}
    transform: translateX(-40px) scale(1);
  }
  &:nth-child(3) {
    ${tw`delay-0`}
    transform: translateX(-60px) scale(1);
  }

  ${media.sm`
    ${tw`hidden`}
  `}
`;

const WorkMoreLinkButton = styled(Link)`
  ${tw`relative h-20 w-20 font-header font-bold text-lg text-gray-900 pl-4 text-center`}
  line-height: 5rem;

  &:hover {
    ${WorkMoreImage} {
      ${tw`opacity-100 delay-0`}
      &:nth-child(1) {
        transform: translateX(0) scale(0.8);
      }
      &:nth-child(2) {
        ${tw`delay-0`}
        transform: translateX(-20px) scale(0.8);
      }
      &:nth-child(3) {
        ${tw`delay-100`}
        transform: translateX(-40px) scale(0.8);
      }
    }
  }

  ${media.lg`
    ${tw`w-16 h-16 pl-3`}
    line-height: 3.7rem;
  `}

  ${media.sm`
    ${tw`w-16 h-16 pl-0 text-center`}
    background: url(${MoreTriBottomSvg}) center/contain no-repeat;
    line-height: 2.3rem;
  `}
`;

const OtherWorks = styled.div`
  ${tw`text-center w-full`}
  h3 {
    ${tw`font-header font-bold text-2xl text-gray-900 leading-none mb-8`}
  }
`;
export default Skill;
