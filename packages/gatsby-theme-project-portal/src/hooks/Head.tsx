import * as React from "react"
import { graphql } from "gatsby"

export function Head({ location, params, data, pageContext }) {
  const socialShareImage = `${data.site.siteMetadata.siteUrl}${data.socialShareImage?.childImageSharp.gatsbyImageData.images.fallback.src}`

  return (
    <>
      <meta property="og:type" content="website" />

      <html lang={data.site.siteMetadata.locale} />
      <meta property="og:locale" content={data.site.siteMetadata.locale} />

      <meta property="og:site_name" content={data.site.siteMetadata.title} />

      <title>{data.page?.title}</title>
      <meta name="og:title" content={data.page?.title} />
      <meta name="twitter:title" content={data.page?.title} />

      <meta name="description" content={data.page?.description} />
      <meta property="og:description" content={data.page?.description} />
      <meta name="twitter:description" content={data.page?.description} />

      <meta
        name="og:url"
        content={`${data.site.siteMetadata.siteUrl}${location.pathname}`}
      />

      <meta property="og:image" content={socialShareImage} />
      <meta name="twitter:image" content={socialShareImage} />

      <meta name="twitter:card" content="summary" />
    </>
  )
}

export const query = graphql`
  fragment HeadData on Query {
    site {
      siteMetadata {
        title
        description
        siteUrl
        locale
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
`
