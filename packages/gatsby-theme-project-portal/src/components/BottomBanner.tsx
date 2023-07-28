import { Link } from "gatsby"
import React, { FunctionComponent } from "react"
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image"
import { MarkdownText } from "../components"
import { isNA } from "../utils"

export interface BottomBannerProps {
  text: string
  image?: IGatsbyImageData
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
  return (
    <div className="py-6 mt-12 overflow-hidden bg-bottombanner p-responsive">
      <div className="m-responsive">
        <div className="w-full flex gap-4 sm:gap-8 items-center justify-center flex-wrap">
          {!isNA(link) && image && (
            <Link id={linkId} to={link}>
              <GatsbyImage
                className="inline-block logotype"
                image={image}
                alt="Bottom Banner logo"
              />
            </Link>
          )}
          {isNA(link) && { image } && (
            <GatsbyImage
              className="inline-block logotype"
              image={image}
              alt="R+D logo"
            />
          )}
          <div className="inline-block text-body flex-4 min-w-20ch">
            <MarkdownText text={text} />
          </div>
        </div>
      </div>
    </div>
  )
}
