import React, { FunctionComponent } from "react"
import { Helmet } from "react-helmet"
import { graphql, useStaticQuery } from "gatsby"

interface SiteMetadataProps {
  description?: string
  title?: string
  pathname?: string
}

export const SiteMetadata: FunctionComponent<SiteMetadataProps> = ({
  description,
  title,
  pathname,
}) => {
  const {
    site: {
      siteMetadata: {
        locale,
        title: defaultTitle,
        description: defaultDescription,
        siteUrl: url,
      },
    },
    socialShareImage,
  } = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          locale
          title
          description
          siteUrl
        }
      }
      socialShareImage: file(
        name: { eq: "social-share-image" }
        extension: { in: ["png", "jpg", "jpeg"] }
        sourceInstanceName: { eq: "themeImages" }
      ) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `)

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${url}${pathname || ``}`,
    image: socialShareImage
      ? `${url}${socialShareImage?.childImageSharp.gatsbyImageData.images.fallback.src}`
      : "",
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
      <meta property="og:description" content={seo.description} />
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  )
}
