import React, { useState } from "react"
import { graphql } from "gatsby"
import { Navbar, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"
import { HeaderWithImage } from "../components/HeaderWithImage"
import { Disclosure } from "@headlessui/react"
import { FaPlus, FaMinus } from "react-icons/fa"

const aboutTextData = [
  {
    title:
      "Connect government and researchers to improve the lives of San Antonio residents.",
    text: "The San Antonio Research Partnerships Portal is a part of a pilot initiative from The San Antonio Office of Innovation and multiple departments within San Antonio City Government to connect department research needs with San Antonio's rich community of Academic Institutions. We believe that evidence is an important part of improving public services, and we're excited about what can do together.",
  },
  {
    title: "Build durable partnerships at all stages of the learning process.",
    text: "We're looking for thought partners, not just evaluators. Project opportunities range from problem framing and introduction to existing reseach to intervention and evaluation design to technical assistance to reporting, and seek expertise from a wide range of academic disciplines. ",
  },
  {
    title: "Advance open science tools and methods in applied research.",
    text: "Applied research has the potential to improve not only the program being studied, but public services as a whole. To do this, we need to be transparent with our results and methods. Researchers who collaborate with government partners will be able to publish results.",
  },
]

const aboutListData = [
  {
    title: "Will I be able to publish my results?",
    text: "Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here.",
  },
  {
    title: "Are these opportunities available for teams?",
    text: "Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here.",
  },
  {
    title: "Are these oppotunities available for students?",
    text: "Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here.",
  },
  {
    title: "What kind of funding is available?",
    text: "Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here.",
  },
]

interface AboutProps {
  data: {
    bgImage: {
      childImageSharp: {
        resize: {
          src: string
        }
      }
    }
  }
}

interface AccordionProps {
  title: string
  text: string
}

const Accordion: React.FC<AccordionProps> = ({ title, text }) => {
  return (
    <div className="w-full my-6">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex justify-between w-full px-4 py-3 bg-gray-100">
              <span className="font-bold">{title}</span>
              {open ? <FaMinus /> : <FaPlus />}
            </Disclosure.Button>
            <Disclosure.Panel className="p-4 w-9/10">{text}</Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}

const AboutList = ({ aboutTitle, aboutText }) => {
  return (
    <div className="mb-8">
      <h3 className="mb-4">{aboutTitle}</h3>
      <p>{aboutText}</p>
    </div>
  )
}

export default ({ data }: AboutProps) => {
  return (
    <Layout>
      <SiteMetadata
        title="Project Portal - About"
        description="Questions from East Evidencia"
      />

      <Navbar activePage="About" />

      <HeaderWithImage
        title="About"
        lede=""
        imageSrc={data.bgImage.childImageSharp.resize.src}
      />

      <article className="w-full px-8 mt-6 lg:px-16 xl:px-24 lg:w-2/3">
        <section>
          <h1 className="my-8 font-bold text-black">
            San Antonio Research Partnerships Portal Goals
          </h1>
          {aboutTextData.map(({ title, text }, i) => (
            <AboutList key={"list_" + i} aboutTitle={title} aboutText={text} />
          ))}
        </section>

        <section>
          <h2 className="my-6">Frequently Asked Questions</h2>
          {aboutListData.map(({ title, text }, i) => (
            <Accordion key={"collapsibleList_" + i} title={title} text={text} />
          ))}
        </section>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query AboutQuery {
    bgImage: file(relativePath: { regex: "/about.jpg/" }) {
      childImageSharp {
        resize(width: 1536) {
          src
        }
      }
    }
  }
`
