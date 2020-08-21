import { graphql, useStaticQuery } from 'gatsby';
import { ContentfulFluid } from '~/types/graphql-types';

export default assetUrl => {
  const { allContentfulAsset } = useStaticQuery(
    graphql`
      query CONTENTFUL_IMAGE_QUERY {
        allContentfulAsset {
          edges {
            node {
              file {
                url
              }
              fluid(maxWidth: 1050, quality: 85) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
        }
      }
    `
  );

  const image = allContentfulAsset.edges.find(edge => {
    return edge.node.file.url.includes(assetUrl);
  });

  return image ? (image.node?.fluid as ContentfulFluid) : null;
};
