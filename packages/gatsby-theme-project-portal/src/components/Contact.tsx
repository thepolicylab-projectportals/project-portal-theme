import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

export interface ContactType {
  name: string
  title: string
  employer: string
  email: string
  contactImage?: any
}

interface ContactProps extends ContactType {
  showEmail: boolean
}

export const DefaultContactImage = ({ alt }) => {
  const { logo } = useStaticQuery(graphql`
    query DefaultContactImageQuery {
      logo: file(
        name: { eq: "default-contact" }
        extension: { in: ["png", "jpg", "jpeg"] }
        # only match files in the "themeImages" sourced directory:
        sourceInstanceName: { eq: "themeImages" }
      ) {
        childImageSharp {
          gatsbyImageData(width: 100, height: 100)
        }
      }
    }
  `)

  const image = getImage(logo)
  return (
    <>
      <GatsbyImage className="rounded-full" alt={alt} image={image} />
    </>
  )
}

export const Contact: React.FC<ContactProps> = ({
  name,
  title,
  employer,
  email,
  contactImage,
  showEmail,
}) => {
  return (
    <div className="flex items-start gap-4 overflow-hidden flex-nowrap justify-left">
      <div
        className="hidden sm:block"
        style={{
          width: "100px",
          height: "100px",
        }}
      >
        {contactImage ? (
          <GatsbyImage
            className="relative rounded-full"
            alt={name}
            image={getImage(contactImage)}
            style={{
              transform: "translateZ(0)",
            }}
          />
        ) : (
          <DefaultContactImage alt={name} />
        )}
      </div>
      <div className="pl-2 pr-2 pb-2">
        <p className="font-bold text-black text-body">{name}</p>
        <p className="text-black text-body">{title}</p>
        <p className="text-black text-body">{employer}</p>
        {showEmail ? (
          <p className="text-black text-body break-all">{email}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
