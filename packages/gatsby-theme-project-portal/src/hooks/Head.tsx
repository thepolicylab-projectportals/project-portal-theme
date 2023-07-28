import * as React from "react"
import { graphql } from "gatsby"

export const Head = ({ location, params, data, pageContext }) => (
  <>
    <title>{pageContext.title}</title>
    <meta name="description" content={data.page.description} />
    <meta
      name="twitter:url"
      content={`${data.site.siteMetadata.siteUrl}${location.pathname}`}
    />
    <html lang={data.site.siteMetadata.locale} />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="description" content={data.page.description} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content={data.site.siteMetadata.locale} />
    <meta property="og:site_name" content={data.site.siteMetadata.title} />
    <meta
      property="og:description"
      content={data.site.siteMetadata.description}
    />
    <meta name="twitter:card" content="summary" />
    <meta
      property="twitter:description"
      content={data.site.siteMetadata.description}
    />
  </>
)

export const query = graphql`
  fragment HeadData on Site {
    siteMetadata {
      title
      description
      siteUrl
      locale
    }
  }
`
