import React, { FunctionComponent } from "react"
import { MarkdownText } from "../components/MarkdownText"

interface SectionOfItemProps {
  label: string
  value: string
}

export const SectionOfItem: FunctionComponent<SectionOfItemProps> = ({
  label,
  value,
}) => {
  return (
    <>
      <section className="pt-4">
        <h4 className="text-h4">{label}</h4>
        <div className="text-body">
          <MarkdownText text={value} />
        </div>
      </section>
    </>
  )
}
