import { withPrefix } from "gatsby"
import React, { Component } from "react"

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
      className="px-0 py-0 md:px-4 md:py-12 xl:px-16 xl:py-12 lg:container overflow-hidden bg-white mx-0"
      style={{
        background: `url(${withPrefix(imageSrc)})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        backgroundPositionY: "bottom",
      }}
    >
      <div className="flex flex-wrap m-0 lg:m-4">
        <div className="w-full lg:w-2/3 bg-white p-8">
          <h2 className="text-4xl font-bold pb-3 text-gray-600">{title}</h2>
          <p className="text-lg leading-normal">{lede}</p>
        </div>
      </div>
    </div>
  )
}
