import { graphql, useStaticQuery } from "gatsby"

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteTitle
          short_name
          siteUrl
          live
          locale
        }
      }
    }
  `)

  return data.site.siteMetadata
}
