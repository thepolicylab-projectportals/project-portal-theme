import React, { FunctionComponent } from "react"
import { IGatsbyImageData } from "gatsby-plugin-image"

interface FooterProps {
  title: {
    name: String
    link: string
  }
  copyright: String
  links: {
    name: String
    link: String
  }[]
  siteTitle: String
  image?: IGatsbyImageData
}

export const FooterLayout: FunctionComponent<FooterProps> = ({
  title,
  copyright,
  links,
  siteTitle,
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
          {links.map(({ name, link }, i) => (
            <ListItem key={"link_" + i} target={link}>
              {name}
            </ListItem>
          ))}
        </ul>
      </div>
      <div className="block w-full lg:w-auto mt-5">
        <a
          className="flex items-center gap-4 justify-center flex-wrap"
          href={title.link}
        >
          {image && (
            // use of GatsbyImage for the logo because pa11y error as it doesn't register as an image
            <img
              srcSet={image.images.sources[0].srcSet}
              alt={siteTitle + " logo"}
              height={image.height}
              width={image.width}
            />
          )}
          <p className="text-center inline-block text-h4 font-bold text-footertext">
            {title.name}
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

// const FooterImage = (FooterLayout) => {
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
//  return  <FooterLayout image={FooterImage} useSiteStaticText={useSiteStaticText} />
// }
