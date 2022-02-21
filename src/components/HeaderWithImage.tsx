import { withPrefix } from "gatsby"
import React from "react"
import { MarkdownText } from "../components"
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
      className="px-4 py-4 mx-0 lg:mb-16 bg-white md:px-8 md:py-12 xl:px-16 xl:container sm:min-h-15rem"
      style={{
        background: `url(${withPrefix(imageSrc)})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        backgroundPositionY: "center",
      }}
    >
      <div className="lg:-mb-28 m-0 lg:m-4 bg-white border-b-8 border-primary border-solid flex align-center">
        <div className="w-full p-4 sm:p-12 lg:pl-28 lg:w-2/3">
          <h1 className="text-h3 pb-0 sm:text-h1 font-bold text-black">
            {title}
          </h1>
          {lede && (
            <MarkdownText className="text-body leading-normal" text={lede} />
          )}
        </div>
      </div>
    </div>
  )
}
