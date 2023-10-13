import React, { FunctionComponent } from "react"

interface Newsletter {
  text?: string
  link?: string
}

export const Newsletter: FunctionComponent<Newsletter> = ({ text, link }) => {
  return (
    <>
      {link ? (
        <div className="w-full p-8 mb-8 bg-gray-100">
          {text ? <h4 className="text-h4">{text}</h4> : null}
          <a href={link} target="_blank" rel="noopener">
            <button className="btn">Subscribe</button>
          </a>
        </div>
      ) : null}
    </>
  )
}
