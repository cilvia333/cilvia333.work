import { Link } from 'gatsby';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { CenterPosition } from '~/components/index/background';
import Work from '~/components/index/work';
import LinkButton from '~/components/link-button';

import MoreTriSvg from '~/images/more-tri.svg';

type WorkHeadline = {
  title: string;
  link: string;
  image: string;
};

const webMockup: WorkHeadline[] = [
  {
    title: 'VIVIDTUNE -yellow-',
    link: 'vividtune',
    image: 'icon.png',
  },
  {
    title: 'VIVIDTUNE -yellow-',
    link: 'vividtune',
    image: 'icon.png',
  },
  {
    title: 'VIVIDTUNE -yellow-',
    link: 'vividtune',
    image: 'icon.png',
  },
];

const mockup = [
  {
    title: 'LP制作',
    description:
      'ウェブデザイン〜アニメーション、実装まで。かわいいデザインから、シンプルでスタイリッシュなデザインまで幅広く。CMSやSEO対策、アクセシビリティにも気を配ります。',
    works: webMockup,
    link: '/works?tag=web',
  },
  {
    title: 'DTP・装丁デザイン',
    description:
      '同人誌やZINE、CDジャケットなどのデザイン。特殊装丁や印刷のディレクションなども対応可能です。',
    works: webMockup,
    link: '/works?tag=dtp',
  },
  {
    title: 'ロゴデザイン',
    description:
      'VTuberからお店のロゴまで。幅広い媒体での利用も考えたデザインを行います。',
    works: webMockup,
    link: '/works?tag=logo',
  },
];

interface Props {
  setPosition: (position: number) => void;
  setCenter: (position: CenterPosition) => void;
}

const Skill: React.FC<Props> = ({ setPosition, setCenter }: Props) => {
  const componentRef = React.createRef<HTMLElement>();

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
  }, [
    componentRef.current?.offsetTop,
    componentRef.current?.offsetHeight,
    componentRef.current?.offsetLeft,
    componentRef.current?.offsetWidth,
  ]);

  return (
    <>
      <Wrapper ref={componentRef} id="skill">
        <Header>
          <h3>skill</h3>
          <h2>できること</h2>
          <p>こんなお手伝いができます！</p>
        </Header>
        <ContentsWrapper>
          {mockup.map((data, i) => {
            return (
              <ContentWrapper key={`skill-content${i}`}>
                <ContentTitle>
                  <ContentNum>{i + 1}</ContentNum>
                  {data.title}
                </ContentTitle>
                <ContentDescription>{data.description}</ContentDescription>
                <WorksWrapper>
                  {data.works.map((work, j) => {
                    return (
                      <>
                        <Work
                          to={`/works/${work.link}`}
                          title={work.title}
                          image={work.image}
                          key={`skill-work${i}_${j}`}
                        />
                        {j < 3 && (
                          <WorkDivider key={`skill-work-devider${i}_${j}`} />
                        )}
                      </>
                    );
                  })}
                  <WorkMoreLinkButton to={data.link}>more</WorkMoreLinkButton>
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
`;

const Header = styled.div`
  ${tw`flex justify-between items-center flex-col`}

  h3 {
    ${tw`font-header font-bold text-2xl text-gray-500 leading-none mb-2`}
  }

  h2 {
    ${tw`inline-block relative font-header font-bold text-4xl text-gray-900 leading-none mb-8`}

    &::after {
      ${tw`absolute bg-primary-500 w-full`}
      content: '';
      height: 4px;
      bottom: -4px;
      left: 0;
      right: 0;
    }
  }

  p {
    ${tw`font-header font-bold text-xl text-gray-900`}
  }
`;

const ContentsWrapper = styled.ol`
  ${tw`w-full m-auto`}

  max-width: 1024px;
`;

const ContentWrapper = styled.li`
  ${tw`w-full my-24`}

  max-width: 1024px;

  & > * {
    ${tw`my-4`}
  }
`;

const ContentTitle = styled.div`
  ${tw`font-header font-bold text-3xl text-gray-900 leading-10`}
`;

const ContentNum = styled.div`
  ${tw`text-base-200 bg-primary-500 rounded-circle w-10 h-10 inline-block text-center mr-2`}
`;

const ContentDescription = styled.div`
  ${tw`text-sm text-gray-900 leading-loose w-full`}
  max-width: 530px;
`;

const WorksWrapper = styled.div`
  ${tw`text-gray-900 flex justify-between items-center`}
`;

const WorkDivider = styled.div`
  ${tw`h-5 w-5 rounded-circle bg-primary-500`}
`;

const WorkMoreLinkButton = styled(Link)`
  ${tw`h-20 w-20 font-header font-bold text-lg text-gray-900 pl-4`}

  background: url(${MoreTriSvg}) center/contain no-repeat;
  line-height: 5rem;
`;

const OtherWorks = styled.div`
  ${tw`text-center w-full`}
  h3 {
    ${tw`font-header font-bold text-2xl text-gray-900 leading-none mb-8`}
  }
`;
export default Skill;
