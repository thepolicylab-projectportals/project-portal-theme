import React, { FunctionComponent } from "react"

export interface NewsletterProps {
  text?: string
  link?: string
}

export const Newsletter: FunctionComponent<NewsletterProps> = ({
  text,
  link,
}) => {
  return (
    <>
      {link ? (
        <div className="w-full p-8 mb-8 bg-gray-100">
          {text ? <h4 className="text-h4">{text}</h4> : null}
          <a href={link}>
            <button className="btn">Subscribe</button>
          </a>
        </div>
      ) : null}
    </>
  )
}
