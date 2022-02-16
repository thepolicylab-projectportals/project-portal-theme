import { string } from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

interface BottomBannerProps {
  // title: string
  text: string
  link: string
  // buttonText: string
}

export const BottomBanner: React.FC<BottomBannerProps> = ({
  // title,
  text,
  link,
}: // buttonText,
BottomBannerProps) => {
  const { logo } = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { regex: "/^rd_logo.png$" }) {
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
        <div className="w-full">
          <GatsbyImage
            className="inline-block float-left my-5"
            image={image}
            alt="R+D logo"
          />
          <div className="inline-block w-4/5 my-5 text-body float-right">
            {text}
            <a
              className="font-semibold text-black underline hover:text-primary"
              href={link}
            >
              let us know
            </a>
            !
          </div>
        </div>
      </div>
    </div>
  )
}
