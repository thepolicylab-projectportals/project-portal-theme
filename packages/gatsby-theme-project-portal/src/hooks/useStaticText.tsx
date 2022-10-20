import { graphql, useStaticQuery } from "gatsby"

export const useStaticText = () => {
  const {
    projectPortalConfig: { staticText },
  } = useStaticQuery(graphql`
    query StaticTextQuery {
      projectPortalConfig {
        staticText {
          about {
            aims {
              text
            }
            faq {
              text
              title
            }
            header
          }
          bottom_banner {
            text
          }
          main_contact_text {
            ongoingText
            completeText
          }
          open {
            lede
            pageName
            title
          }
          ongoing {
            lede
            pageName
            title
          }
          footer {
            heading {
              link
              title
            }
            links {
              link
              title
            }
          }
          contact {
            lede
            title
          }
          completed {
            lede
            pageName
            title
          }
        }
      }
    }
  `)
  return staticText
}
