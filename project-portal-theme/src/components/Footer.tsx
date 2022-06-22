import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import useSiteMetadata from "../hooks/useSiteMetadata"
import { useSiteStaticText } from "../hooks/useSiteStaticText"

export const Footer = () => {
  const { logo } = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { regex: "/^footer.png$/" }) {
        childImageSharp {
          gatsbyImageData(height: 64)
        }
      }
    }
  `)

  const image = getImage(logo)

  const meta = useSiteMetadata()

  const staticText = useSiteStaticText()

  // use of GatsbyImage for the logo causs pa11y error as it doesn't register as an image
  return (
    <footer className="w-full px-2 py-8 bg-footer xl:container xl:px-12">
      <div className="flex items-center justify-center mt-6 lg:my-auto">
        <ul className="text-nav text-footertext list-none">
          {staticText.footer.links.map(({ title, link }, i) => (
            <ListItem key={"link_" + i} target={link}>
              {title}
            </ListItem>
          ))}
        </ul>
      </div>
      <div className="block w-full lg:w-auto mt-5">
        <a
          className="flex items-center gap-4 justify-center flex-wrap"
          href={staticText.footer.heading.link}
        >
          {image && (
            <img
              srcSet={image.images.sources[0].srcSet}
              alt={meta.title + " logo"}
              height={image.height}
              width={image.width}
            />
          )}
          <p className="text-center inline-block text-h4 font-bold text-footertext">
            {staticText.footer.heading.title}
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
