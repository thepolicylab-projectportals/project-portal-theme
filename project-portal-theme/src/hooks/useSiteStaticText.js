import { graphql, useStaticQuery } from "gatsby"

export const useSiteStaticText = () => {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          staticText {
            open {
              title
              lede
            }
          }
        }
      }
    }
  `)

  return site.siteMetadata.staticText
}
