const _ = require(`lodash`);
const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const works = await graphql(
    `
      {
        allContentfulWork(limit: 1000) {
          edges {
            node {
              id
              concept
              date
              slug
              title
              tags {
                title
              }
              thumbnail {
                title
                fluid(maxWidth: 1440) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
      }
    `
  );

  if (works.errors) {
    throw works.errors;
  }

  const workTemplate = path.resolve(`./src/components/templates/work.tsx`);
  _.each(works.data.allContentfulWork.edges, edge => {
    createPage({
      path: `/works/${edge.node.slug}`,
      component: workTemplate,
      context: {
        work: edge.node,
      },
    });
  });
};
