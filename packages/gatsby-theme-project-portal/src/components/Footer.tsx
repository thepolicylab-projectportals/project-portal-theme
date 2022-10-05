import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
//import { graphql, useStaticQuery } from "gatsby"
// import { getImage } from "gatsby-plugin-image"
//
import { useSiteMetadata } from "../hooks/useSiteMetadata"
// import language from "site/language.json"

export const Footer = ({ image, useSiteMetadata, language }) => {
  return (
    <footer className="w-full px-2 py-8 bg-footer xl:container xl:px-12">
      <div className="flex items-center justify-center mt-6 lg:my-auto">
        <div className="text-nav text-footertext">
          {language.footer.copyright}
        </div>
      </div>
      <div
        className="flex it
      ems-center justify-center mt-6 lg:my-auto"
      >
        <ul className="text-nav text-footertext list-none">
          {language.footer.links.map(({ title, link }, i) => (
            <ListItem key={"link_" + i} target={link}>
              {title}
            </ListItem>
          ))}
        </ul>
      </div>
      <div className="block w-full lg:w-auto mt-5">
        <a
          className="flex items-center gap-4 justify-center flex-wrap"
          href={language.footer.heading.link}
        >
          {image && <GatsbyImage image={image} alt={meta.title + " logo"} />}
          <p className="text-center inline-block text-h4 font-bold text-footertext">
            {language.footer.heading.title}
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

// const FooterImage = () => {
//     const query = useStaticQuery(graphql`
//     query {
//      Footer: file(relativePath: { regex: "/^footer.png$/" }) {
//         childImageSharp {
//           gatsbyImageData(height: 64)
//         }
//       }
//     }
//  `)
//  const FooterImage = getImage(query.Footer)
//  return FooterImage
// }
