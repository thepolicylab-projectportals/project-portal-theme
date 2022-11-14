import Markdown from "markdown-to-jsx"
import React from "react"

export interface MarkdownTextProps {
  text: string
  className?: string
}

export const MarkdownText = ({ text, ...props }: MarkdownTextProps) => {
  return (
    <Markdown
      {...props}
      options={{
        forceBlock: true,
        overrides: {
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
              className: "markdown-text",
            },
          },
          ol: {
            props: {
              className: "markdown-text",
            },
          },
        },
      }}
    >
      {text ?? ""}
    </Markdown>
  )
}
