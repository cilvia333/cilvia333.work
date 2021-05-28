const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

module.exports = {
  siteMetadata: {
    title: `Cilvia333.work`,
    description: `Cilvia333 is Graphic designer / Web front-end engineer based on Tokyo.`,
    author: `@cilvia333`,
    image: `/ogp.png`,
    siteUrl: `https://www.cilvia333.work`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.tsx`),
      },
    },
    {
      resolve: `gatsby-alias-imports`,
      options: {
        aliases: {
          '~': `src`,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.inline\.svg$/,
        },
      },
    },
    `gatsby-background-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Cilvia333.work`,
        short_name: `cilvia333`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `./src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.cilvia333.work`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-127442648-1',
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        exclude: ['/preview/**', '/do-not-track/me/too/'],
        pageTransitionDelay: 0,
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: 'cilvia333.work',
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_ID,
        host: process.env.CONTENTFUL_HOST,
        forceFullSync: true,
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Noto Sans JP'],
        },
      },
    },
    `gatsby-plugin-smoothscroll`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-typescript`,
    {
      resolve: 'gatsby-plugin-graphql-codegen',
      options: {
        codegen: process.env.NODE_ENV === 'production',
        fileName: `src/types/graphql-types.d.ts`,
      },
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$|\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public|_this_is_virtual_fs_path_)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
