import React from "react"
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaEnvelopeSquare,
} from "react-icons/fa"
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from "react-share"

export const ShareProject: React.FC = () => {
  const url = typeof window !== "undefined" ? window.location.href : ""

  return (
    <div className="mt-8 w-72 lg:mt-0">
      <h4 className="font-bold text-white text-xl lg:text-h4">
      <div className="font-bold text-white text-xl lg:text-h4">
        Share this project
      </div>
      <div className="flex gap-6 mt-1 flex-nowrap place-content-start text-5xl text-white lg:text-2xl lg:gap-1">
        <FacebookShareButton
          url={url}
          resetButtonStyle={true}
          className="shared"
        >
          <FaFacebookSquare />
        </FacebookShareButton>
        <TwitterShareButton url={url} resetButtonStyle={true}>
          <FaTwitterSquare />
        </TwitterShareButton>
        <LinkedinShareButton url={url} resetButtonStyle={true}>
          <FaLinkedin />
        </LinkedinShareButton>
        <EmailShareButton
          resetButtonStyle={true}
          url={url}
          subject={"Sharing a wonderful project opportunity!"}
        >
          <FaEnvelopeSquare />
        </EmailShareButton>
      </div>
    </div>
  )
}
