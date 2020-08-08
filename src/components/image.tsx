import React from 'react';
import { useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

interface Props {
  filename: string;
  alt: string;
}

const Image = ({ filename, alt }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      images: allFile {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  useEffect(() => {
    const image = data.images.edges.find(n => {
      return n.node.relativePath.includes(filename);
    });
  }, [filename]);

  return image ? (
    <Img fluid={image.node.childImageSharp.fluid} alt={alt} />
  ) : (
    <div />
  );
};

export default Image;
