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
      className="px-0 py-0 mx-0 overflow-hidden bg-white md:px-12 md:py-12 xl:container"
      style={{
        background: `url(${withPrefix(imageSrc)})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        backgroundPositionY: "bottom",
      }}
    >
      <div className="flex flex-wrap m-0 lg:m-4">
        <div className="w-full p-8 bg-white lg:w-2/3">
          <h2 className="pb-3 text-4xl font-bold text-gray-600">{title}</h2>
          <p className="text-lg leading-normal">{lede}</p>
        </div>
      </div>
    </div>
  )
}
