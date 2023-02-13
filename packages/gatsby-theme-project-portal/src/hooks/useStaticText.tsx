import { graphql, useStaticQuery } from "gatsby"

export const useStaticText = () => {
  const {
    projectPortalConfig: { staticText },
  } = useStaticQuery(graphql`
    query StaticTextQuery {
      projectPortalConfig {
        staticText {
          bottom_banner {
            text
            link
          }
          main_contact_text {
            ongoingText
            completeText
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
        }
      }
    }
  `)
  return staticText
}
