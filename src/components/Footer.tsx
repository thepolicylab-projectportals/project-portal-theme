import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { getImage } from "gatsby-plugin-image"

import meta from "site/meta.json"
import { footer } from "site/language.json"

export const Footer = () => {
  const { logo } = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { regex: "/footer.png/" }) {
        childImageSharp {
          gatsbyImageData(width: 175)
        }
      }
    }
  `)

  const image = getImage(logo)

  // use of GatsbyImage for the logo causs pa11y error as it doesn't register as an image
  return (
    <footer className="flex flex-wrap justify-between w-full px-2 py-8 bg-footer xl:container xl:px-12">
      <div className="block w-full lg:w-auto">
        <a className="flex items-center" href={footer.heading.link}>
          <img
            srcSet={image.images.sources[0].srcSet}
            alt={meta.title + " logo"}
            height={image.height}
            width={image.width}
          />
          <p className="text-center inline-block text-h4 font-bold text-footer_text">
            {footer.heading.title}
          </p>
        </a>
      </div>
      <div className="mt-6 lg:my-auto">
        <ul className="text-nav text-footer_text list-none">
          {footer.links.map(({ title, link }, i) => (
            <ListItem key={"link_" + i} target={link}>
              {title}{" "}
            </ListItem>
          ))}
        </ul>
      </div>
    </footer>
  )
}

const ListItem = ({ target, children, key }) => {
  return (
    <>
      <li className="block px-2 py-2 lg:inline-block lg:ml-6">
        <Link to={target}>{children}</Link>
      </li>
    </>
  )
}
