import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

export const Footer = ({ image, useSiteStaticText }) => {
  const meta = useSiteMetadata()

  return (
    <footer className="w-full px-2 py-8 bg-footer xl:container xl:px-12">
      <div className="flex items-center justify-center mt-6 lg:my-auto">
        <div className="text-nav text-footertext">
          {useSiteStaticText.footer.copyright}
        </div>
      </div>
      <div
        className="flex it
      ems-center justify-center mt-6 lg:my-auto"
      >
        <ul className="text-nav text-footertext list-none">
          {useSiteStaticText.footer.links.map(({ title, link }, i) => (
            <ListItem key={"link_" + i} target={link}>
              {title}
            </ListItem>
          ))}
        </ul>
      </div>
      <div className="block w-full lg:w-auto mt-5">
        <a
          className="flex items-center gap-4 justify-center flex-wrap"
          href={useSiteStaticText.footer.heading.link}
        >
          {image && <GatsbyImage image={image} alt={meta.title + " logo"} />}
          <p className="text-center inline-block text-h4 font-bold text-footertext">
            {useSiteStaticText.footer.heading.title}
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

// const FooterImage = (Footer) => {
//     const query = useStaticQuery(graphql`
//     query {
//      Footer: file(relativePath: { regex: "/^footer.png$/" }) {
//         childImageSharp {
//           gatsbyImageData(height: 64)
//         }
//       }
//     }
//  `)
//  const FooterImage = getImage(Footer)
//  return FooterImage
// }
