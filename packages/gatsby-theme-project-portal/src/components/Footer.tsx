import React, { FunctionComponent } from "react"
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image"

export interface FooterProps {
  heading?: {
    title: String
    link: string
  }
  copyright?: String
  links?: {
    title: String
    link: String
  }[]
  image?: {
    imageData: ImageDataLike
    altText: string
  }
}

export const Footer: FunctionComponent<FooterProps> = ({
  heading,
  copyright,
  links,
  image,
}) => {
  const resolvedImage = getImage(image?.imageData)
  return (
    <footer className="w-full px-2 py-8 bg-footer xl:container xl:px-12">
      <div className="flex items-center justify-center mt-6 lg:my-auto">
        <div className="text-nav text-footertext">{copyright}</div>
      </div>
      <div className="flex items-center justify-center mt-6 lg:my-auto">
        <ul className="text-nav text-footertext list-none">
          {links?.map(({ title, link }, i) => (
            <ListItem key={"link_" + i} target={link}>
              {title}
            </ListItem>
          ))}
        </ul>
      </div>
      <div className="block w-full lg:w-auto mt-5">
        <a
          className="flex items-center gap-4 justify-center flex-wrap"
          href={heading?.link}
        >
          {resolvedImage && (
            <GatsbyImage
              className="xl:inline-block logotype"
              image={resolvedImage}
              alt={image?.altText}
            />
          )}
          <p className="text-center inline-block text-h4 font-bold text-footertext">
            {heading?.title}
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
