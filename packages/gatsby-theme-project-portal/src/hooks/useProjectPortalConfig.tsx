import { graphql, useStaticQuery } from "gatsby"

export const useProjectPortalConfig = () => {
  const data = useStaticQuery(graphql`
    {
      projectPortalConfig {
        showDevBanner
        projectInterestLink
        pages {
          name
          link
          show
        }
      }
    }
  `)
  return data.projectPortalConfig
}
