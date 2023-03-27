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
              className: "text-linkTPL underline hover:no-underline",
            },
          },
          p: {
            props: {
              className: "mb-3",
            },
          },
          ul: {
            props: {
              className: "list-outside list-disc ml-5 mb-4",
            },
          },
          ol: {
            props: {
              className: "list-outside list-decimal ml-5 mb-4",
            },
          },
        },
      }}
    >
      {text ?? ""}
    </Markdown>
  )
}
