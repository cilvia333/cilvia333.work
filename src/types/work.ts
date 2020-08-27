import { ContentfulFluid } from '~/types/graphql-types';

export type WorkHeadLine = {
  title: string;
  slug: string;
  thumbnail: ContentfulFluid;
};

export type Work = {
  id?: string;
  slug?: string;
  title?: string;
  tags?: {
    title?: string;
  }[];
  thumbnail?: {
    title?: string;
    fluid?: ContentfulFluid;
  };
};
