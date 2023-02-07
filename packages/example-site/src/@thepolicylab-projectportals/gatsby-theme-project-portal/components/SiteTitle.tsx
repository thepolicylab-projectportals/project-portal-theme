import React, { FunctionComponent } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { SiteTitleProps } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

export const SiteTitle: FunctionComponent<SiteTitleProps> = ({ image }) => {
  return (
    <>
      {image && (
        <GatsbyImage
          className="xl:inline-block logotype"
          image={image}
          alt={"nav_logo"}
        />
      )}
    </>
  )
}
