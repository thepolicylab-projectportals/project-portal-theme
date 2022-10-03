import React from "react"
import { MarkdownText } from "../components"
import { Link } from "gatsby"
import { isNA } from "../utils"
//import { graphql, useStaticQuery } from "gatsby"

export const BottomBannerLayout = ({ image, text, link }) => {
  return (
    <div className="py-6 mt-12 overflow-hidden bg-rd p-responsive">
      <div className="m-responsive">
        <div className="w-full flex gap-4 sm:gap-8 items-center justify-center flex-wrap">
          {!isNA(link) && image && (
            <Link id="R+D link" to={link}>
              image
            </Link>
          )}
          {isNA(link) && image && image}
          <div className="inline-block text-body flex-4 min-w-20ch">
            <MarkdownText text={text} />
          </div>
        </div>
      </div>
    </div>
  )
}

// export const BottomBanner = () => {
//   const query = useStaticQuery(graphql`
//     query {
//       BottomBanner: file(relativePath: { regex: "/^rd_logo.png$/" }) {
//         childImageSharp {
//           gatsbyImageData(width: 160)
//         }
//       }
//     }
//   `)
//   const bannerLogoImage = getImage(query.BottomBanner)
//   const banner_image = (
//       <GatsbyImage
//           className="hidden xl:inline-block"
//           image={bannerLogoImage}
//           alt={"nav_logo"}
//       />
//   )
//   return <BottomBanner image={banner_image} text="Sample text" />
// }
