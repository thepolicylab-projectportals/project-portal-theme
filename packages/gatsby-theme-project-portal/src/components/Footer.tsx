import React, { FunctionComponent } from "react"
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image"

// This is the same structure as the "footer" part of the useStaticText query,
// so that we can pass the staticText.footer unchanged into the code
export interface FooterProps {
  headingTitle: String
  headingLink: string
  copyright: String
  links: {
    title: String
    link: String
  }[]
  image?: ImageDataLike
  altText?: string
}

export const Footer: FunctionComponent<FooterProps> = ({
  headingTitle,
  headingLink,
  copyright,
  links,
  image,
  altText,
}) => {
  const resolvedImage = getImage(image)
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
          href={headingLink}
        >
          {image && (
            <GatsbyImage
              className="xl:inline-block logotype"
              image={resolvedImage}
              alt={altText}
            />
          )}
          <p className="text-center inline-block text-h4 font-bold text-footertext">
            {headingTitle}
          </p>
        </a>
      </div>
    </footer>
  )
}

const ListItem = ({ target, children }) => {
  return (
    <li className="block px-2 py-2 lg:inline-block lg:mx-3 underline hover:no-underline text-center">
      <a href={target}>{children}</a>
    </li>
  )
}
