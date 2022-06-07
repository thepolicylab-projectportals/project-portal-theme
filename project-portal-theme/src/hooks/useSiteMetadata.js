import { graphql, useStaticQuery } from "gatsby"

export default function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          live
          locale
          projectInterestLink
        }
      }
    }
  `)

  return data.site.siteMetadata
}
