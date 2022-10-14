import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          title
          description
          url
          locale
          ongoingText
          completeText
        }
      }
    }
  `)

  return site.siteMetadata
}
