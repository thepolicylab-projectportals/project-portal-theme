import { graphql, useStaticQuery } from "gatsby"

export default function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteTitle
          short_name
          siteUrl
          projectInterestLink
          live
          locale
        }
      }
    }
  `)

  return data.site.siteMetadata
}
