const _ = require(`lodash`);
const path = require(`path`);
const { paginate } = require('gatsby-awesome-pagination');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const works = await graphql(
    `
      {
        allContentfulWork(
          sort: { fields: [updatedAt], order: DESC }
          filter: { node_locale: { eq: "ja" } }
        ) {
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

  const tags = await graphql(
    `
      {
        allContentfulTag {
          edges {
            node {
              title
            }
          }
        }
      }
    `
  );

  if (works.errors) {
    throw works.errors;
  }

  if (tags.errors) {
    throw tags.errors;
  }

  const worksEdges = works.data.allContentfulWork.edges;
  const tagsEdges = tags.data.allContentfulTag.edges;

  const workTemplate = path.resolve(`./src/templates/work.tsx`);
  _.each(worksEdges, edge => {
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
    items: worksEdges,
    itemsPerPage: 12,
    pathPrefix: '/works',
    component: path.resolve('./src/templates/works.tsx'),
  });

  _.each(tagsEdges, edge => {
    const title = edge.node.title;
    const works = worksEdges.filter(edge => {
      if (edge.node.tags) {
        return edge.node.tags.find(tag => tag.title === title);
      }
      return false;
    });

    paginate({
      createPage,
      items: works,
      itemsPerPage: 12,
      pathPrefix: `/works/t/${title}`,
      component: path.resolve('./src/templates/tags.tsx'),
      context: {
        tag: title,
      },
    });
  });
};
