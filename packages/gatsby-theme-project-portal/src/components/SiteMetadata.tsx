import React, { FunctionComponent } from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"
import { IGatsbyImageData } from "gatsby-plugin-image"

interface SiteMetadataProps {
  description?: string
  image?: IGatsbyImageData
  title?: string
  pathname?: string
}

export const SiteMetadata: FunctionComponent<SiteMetadataProps> = ({
  description,
  image,
  title,
  pathname,
}) => {
  const {
    site: {
      siteMetadata: {
        locale,
        title: defaultTitle,
        description: defaultDescription,
        image: defaultImage,
        siteUrl: url,
      },
    },
  } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          locale
          title
          description
          siteUrl
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
