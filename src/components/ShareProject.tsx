import React from "react"
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaEnvelope,
} from "react-icons/fa"

export const ShareProject: React.FC = () => {
  return (
    <div className="w-full lg:w-1/5">
      <h4 className="font-bold text-white text-md">Share this project</h4>
      <div className="mt-1">
        <a
          href="https://facebook.com"
          className="inline-block mr-1 text-xl text-white"
        >
          <FaFacebookSquare />
        </a>
        <a
          href="https://twitter.com"
          className="inline-block mr-1 text-xl text-white"
        >
          <FaTwitterSquare />
        </a>
        <a
          href="https://linkedin.com"
          className="inline-block mr-1 text-xl text-white"
        >
          <FaLinkedin />
        </a>
        <a
          href="mailto:thepolicylab@brown.edu"
          className="inline-block mr-1 text-xl text-white"
        >
          <FaEnvelope />
        </a>
      </div>
    </div>
  )
}
