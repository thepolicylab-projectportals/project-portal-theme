import { Link } from "gatsby"
import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { MarkdownText } from "../components"
import { isNA } from "../utils"

export const BottomBannerLayout = ({
  image,
  text,
  link,
  bottomBannerImageLink,
}) => {
  return (
    <div className="py-6 mt-12 overflow-hidden bg-rd p-responsive">
      <div className="m-responsive">
        <div className="w-full flex gap-4 sm:gap-8 items-center justify-center flex-wrap">
          {!isNA(link) && image && (
            <Link id={bottomBannerImageLink} to={link}>
              <GatsbyImage
                className="inline-block"
                image={image}
                alt="Bottom Banner logo"
              />
            </Link>
          )}
          {isNA(link) && image && (
            <GatsbyImage
              className="inline-block"
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

// export const BottomBanner = () => {
//   const { BottomBanner } = useStaticQuery(graphql`
//     query {
//       BottomBanner: file(relativePath: { regex: "/^bottom_banner.png$/" }) {
//         childImageSharp {
//           gatsbyImageData(width: 160)
//         }
//       }
//     }
//   `)
//   const bannerLogoImage = getImage(BottomBanner)
//   return <BottomBanner image={bannerImage} text="Sample text" />
// }
