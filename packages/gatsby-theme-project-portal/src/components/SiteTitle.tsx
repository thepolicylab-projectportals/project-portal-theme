import React, { FunctionComponent } from "react"
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image"

export interface SiteTitleProps {
  image?: ImageDataLike
  title?: string
}

export const SiteTitle: FunctionComponent<SiteTitleProps> = ({
  image,
  title,
}) => {
  const resolvedImage = getImage(image)
  return (
    <>
      {resolvedImage && (
        <GatsbyImage
          className="xl:inline-block logotype"
          image={resolvedImage}
          alt={"nav_logo"}
        />
      )}
      {title}
    </>
  )
}
