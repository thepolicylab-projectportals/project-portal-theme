import React from "react"
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image"

export interface ContactType {
  name: string
  title: string
  employer: string
  email: string
  contactImage: any
}

interface ContactProps extends ContactType {
  showEmail: boolean
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
        style={{
          width: "100px",
          height: "100px",
        }}
      >
        {contactImage ? (
          <GatsbyImage
            className="relative rounded-full"
            alt={name}
            image={getImage(contactImage.localFiles[0])}
            style={{
              transform: "translateZ(0)",
            }}
          />
        ) : (
          <StaticImage
            className="rounded-full"
            alt={name}
            src={"../images/narwhal.jpg"}
            width={100}
            height={100}
            placeholder="blurred"
            layout="fixed"
          />
        )}
      </div>
      <div className="pl-2 pr-2 pb-2">
        <p className="font-bold text-black text-md">{name}</p>
        <p className="text-black text-md">{title}</p>
        <p className="text-black text-md">{employer}</p>
        {showEmail ? (
          <p className="text-black text-md underline">{email}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
