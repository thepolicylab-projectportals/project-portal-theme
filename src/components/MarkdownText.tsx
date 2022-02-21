import Markdown from "markdown-to-jsx"
import React from "react"

export interface MarkdownTextProps {
  text: string
  className?: string
}

export const MarkdownText = ({ text, className }: MarkdownTextProps) => {
  return (
    <Markdown
      className={className}
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
              className: "list-outside list-disc ml-5",
            },
          },
          ol: {
            props: {
              className: "list-outside list-decimal ml-5",
            },
          },
        },
      }}
    >
      {text}
    </Markdown>
  )
}
