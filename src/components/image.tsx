import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import React, { useEffect, useState } from 'react';

interface Props {
  filename: string;
  alt: string;
}

const Image: React.FC<Props> = ({ filename, alt }: Props) => {
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

  return image ? (
    <Img fluid={image.node.childImageSharp.fluid} alt={alt} />
  ) : (
    <div />
  );
};

export default Image;
