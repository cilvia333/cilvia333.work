import { useStaticQuery, graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import React, { useEffect, useState } from 'react';
import { ContentfulFluid } from '~/types/graphql-types';

interface Props {
  filename?: string;
  fluid?: FluidObject | ContentfulFluid | null;
  alt: string;
  className?: string;
}

const Image: React.FC<Props> = ({ filename, fluid, alt, className }: Props) => {
  const [image, setImage] = useState<any>();

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
    const image = data.images.edges.find((n: any) => {
      return n.node.relativePath.includes(filename);
    });
    setImage(image);
  }, [filename]);

  return fluid || image ? (
    <Img
      fluid={fluid ? fluid : image.node?.childImageSharp?.fluid}
      alt={alt}
      className={className}
    />
  ) : (
    <div />
  );
};

export default Image;
