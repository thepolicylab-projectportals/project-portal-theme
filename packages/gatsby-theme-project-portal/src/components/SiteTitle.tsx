import React, { FunctionComponent } from "react"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"

export interface SiteTitleProps {
  image: IGatsbyImageData
  title: string
}

export const SiteTitle: FunctionComponent<SiteTitleProps> = ({
  image,
  title,
}) => {
  return (
    <>
      {image && (
        <GatsbyImage
          className="xl:inline-block logotype"
          image={image}
          alt={"nav_logo"}
        />
      )}
      {title}
    </>
  )
}
