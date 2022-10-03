import React from "react"
import { MarkdownText } from "../components"
// import { graphql, useStaticQuery } from "gatsby"

export const BottomBanner = ({ image, text }) => {
  return (
    <div className="py-6 mt-12 overflow-hidden bg-rd p-responsive">
      <div className="m-responsive">
        <div className="w-full flex gap-4 sm:gap-8 items-center justify-center flex-wrap">
          {image && image}
          <div className="inline-block text-body flex-4 min-w-20ch">
            <MarkdownText text={text} />
          </div>
        </div>
      </div>
    </div>
  )
}

// export const Banner = () => {
//   const query = useStaticQuery(graphql`
//     query {
//       bannerLogo: file(relativePath: { regex: "/^rd_logo.png$/" }) {
//         childImageSharp {
//           gatsbyImageData(width: 160)
//         }
//       }
//     }
//   `)
//   const bannerLogoImage = getImage(query.bannerLogo)
//   const banner_image = (
//       <GatsbyImage
//           className="hidden xl:inline-block"
//           image={bannerLogoImage}
//           alt={"nav_logo"}
//       />
//   )
//   return <BottomBanner image={banner_image} text="Sample text" />
// }
