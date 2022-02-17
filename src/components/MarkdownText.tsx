import Markdown from "markdown-to-jsx"
import React from "react"

export interface MarkdownTextProps {
  text: string
}

const LiItem = ({ children, ...props }) => {
  return (
    <li {...props}>
      <span>{children}</span>
    </li>
  )
}

export const MarkdownText = ({ text }: MarkdownTextProps) => {
  return (
    <Markdown
      options={{
        overrides: {
          wrapper: "div",
          forceWrapper: true,
          forceBlock: true,
          a: {
            props: {
              className: "text-link underline hover:no-underline",
            },
          },
          p: {
            props: {
              className: "mb-3",
            },
          },
          ul: {
            props: {
              className: "list-outside list-disc ml-5",
            },
          },
          li: {
            component: LiItem,
          },
        },
      }}
    >
      {text}
    </Markdown>
  )
}
