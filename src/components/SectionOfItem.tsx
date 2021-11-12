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
        <h4 className="pb-2 text-lg font-bold lg:text-xl">{label}</h4>
        <div className="text-md">
          <Markdown
            options={{
              overrides: {
                ul: {
                  props: {
                    className: "list-inside list-disc",
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
