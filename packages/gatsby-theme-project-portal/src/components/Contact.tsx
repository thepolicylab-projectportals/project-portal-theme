import React from "react"
import { GatsbyImage, ImageDataLike, getImage } from "gatsby-plugin-image"

export interface ContactType {
  name: string
  title: string
  employer: string
  email: string
  image?: ImageDataLike
  defaultImage?: ImageDataLike
}

interface ContactProps extends ContactType {
  showEmail: boolean
}

export const Contact: React.FC<ContactProps> = ({
  name,
  title,
  employer,
  email,
  image,
  defaultImage,
  showEmail,
}) => {
  const resolvedImage = getImage(image ?? defaultImage)
  return (
    <div className="flex items-start gap-4 overflow-hidden flex-nowrap justify-left">
      <div
        className="hidden sm:block"
        style={{
          width: "100px",
          height: "100px",
        }}
      >
        {resolvedImage && (
          <GatsbyImage
            className="relative rounded-full"
            alt={name}
            image={getImage(resolvedImage)}
            style={{
              transform: "translateZ(0)",
            }}
          />
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
