import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
          locale
          image
        }
      }
    }
  `)

  return site.siteMetadata
}
