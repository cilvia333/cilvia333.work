import { Link } from 'gatsby';
import React, { useContext } from 'react';
import { useEffectOnce } from 'react-use';
import styled from 'styled-components';
import tw from 'twin.macro';

import SEO from '~/components/seo';

import { layoutContext } from '~/hooks';

import BackArrow from '~/images/back-arrow.inline.svg';

const NotFoundPage: React.FC = () => {
  const ctx = useContext(layoutContext);

  useEffectOnce(() => {
    ctx.setPageTitle('404');
  });

  return (
    <>
      <SEO title="404:NOT-FOUND" />
      <Wrapper>
        <Header>404</Header>
        <Text>
          お探しのページはありません。
          <br />
          <BackLink to="/">
            <StyledBackArrow />
            back to TOP
          </BackLink>
        </Text>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  ${tw`relative w-full pt-24 text-center`}
`;

const Header = styled.div`
  ${tw`font-header font-bold`}

  font-size: 200px;
`;

const Text = styled.div`
  ${tw`text-lg w-full h-full`}
`;

const BackLink = styled(Link)`
  ${tw`relative inline-block align-middle text-sm`}

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

const StyledBackArrow = styled(BackArrow)`
  ${tw`inline-block text-gray-900 h-3 w-3 mr-2 fill-current`}
`;

export default NotFoundPage;
