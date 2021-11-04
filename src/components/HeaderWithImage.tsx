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
      className="container px-16 py-12 overflow-hidden bg-rust"
      style={{
        background: `url(${withPrefix(imageSrc)})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        backgroundPositionY: "bottom",
      }}
    >
      <div className="flex flex-wrap m-4">
        <div className="w-full sm:w-2/3 lg:1/2 bg-white p-8">
          <h2 className="text-4xl font-bold pb-3 text-gray-600">{title}</h2>
          <p className="text-lg leading-normal">{lede}</p>
        </div>
      </div>
    </div>
  )
}
