import { withPrefix } from "gatsby"
import React from "react"

interface HeaderWithImageProps {
  title: string
  lede: string
  imageSrc: string
}

export const HeaderWithImage = ({
  title,
  lede,
  imageSrc,
}: HeaderWithImageProps) => {
  return (
    <div
      className="px-4 py-4 mx-0 mb-16 overflow-hidden bg-white md:px-8 md:py-12 xl:px-16 xl:container"
      style={{
        background: `url(${withPrefix(imageSrc)})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        backgroundPositionY: "center",
      }}
    >
      <div className="m-0 lg:m-4">
        <div className="w-full p-8 bg-white lg:w-2/3">
          <h1 className="pb-3 mb-4 text-4xl font-bold text-gray-600">
            {title}
          </h1>
          <p className="text-lg leading-normal">{lede}</p>
        </div>
      </div>
    </div>
  )
}
