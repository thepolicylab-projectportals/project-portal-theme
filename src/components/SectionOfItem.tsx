import React, { FunctionComponent } from "react"
import Markdown from "markdown-to-jsx"

interface SectionOfItemProps {
  label: string
  value: string
}

const LiItem = ({ children, ...props }) => {
  return (
    <li {...props}>
      <span>{children}</span>
    </li>
  )
}

export const SectionOfItem: FunctionComponent<SectionOfItemProps> = ({
  label,
  value,
}) => {
  return (
    <>
      <section className="pt-4">
        <h4 className="text-h4">{label}</h4>
        <div className="text-h4">
          <Markdown
            options={{
              overrides: {
                ul: {
                  props: {
                    className: "list-outside list-disc ml-5",
                  },
                },
                li: {
                  component: LiItem,
                },
                a: {
                  props: {
                    className: "underline hover:no-underline",
                  },
                },
              },
            }}
          >
            {value}
          </Markdown>
        </div>
      </section>
    </>
  )
}
