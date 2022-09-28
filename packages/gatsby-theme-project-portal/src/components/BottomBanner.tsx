import { string } from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MarkdownText } from "../components"
import { useSiteStaticText } from "../hooks/useSiteStaticText"

export const BottomBanner = () => {
  const { logo } = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { regex: "/rd_logo.png/" }) {
        childImageSharp {
          gatsbyImageData(width: 160)
        }
      }
    }
  `)

  const image = getImage(logo)

  const staticText = useSiteStaticText()

  return (
    <div className="py-6 mt-12 overflow-hidden bg-rd p-responsive">
      <div className="m-responsive">
        <div className="w-full flex gap-4 sm:gap-8 items-center justify-center flex-wrap">
          {image && (
            <GatsbyImage
              className="inline-block"
              image={image}
              alt="R+D logo"
            />
          )}
          <div className="inline-block text-body flex-4 min-w-20ch">
            <MarkdownText text={staticText.bottom_banner.text} />
          </div>
        </div>
      </div>
    </div>
  )
}
