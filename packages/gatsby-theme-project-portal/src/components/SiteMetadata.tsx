import React from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"

export const SiteMetadata = ({ description, image, title, pathname }) => {
  const {
    site: {
      siteMetadata: {
        locale,
        title: defaultTitle,
        description: defaultDescription,
        image: defaultImage,
        url,
      },
    },
  } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          locale
          title
          description
          url
          image
        }
      }
    }
  `)

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${url}${image || defaultImage}`,
    url: `${url}${pathname || ``}`,
    locale: locale,
  }
  console.log(seo)

  return (
    <Helmet
      defer={false}
      defaultTitle={defaultTitle}
      title={seo.title}
      titleTemplate={`${seo.title}`}
    >
      <html lang={seo.locale} />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={seo.locale} />
      <meta property="og:site_name" content={seo.title} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:description" content={seo.description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={seo.image} />
      <meta property="twitter:description" content={seo.description} />
    </Helmet>
  )
}

SiteMetadata.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
}
