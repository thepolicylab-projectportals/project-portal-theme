import React from "react"
import { Disclosure } from "@headlessui/react"
import { FaMinus, FaPlus } from "react-icons/fa"
import { MarkdownText } from "."

interface AccordionProps {
  title: string
  text: string
}

export const Accordion: React.FC<AccordionProps> = ({ title, text }) => {
  return (
    <div className="w-full my-6">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center justify-between w-full px-4 py-3 text-left bg-navbar">
              <span className="text-h4 font-bold">{title}</span>
              {open ? <FaMinus /> : <FaPlus />}
            </Disclosure.Button>
            <Disclosure.Panel className="text-body p-4 w-9/10">
              <MarkdownText text={text} />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}
