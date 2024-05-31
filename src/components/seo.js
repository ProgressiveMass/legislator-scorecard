/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({ description, lang, meta, keywords, title, ogImage }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )
  const metaDescription = description || site.siteMetadata.description
  const defaultImagePath = 'https://www.progressivemass.com/wp-content/uploads/2024/05/scorecard.png'
  let ogImagePath
  if (ogImage.path) {
    ogImagePath = process.env.GATSBY_DOMAIN + ogImage.path
  } else {
    ogImagePath = defaultImagePath
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      defaultTitle={site.siteMetadata.title}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `twitter:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: `@ProgressiveMass`,
        },
        {
          name: `twitter:site`,
          content: `@ProgressiveMass`,
        },
        {
          property: `og:image`,
          content: ogImagePath,
        },
        {
          property: `twitter:image`,
          content: ogImagePath,
        },
        {
          property: `og:image:width`,
          content: `630`,
        },
        {
          property: `og:image:height`,
          content: `315`,
        },
        {
          name: 'google-site-verification',
          content: 'MINIMCknvSau7g0tvpo0QOEKpB3noYRIZVfyBEC8EIo',
        },
      ]
        .concat(
          keywords.length > 0
            ? {
                name: `keywords`,
                content: keywords.join(`, `),
              }
            : []
        )
        .concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
  ogImage: {},
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  ogImage: PropTypes.object,
}

export default SEO
