import { graphql, useStaticQuery } from "gatsby"

export const useStaticText = () => {
  const {
    projectPortalConfig: { staticText },
  } = useStaticQuery(graphql`
    query StaticTextQuery {
      projectPortalConfig {
        staticText {
          about {
            header
            aims {
              title
              text
            }
            faq {
              title
              text
            }
            accessibility
          }
          bottom_banner {
            text
            link
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
            copyright
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
