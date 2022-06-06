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
      <h4 className="text-h4 font-bold text-white">Share this project</h4>
      <div className="flex gap-1 mt-1 flex-nowrap place-content-start">
        <FacebookShareButton url={url} resetButtonStyle={true}>
          <FaFacebookSquare className="text-2xl text-white" />
        </FacebookShareButton>
        <TwitterShareButton url={url} resetButtonStyle={true}>
          <FaTwitterSquare className="text-2xl text-white" />
        </TwitterShareButton>
        <LinkedinShareButton url={url} resetButtonStyle={true}>
          <FaLinkedin className="text-2xl text-white" />
        </LinkedinShareButton>
        <EmailShareButton
          resetButtonStyle={true}
          url={url}
          subject={"Sharing a wonderful project opportunity!"}
        >
          <FaEnvelopeSquare className="text-2xl text-white" />
        </EmailShareButton>
      </div>
    </div>
  )
}
