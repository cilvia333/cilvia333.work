import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const Skill: React.FC = () => {
  return (
    <>
      <Wrapper>
        <Header>
          <h3>skill</h3>
          <h2>できること</h2>
          <p>こんなお手伝いができます</p>
        </Header>
        <ContentsWrapper></ContentsWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${tw`bg-base-200 w-full`}
`;

const Header = styled.div`
  ${tw`flex justify-between items-center flex-col`}

  & > * {
    ${tw`my-2`}
  }

  h3 {
    ${tw`font-header font-bold text-xl text-gray-500 leading-none`}
  }

  h2 {
    ${tw`inline-block relative font-header font-bold text-4xl text-gray-900 leading-none`}

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
    ${tw`font-header font-bold text-lg text-gray-900`}
  }
`;

const ContentsWrapper = styled.div`
  ${tw`w-full m-auto`}

  max-width: 1024px;
`;

export default Skill;
