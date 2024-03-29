import React, { FunctionComponent } from "react"
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image"
import { MarkdownText } from "."
import { isNA } from "../utils"

export interface BottomBannerProps {
  text: string
  image?: ImageDataLike
  link?: string
  linkId?: string
}

export const BottomBanner: FunctionComponent<BottomBannerProps> = ({
  image,
  text,
  link,
  linkId,
}) => {
  linkId = linkId ?? "bottom-banner-image-link-id"
  const resolvedImage = getImage(image)
  return (
    <div className="py-6 mt-12 overflow-hidden bg-bottombanner p-responsive">
      <div className="m-responsive">
        <div className="w-full flex gap-4 sm:gap-8 items-center justify-center flex-wrap">
          {!isNA(link) && resolvedImage && (
            <a id={linkId} href={link} aria-labelledby="bottomBannerText">
              <GatsbyImage
                className="inline-block logotype"
                image={resolvedImage}
                alt="Bottom Banner logo"
              />
            </a>
          )}
          {isNA(link) && resolvedImage && (
            <GatsbyImage
              className="inline-block logotype"
              image={resolvedImage}
              alt="Bottom Banner logo"
            />
          )}
          <div
            className="inline-block text-body flex-4 min-w-20ch"
            id="bottomBannerText"
          >
            <MarkdownText text={text} />
          </div>
        </div>
      </div>
    </div>
  )
}
