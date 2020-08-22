import { css } from 'styled-components';

export const media = {
  xxl: (...args) => css`
    @media (min-width: 1281px) {
      ${css(...args)};
    }
  `,
  xl: (...args) => css`
    @media (max-width: 1280px) {
      ${css(...args)};
    }
  `,
  lg: (...args) => css`
    @media (max-width: 1024px) {
      ${css(...args)};
    }
  `,
  md: (...args) => css`
    @media (max-width: 768px) {
      ${css(...args)};
    }
  `,
  sm: (...args) => css`
    @media (max-width: 640px) {
      ${css(...args)};
    }
  `,
};
