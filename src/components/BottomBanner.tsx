import { string } from "prop-types"
import { Link } from "gatsby"
import React from "react"

interface BottomBannerProps {
  // title: string
  text: string
  link: string
  // buttonText: string
}

export const BottomBanner: React.FC<BottomBannerProps> = ({
  // title,
  text,
  link,
}: // buttonText,
BottomBannerProps) => {
  return (
    <div className="py-6 mt-12 overflow-hidden bg-gray-100 p-responsive">
      <div className="m-responsive">
        <div className="w-full">
          {/* <div className="pb-3 text-3xl font-bold text-gray-600">{title}</div> */}
          <img
            className="inline-block w-52 h-24 float-left"
            src="/images/RD_LOGO_FINAL _ with partner logos.png"
            alt="R+D League logos"
          />
          <div className="inline-block w-4/5 mt-5 text-xl float-right">
            {text}
            <a
              className="font-semibold text-black underline hover:text-primary-500"
              href={link}
            >
              let us know
            </a>
            !
          </div>
        </div>
      </div>
    </div>
  )
}
