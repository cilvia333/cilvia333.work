import React from 'react';
import { useEffect, useState } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

type Work = {
  id?: string;
  slug?: string;
  title?: string;
  tags?: {
    title?: string;
  }[];
  thumbnail?: {
    title?: string;
    sizes?: {
      base64?: string;
      aspectRatio?: string;
      src?: string;
      srcSet?: string;
      sizes?: string;
    };
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
              sizes(maxWidth: 1440) {
                ...GatsbyContentfulSizes
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
    <Layout>
      <SEO title="works" />
      {works.map((work: Work, index) => {
        return (
          <Link to={`/works/${work.slug}`} key={`work_${index}`}>
            {work.slug}
          </Link>
        );
      })}
    </Layout>
  );
};

export default Works;
