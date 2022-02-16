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
      className="px-4 py-4 mx-0 lg:mb-16 bg-white md:px-8 md:py-12 xl:px-16 xl:container"
      style={{
        background: `url(${withPrefix(imageSrc)})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        backgroundPositionY: "center",
      }}
    >
      <div className="lg:-mb-28 m-0 lg:m-4 bg-white border-b-8 border-primary border-solid">
        <div className="w-full p-4 sm:p-12 lg:pl-28 lg:w-2/3">
          <h1 className="pb-3 mb-4 text-h3 sm:text-h1 font-bold text-black">
            {title}
          </h1>
          <p className="text-body leading-normal">{lede}</p>
        </div>
      </div>
    </div>
  )
}
