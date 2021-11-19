import { string } from "prop-types"
import { Link } from "gatsby"
import React from "react"

interface BottomBannerProps {
  title: string
  text: string
  link: string
  buttonText: string
}

export const BottomBanner: React.FC<BottomBannerProps> = ({
  title,
  text,
  link,
  buttonText,
}: BottomBannerProps) => {
  return (
    <div className="py-16 mt-12 overflow-hidden bg-gray-100 p-responsive">
      <div className="m-responsive">
        <div className="w-full lg:w-2/3">
          <div className="pb-3 text-3xl font-bold text-gray-600">{title}</div>
          <div className="mt-2 text-md">{text}</div>
          <div>
            <Link to={link}>
              <button className="px-12 py-3 mt-4 text-sm font-bold text-white rounded bg-rust-500 hover:bg-rust-800">
                {buttonText}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
