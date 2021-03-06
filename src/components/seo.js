import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import config from "../../data/siteConfig"

function SEO({ description, lang, meta, title, thumbnail }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  let metaImage = `${site.siteMetadata.siteUrl}${config.logo}`

  if (thumbnail) {
    metaImage = `${site.siteMetadata.siteUrl}${thumbnail.childImageSharp.fixed.src}`
  }

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      // title={title}
      // titleTemplate={`%s | ${site.siteMetadata.title}`}
    >
      <meta name="description" content={metaDescription} />
      <meta name="image" content={metaImage} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  // title: PropTypes.string.isRequired,
}

export default SEO
