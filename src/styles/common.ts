import styled, { css } from 'styled-components';
import tw from 'twin.macro';

import { media } from '~/styles';

export const Wrapper = styled.div<{ isOpen: boolean }>`
  ${tw`w-full pt-48 px-16 m-auto`}

  max-width: 1280px;
`;
