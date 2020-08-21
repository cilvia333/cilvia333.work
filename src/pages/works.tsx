import { Link, graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import SEO from '~/components/seo';
import WorkCard from '~/components/work-card';

import { ContentfulFluid } from '~/types/graphql-types';

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

const Works: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const data = useStaticQuery(graphql`
    query allContentfulWork {
      allContentfulWork(limit: 1000) {
        edges {
          node {
            id
            slug
            title
            tags {
              title
            }
            thumbnail {
              title
              fluid(maxWidth: 1440) {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  `);

  useEffect(() => {
    setWorks(
      data.allContentfulWork.edges.map((edge: any) => {
        return edge.node;
      })
    );
  }, [data]);

  return (
    <>
      <SEO title="works" />
      <Wrapper>
        <CardWrapper>
          {works.map((work: Work, index) => {
            return (
              <WorkCard
                thumbnail={work.thumbnail?.fluid}
                title={work.title ?? ''}
                tags={work.tags}
                to={`/works/${work.slug}`}
                key={`work_${index}`}
              />
            );
          })}
        </CardWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  ${tw`relative w-full m-0 pt-40`}
`;

const CardWrapper = styled.ul`
  ${tw`w-full m-auto px-16 flex justify-around items-center`}

  max-width: 1024px;
`;

export default Works;
