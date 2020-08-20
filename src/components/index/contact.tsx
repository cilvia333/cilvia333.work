import { Twitter, Github, Tumblr } from '@icons-pack/react-simple-icons';
import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import LinkButton from '~/components/link-button';

const Contact: React.FC = () => {
  return (
    <>
      <Wrapper>
        <Header>
          <h3>Get in touch!</h3>
          <h2>ぜひ、ご連絡ください</h2>
        </Header>
        <ContentsWrapper>
          <Content>
            <ContentHeader>Contact</ContentHeader>
            <p>
              案件のご相談や作品の感想など、
              <br />
              なんでもご連絡ください。
            </p>
            <LinkButton to="/contact">連絡してみる！</LinkButton>
          </Content>
          <Content>
            <ContentHeader>Other Links</ContentHeader>
            <OtherLinkWrapper>
              <OtherLinkButton
                href="https://twitter.com/cilvia333"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter color="#F2F2F0" size={24} />
              </OtherLinkButton>
              <OtherLinkButton
                href="https://github.com/cilvia333"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github color="#F2F2F0" size={24} />
              </OtherLinkButton>
              <OtherLinkButton
                href="https://design.cilvia333.work"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Tumblr color="#F2F2F0" size={24} />
              </OtherLinkButton>
            </OtherLinkWrapper>
          </Content>
        </ContentsWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  ${tw`bg-primary-500 w-full py-32`}

  & > * {
    ${tw`my-16`}
  }
`;

const Header = styled.div`
  ${tw`flex justify-between items-center flex-col`}

  & > * {
    ${tw`my-1`}
  }

  h3 {
    ${tw`font-header font-bold text-3xl text-gray-900 leading-none`}
  }

  h2 {
    ${tw`inline-block relative font-header font-bold text-4xl text-gray-900 leading-none bg-base-200 px-16 py-4 rounded-full`}

    &::after {
      ${tw`absolute bg-primary-500 w-full`}
      content: '';
      height: 4px;
      bottom: -4px;
      left: 0;
      right: 0;
    }
  }
`;

const ContentsWrapper = styled.div`
  ${tw`bg-base-200 w-full m-auto`}
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

const OtherLinkButton = styled.a`
  ${tw`relative h-12 w-12 rounded-circle bg-primary-500`}

  & > * {
    ${tw`absolute inset-0 m-auto`}
  }
`;
export default Contact;
