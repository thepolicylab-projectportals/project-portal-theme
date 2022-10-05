import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

export const SiteMetadata = ({ description, image, title }) => {
  const { siteTitle, locale } = useSiteMetadata()

  return (
    <Helmet
      defer={false}
      defaultTitle={title}
      title={title}
      titleTemplate={`${siteTitle}`}
    >
      <html lang={locale} />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content={image} />
      <meta property="twitter:description" content={description} />
    </Helmet>
  )
}

SiteMetadata.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
}

SiteMetadata.defaultProps = {
  image: "/icons/icon-256x256.png",
}
