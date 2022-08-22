import { string } from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { MarkdownText } from "../components"
import language from "site/language.json"
import { isNA } from "../utils"

export const BottomBanner = () => {
  const { logo } = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { regex: "/^rd_logo.png$/" }) {
        childImageSharp {
          gatsbyImageData(width: 160)
        }
      }
    }
  `)

  const image = getImage(logo)

  return (
    <div className="py-6 mt-12 overflow-hidden bg-rd p-responsive">
      <div className="m-responsive">
        <div className="w-full flex gap-4 sm:gap-8 items-center justify-center flex-wrap">
          {!isNA(language.bottom_banner.link) && image && (
            <Link id="R+D link" to={language.bottom_banner.link}>
              <GatsbyImage
                className="inline-block"
                image={image}
                alt="R+D logo"
              />
            </Link>
          )}
          {isNA(language.bottom_banner.link) && image && (
            <GatsbyImage
              className="inline-block"
              image={image}
              alt="R+D logo"
            />
          )}
          <div className="inline-block text-body flex-4 min-w-20ch">
            <MarkdownText text={language.bottom_banner.text} />
          </div>
        </div>
      </div>
    </div>
  )
}
