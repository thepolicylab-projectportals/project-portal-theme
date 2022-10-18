import { graphql, useStaticQuery } from "gatsby"

export const useProjectPortalConfig = () => {
  const data = useStaticQuery(graphql`
    {
      projectPortalConfig {
        siteTitle
        showDevBanner
        projectInterestLink
      }
    }
  `)

  return data.projectPortalConfig
}
