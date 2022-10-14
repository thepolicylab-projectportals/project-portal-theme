import React from "react"
import { useSiteMetadata } from "../hooks/useSiteMetadata"
import { useStaticText } from "../hooks"

export const FooterLayout = ({ image, FooterProps }) => {
  const {
    meta: { siteTitle: footerSiteTitle },
  } = useSiteMetadata()
  // use of GatsbyImage for the logo causs pa11y error as it doesn't register as an image

  return (
    <footer className="w-full px-2 py-8 bg-footer xl:container xl:px-12">
      <div className="flex items-center justify-center mt-6 lg:my-auto">
        <div className="text-nav text-footertext">
          {FooterProps.footer.copyright}
        </div>
      </div>
      <div
        className="flex it
      ems-center justify-center mt-6 lg:my-auto"
      >
        <ul className="text-nav text-footertext list-none">
          {FooterProps.footer.links.map(({ title, link }, i) => (
            <ListItem key={"link_" + i} target={link}>
              {title}
            </ListItem>
          ))}
        </ul>
      </div>
      <div className="block w-full lg:w-auto mt-5">
        <a
          className="flex items-center gap-4 justify-center flex-wrap"
          href={FooterProps.footer.heading.link}
        >
          {image && (
            <img
              srcSet={image.images.sources[0].srcSet}
              alt={footerSiteTitle + " logo"}
              height={image.height}
              width={image.width}
            />
          )}
          <p className="text-center inline-block text-h4 font-bold text-footertext">
            {FooterProps.footer.heading.title}
          </p>
        </a>
      </div>
    </footer>
  )
}

const ListItem = ({ target, children }) => {
  return (
    <li className="block px-2 py-2 lg:inline-block lg:ml-6 underline hover:no-underline text-center">
      <a href={target}>{children}</a>
    </li>
  )
}

// export const Footer = () => {
// const {Footer} = useStaticQuery(graphql`
//     query {
//      Footer: file(relativePath: { regex: "/^footer.png$/" }) {
//         childImageSharp {
//           gatsbyImageData(height: 64)
//         }
//       }
//     }
//  `)
//  const FooterImage = getImage(Footer)
//
//   return <FooterLayout FooterProps={useSiteStaticText} image={FooterImage} />
// }
