const _ = require(`lodash`);
const path = require(`path`);
const { paginate } = require('gatsby-awesome-pagination');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const works = await graphql(
    `
      {
        allContentfulWork(sort: { fields: [updatedAt], order: DESC }) {
          edges {
            node {
              id
              concept
              date
              slug
              title
              description {
                json
              }
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

  const workTemplate = path.resolve(`./src/templates/work.tsx`);
  _.each(works.data.allContentfulWork.edges, edge => {
    createPage({
      path: `/works/${edge.node.slug}`,
      component: workTemplate,
      context: {
        work: edge.node,
      },
    });
  });

  paginate({
    createPage,
    items: works.data.allContentfulWork.edges,
    itemsPerPage: 12,
    pathPrefix: '/works',
    component: path.resolve('./src/templates/works.tsx'),
  });
};
