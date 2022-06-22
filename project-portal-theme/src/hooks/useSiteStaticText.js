import { graphql, useStaticQuery } from "gatsby"

export const useSiteStaticText = () => {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          staticText {
            contact {
              title
              lede
            }
            open {
              title
              lede
            }
            ongoing {
              title
              lede
            }
            completed {
              title
              lede
            }
            bottom_banner {
              text
            }
          }
        }
      }
    }
  `)

  return site.siteMetadata.staticText
}
