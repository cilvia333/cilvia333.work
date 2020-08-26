import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

interface Props {
  description?: string;
  lang?: string;
  meta?: { name: string; content: string }[];
  title?: string;
}

const SEO: React.FC<Props> = ({
  description = '',
  lang = 'jp',
  meta = [],
  title,
}: Props) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            image
            siteUrl
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const ogpTitle =
    title === 'TOP'
      ? site.siteMetadata.title
      : `${title} | ${site.siteMetadata.title}`;

  return (
    <Helmet
      htmlAttributes={{
        lang,
        prefix: `og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# website: http://ogp.me/ns/website#`,
      }}
      title={ogpTitle}
      link={[
        { rel: 'stylesheet', href: 'https://use.typekit.net/kuy5zin.css' },
      ]}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: ogpTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:url`,
          content: `${site.siteMetadata.siteUrl}${pathname}`,
        },
        {
          property: `og:image`,
          content: `${site.siteMetadata.siteUrl}${site.siteMetadata.image}`,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:locale`,
          content: `ja_JP`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:title`,
          content: ogpTitle,
        },
        {
          property: `og:url`,
          content: `${site.siteMetadata.siteUrl}${pathname}`,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: `twitter:image`,
          content: `${site.siteMetadata.siteUrl}${site.siteMetadata.image}`,
        },
        {
          name: `twitter:site`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
      ].concat(meta)}
    />
  );
};

export default SEO;
