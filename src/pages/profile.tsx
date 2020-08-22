import { Twitter, Github, Tumblr } from '@icons-pack/react-simple-icons';
import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import Image from '~/components/image';
import SEO from '~/components/seo';

type Event = {
  date: string;
  text: string;
};

const events: Event[] = [
  { date: '1999.03', text: 'Born in Okayama, Japan' },
  {
    date: '2019.03',
    text:
      'Graduated from Depertment of Computer and Information Engineering, NIT Tsuyama Collage',
  },
  {
    date: '2019.04 -',
    text:
      'Entered into Depertment of Design Informatics, Musashino Art University.',
  },
  {
    date: '2019.04 -',
    text:
      'Part-time ad Hematite Inc. as a web front-end engineer and a designer',
  },
  {
    date: '2020.06 -',
    text: 'Part-time ad Pixiv Inc. as a web front-end engineer and a designer',
  },
];

const Profile: React.FC = () => {
  return (
    <>
      <SEO title="profile" />
      <Wrapper>
        <Icon filename={'icon.png'} alt="icon" />
        <TextWrapper>
          <Heading>
            <h1>塩見海怜 / cilvia333</h1>
            <h2>Shiomi Kairi / sílviə333</h2>
            <LinkWrapper>
              <LinkButton
                href="https://twitter.com/cilvia333"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter color="#333333" size={24} />
              </LinkButton>
              <LinkButton
                href="https://github.com/cilvia333"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github color="#333333" size={24} />
              </LinkButton>
              <LinkButton
                href="https://design.cilvia333.work"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Tumblr color="#333333" size={24} />
              </LinkButton>
            </LinkWrapper>
          </Heading>
          <Description>
            <p>
              {'　'}
              1999年3月17日岡山県にて生まれる。2014年から津山高専へ進学し、高専ロボコンに取り組む。その傍らでゲーム制作やデザインなどの活動も行う。2019年に武蔵野美術大学造形学部デザイン情報学科２年次へ編入し、グラフィックデザインの活動を始める。
              <br />
              {'　'}
              現在は、学業とともにグラフィックデザイナー兼ウェブフロントエンジニアとして活動している。
            </p>
          </Description>
          <History>
            {events.map((event: Event, i: number) => (
              <Event key={`event_${i}`}>
                <h4>{event.date}</h4>
                <p>{event.text}</p>
              </Event>
            ))}
          </History>
        </TextWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${tw`w-full pt-32 px-16 grid gap-16`}

  grid-template-columns: 1fr minmax(auto,768px) 1fr;
`;

const Icon = styled(Image)`
  ${tw`rounded-circle h-32 w-32`}

  justify-self: flex-end;
`;

const TextWrapper = styled.div`
  ${tw`w-full col-start-2 col-end-3`}
`;

const Heading = styled.section`
  ${tw`w-full text-gray-900 leading-none font-header font-bold mt-8`}

  h1 {
    ${tw`text-4xl`}
  }

  h2 {
    ${tw`text-2xl`}
  }
`;

const LinkWrapper = styled.div`
  ${tw`mt-2`}
`;

const LinkButton = styled.a`
  ${tw`h-6 w-6 mr-4 inline-block`}
`;

const Description = styled.section`
  ${tw`mt-12 text-gray-900 font-text text-sm`}

  line-height: 35px;
`;

const History = styled.section`
  ${tw`relative pt-6 mt-12`}

  &::before {
    ${tw`absolute m-0 top-0 left-0 bg-primary-500 rounded-full`}

    content: "";
    height: 4px;
    width: 24px;
  }
`;

const Event = styled.section`
  ${tw`text-gray-900 text-sm mb-8 leading-none`}

  h4 {
    ${tw`font-header font-bold `}
  }

  p {
    ${tw`font-text mt-1`}
  }
`;

export default Profile;
