import React, { FunctionComponent } from "react"
import { IGatsbyImageData } from "gatsby-plugin-image"
import { useStaticText } from "../hooks"

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
      <div
        className="flex it
      ems-center justify-center mt-6 lg:my-auto"
      >
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
            // use of <img /> for the logo because <GatsbyImage /> leads to pa11y error
            <img
              srcSet={image.imageData.images.sources[0].srcSet}
              alt={image.altText}
              height={image.imageData.height}
              width={image.imageData.width}
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
  // const { imageQuery } = useStaticQuery(graphql`
  //   query {
  //     imageQuery: file(relativePath: { regex: "/^footer.png$/" }) {
  //       childImageSharp {
  //         gatsbyImageData(height: 64)
  //       }
  //     }
  //   }
  // `)
  // const { title: siteTitle } = useSiteMetadata()
  // const image = { imageData: getImage(imageQuery), altText: `${siteTitle} logo` }
  const staticText = useStaticText()

  return (
    <FooterLayout
      heading={staticText.footer.heading}
      copyright={staticText.footer.copyright}
      links={staticText.footer.links}
      // image={{ imageData: getImage(imageQuery), altText: staticText.title + " logo" }}
    />
  )
}
