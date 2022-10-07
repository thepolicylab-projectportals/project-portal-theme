import { graphql, useStaticQuery } from "gatsby"

export const useThemeOptions = () => {
  const data = useStaticQuery(graphql`
    {
      themeOptions {
        siteTitle
      }
    }
  `)

  return data.themeOptions
}
