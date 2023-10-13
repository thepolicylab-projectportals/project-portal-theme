import React, { FunctionComponent } from "react"
import { MarkdownText } from "./MarkdownText"

export interface NewsletterProps {
  title?: string
  text?: string
  link?: string
}

export const Newsletter: FunctionComponent<NewsletterProps> = ({
  title,
  text,
  link,
}) => {
  return (
    <>
      {link ? (
        <div className="w-full p-8 mb-8 bg-gray-100">
          {title ? <h4 className="text-h4">{title}</h4> : null}
          {text ? (
            <div className="text-black text-body mb-4">
              <MarkdownText text={text} />
            </div>
          ) : null}
          <div>
            <a href={link}>
              <button className="btn">Subscribe</button>
            </a>
          </div>
        </div>
      ) : null}
    </>
  )
}
