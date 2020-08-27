import { Twitter, Github, Tumblr } from '@icons-pack/react-simple-icons';
import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';

import { CenterPosition } from '~/components/index/background';
import LinkButton from '~/components/link-button';

import { useIntersectionObserver } from '~/hooks';

import { media } from '~/styles';

interface Props {
  setPosition: (position: number) => void;
  setCenter: (position: CenterPosition) => void;
}

const Contact: React.FC<Props> = ({ setPosition, setCenter }: Props) => {
  const componentRef = React.createRef<HTMLElement>();
  const centerRef = React.createRef<HTMLDivElement>();
  const [contactRef, isIntersected] = useIntersectionObserver();

  const onChangeOffset = () => {
    setPosition(componentRef.current?.offsetTop ?? 0);
  };

  const onChangeCenter = () => {
    const offsetX = centerRef.current?.offsetLeft ?? 0;
    const offsetY = centerRef.current?.offsetTop ?? 0;
    const height = centerRef.current?.offsetHeight ?? 0;
    const width = centerRef.current?.offsetWidth ?? 0;

    setCenter({ x: offsetX + width / 2, y: offsetY + height / 2 });
  };

  useEffect(() => {
    onChangeOffset();
  }, [componentRef.current]);

  useEffect(() => {
    onChangeCenter();
  }, [centerRef.current]);

  return (
    <>
      <Wrapper ref={componentRef} id="contact">
        <Header ref={contactRef} isIntersected={isIntersected}>
          <h3>Get in touch!</h3>
          <h2>ぜひ、ご連絡ください</h2>
        </Header>
        <ContentsWrapper ref={centerRef}>
          <Content>
            <ContentHeader>Contact</ContentHeader>
            <p>
              案件のご相談や作品の感想など、
              <br />
              なんでもご連絡ください。
            </p>
            <LinkButton to="/contacts">連絡してみる！</LinkButton>
          </Content>
          <Content>
            <ContentHeader>Other Links</ContentHeader>
            <OtherLinkWrapper>
              <OtherLinkButton
                href="https://twitter.com/cilvia333"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SvgWrapper>
                  <Twitter size={24} />
                </SvgWrapper>
              </OtherLinkButton>
              <OtherLinkButton
                href="https://github.com/cilvia333"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SvgWrapper>
                  <Github size={24} />
                </SvgWrapper>
              </OtherLinkButton>
              <OtherLinkButton
                href="https://design.cilvia333.work"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SvgWrapper>
                  <Tumblr size={24} />
                </SvgWrapper>
              </OtherLinkButton>
            </OtherLinkWrapper>
          </Content>
        </ContentsWrapper>
      </Wrapper>
    </>
  );
};

const headerKeyframes = keyframes`
  0%{
    opacity: 0;
    width: 5%;
  }
  10% {
    opacity: 1;
  }
  100%{
    opacity: 1;
    width: 100%;
  }
`;

const Wrapper = styled.section`
  ${tw`w-full py-32`}

  & > * {
    ${tw`my-16`}
  }
`;

const Header = styled.div<{ isIntersected: boolean }>`
  ${tw`flex justify-between items-center flex-col`}

  & > * {
    ${tw`my-1`}
  }

  h3 {
    ${tw`font-header font-bold text-3xl text-gray-900 leading-none opacity-0 transition-all duration-500 ease-out`}
    transform: translateY(10%);

    ${media.sm`
      ${tw`text-2xl`}
    `}
  }

  h2 {
    ${tw`inline-block relative font-header font-bold text-4xl text-gray-900 leading-none px-16 py-4 opacity-0 transition-all duration-500 ease-out delay-200`}

    ${media.sm`
      ${tw`text-2xl px-8`}
    `}

    &::before {
      ${tw`absolute bg-base-200 h-full rounded-full inset-0 m-auto`}
      content: '';
      z-index: -1;
      width: 5%;
      animation: 600ms cubic-bezier(0, 0.35, 0.76, 1) forwards;
    }

    &::after {
      ${tw`absolute bg-primary-500 w-full`}
      content: '';
      height: 4px;
      bottom: -4px;
      left: 0;
      right: 0;
    }
  }

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      h3 {
        ${tw`opacity-100`}
        transform: translateY(0);
      }
      h2 {
        ${tw`opacity-100`}

        &::before {
          animation-name: ${headerKeyframes};
        }
      }
    `}
`;

const ContentsWrapper = styled.div`
  ${tw`w-full m-auto`}
  max-width: 400px;

  & > * {
    ${tw`my-16`}
  }
`;

const Content = styled.div`
  ${tw`w-full text-center`}

  & > * {
    ${tw`my-3`}
  }

  p {
    ${tw`font-sans text-sm text-gray-900 leading-loose`}
  }
`;

const ContentHeader = styled.h4`
  ${tw`relative inline-block font-header font-bold text-2xl text-gray-900 leading-none px-8`}

  &::after {
    ${tw`absolute w-full bg-gray-900`}
    content :'';
    height: 1px;
    bottom: 0;
    right: 0;
    left: 0;
  }
`;

const OtherLinkWrapper = styled.div`
  ${tw`flex justify-around items-center`}
`;

const SvgWrapper = styled.div`
  svg {
    ${tw`text-primary-500 fill-current absolute inset-0 m-auto transition-all duration-300 ease-out`}
  }
`;

const OtherLinkButton = styled.a`
  ${tw`relative h-12 w-12 rounded-circle bg-base-200 border-primary-500 border-solid border-2 overflow-hidden`}

  &::before {
    ${tw`absolute bg-primary-500 inset-0 m-auto transition-transform duration-300 ease-out rounded-circle`}

    content: "";
    transform: scale(0);
    height: 105%;
    width: 105%;
  }

  & > * {
    ${tw`absolute inset-0 m-auto`}
  }

  &:hover {
    &::before {
      transform: scale(1);
    }

    svg {
      ${tw`text-base-200`}
    }
  }
`;
export default Contact;
