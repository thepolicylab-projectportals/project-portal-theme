import { graphql, useStaticQuery } from "gatsby"

export default function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          projectInterestLink
          live
        }
      }
    }
  `)

  return data.site.siteMetadata
}
