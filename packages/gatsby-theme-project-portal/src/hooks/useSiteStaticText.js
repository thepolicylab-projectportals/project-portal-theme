import { graphql, useStaticQuery } from "gatsby"

export const useSiteStaticText = () => {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          staticText {
            about {
              header
              aims {
                text
              }
              faq {
                title
                text
              }
            }
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
            footer {
              heading {
                title
                link
              }
              links {
                title
                link
              }
            }
          }
        }
      }
    }
  `)

  return site.siteMetadata.staticText
}
