import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

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
        <GatsbyImage
          className="rounded-full"
          alt={name}
          image={getImage(contactImage.localFiles[0])}
        />
      </div>
      <div className="p-2">
        <h3 className="mb-1 font-bold text-black text-md">{name}</h3>
        <p className="mb-1 text-black text-md">{title}</p>
        <p className="mb-1 text-black text-md">{employer}</p>
        {showEmail ? <p className="mb-1 text-black text-md">{email}</p> : ""}
      </div>
    </div>
  )
}
