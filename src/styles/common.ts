import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import { media } from '~/styles';

export const Wrapper = styled.div`
  ${tw`w-full pt-48 m-auto`}

  max-width: 1280px;

  ${media.lg`
    ${tw`px-32 pt-48`}
  `}

  ${media.md`
    ${tw`px-16 pt-40`}
  `}

  ${media.sm`
    ${tw`px-8 pt-32`}
  `}
`;
