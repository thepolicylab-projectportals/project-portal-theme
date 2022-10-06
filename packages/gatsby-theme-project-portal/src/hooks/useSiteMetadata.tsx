import { graphql, useStaticQuery } from "gatsby"
import { FunctionComponent } from "react"

interface SiteMetadataProps {
  siteTitle?: string
  short_name?: string
  siteUrl?: string
  live?: string
  locale?: string
}

export const useSiteMetadata: FunctionComponent<SiteMetadataProps> = ({
  siteTitle,
  short_name,
  siteUrl,
  live,
  locale,
}: SiteMetadataProps) => {
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
