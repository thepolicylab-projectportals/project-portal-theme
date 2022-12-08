import React, { FunctionComponent } from "react"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"
import { useStaticText } from "../hooks"
import { graphql, useStaticQuery } from "gatsby"

// This is the same structure as the "footer" part of the useStaticText query,
// so that we can pass the staticText.footer unchanged into the code
interface FooterProps {
  heading: {
    title: String
    link: string
  }
  copyright: String
  links: {
    title: String
    link: String
  }[]
  image?: {
    imageData: IGatsbyImageData
    altText: string
  }
}

export const FooterLayout: FunctionComponent<FooterProps> = ({
  heading,
  copyright,
  links,
  image,
}) => {
  return (
    <footer className="w-full px-2 py-8 bg-footer xl:container xl:px-12">
      <div className="flex items-center justify-center mt-6 lg:my-auto">
        <div className="text-nav text-footertext">{copyright}</div>
      </div>
      <div className="flex items-center justify-center mt-6 lg:my-auto">
        <ul className="text-nav text-footertext list-none">
          {links.map(({ title, link }, i) => (
            <ListItem key={"link_" + i} target={link}>
              {title}
            </ListItem>
          ))}
        </ul>
      </div>
      <div className="block w-full lg:w-auto mt-5">
        <a
          className="flex items-center gap-4 justify-center flex-wrap"
          href={heading.link}
        >
          {image && (
            <GatsbyImage
              className="xl:inline-block logotype"
              image={image.imageData}
              alt={image.altText}
            />
          )}
          <p className="text-center inline-block text-h4 font-bold text-footertext">
            {heading.title}
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

export const Footer = () => {
  const { logo } = useStaticQuery(graphql`
    query FooterLogoQuery {
      logo: file(
        name: { eq: "footer" }
        extension: { in: ["png", "jpg", "jpeg"] }
        sourceInstanceName: { eq: "themeImages" }
      ) {
        childImageSharp {
          gatsbyImageData(height: 64)
        }
      }
    }
  `)
  const staticText = useStaticText()

  return (
    <FooterLayout
      heading={staticText.footer.heading}
      copyright={staticText.footer.copyright}
      links={staticText.footer.links}
      image={{ imageData: getImage(logo), altText: staticText.title + " logo" }}
    />
  )
}
