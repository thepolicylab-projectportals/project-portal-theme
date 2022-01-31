import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import meta from "site/meta.json"
import { footer } from "site/language.json"

export const Footer = () => {
  const { logo } = useStaticQuery(graphql`
    query {
      logo: file(relativePath: { regex: "/logo.png/" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `)

  const image = getImage(logo)

  return (
    <footer className="flex flex-wrap justify-between w-full px-2 py-8 bg-primary-500 xl:container xl:px-12">
      <div className="block w-full lg:w-auto">
        <a className="flex items-center" href={footer.heading.link}>
          <GatsbyImage
            className="inline-block"
            image={image}
            alt={meta.title + " logo"}
          />
          <p className="text-center inline-block text-h4 font-bold text-white">
            {footer.heading.title}
          </p>
        </a>
      </div>
      <div className="mt-6 lg:my-auto">
        <ul className="text-nav font-bold text-white list-none">
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
