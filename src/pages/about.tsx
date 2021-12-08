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
      "Build and use evidence to improve the lives of San Antonio residents.",
    text: `The San Antonio Research Partnerships Portal is a pilot initiative from The San Antonio Office of Innovation and multiple departments within San Antonio City Government. 
    
    Our goal is to connect government officials with San Antonio's rich community of Academic Institutions to answer important questions about how to best design, deliver, and evaluate city services. We believe that evidence is an important part of improving public services, and we're excited about what we can do together!`,
  },
  {
    title:
      "Promote durable partnerships at all stages of the learning process.",
    text: "We believe great work is built from lasting relationships. We're looking for thought partners, not just evaluators, and seek collaborators from a wide variety of academic disciplines. Project opportunities range from problem framing to introduction to existing research to intervention and evaluation design to technical assistance to reporting.",
  },
  {
    title: "Share knowledge about what works.",
    text: "Applied research on a specific challenge has the potential to benefit public services as a whole. To do this, we need to be transparent with our results and methods. We know that publication is an important part of the research process, and will work with collaborators to support publication where appropriate.",
  },
]

const aboutListData = [
  {
    title: "What sort of collaborators are you looking for?",
    text: "We are looking for academic researchers from a range of disciplines relevant to policy and program design and evaluation. Example disciplines include public policy, economics, behavioral science, sociology, marketing, and law, but we encourage you to apply for any opportunity that you think you are a good fit for!",
  },
  {
    title: "Do I need to have prior experience working with government?",
    text: "Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here. Placeholder text for publish results here.",
  },
  {
    title: "Are these opportunities available for students?",
    text: "It depends on the project. Check out the project description to learn more about expectations and requirements. Opportunities that require a PhD or equivalent experience will usually state so in their announcement.",
  },
  {
    title: "Can multiple people work on a project?",
    text: "It depends on the project. If you are interested in working with a team, please reach out to the project point of contact for further discussion.",
  },
  {
    title: "What kind of funding is available?",
    text: "Some projects are able to offer funding, others may not have funding available at this time, and some may be open to seeking funding from external sources. The extent and source of funding will depend on the scope of the project, level of expertise needed, and other factors. Research partners, agency officials, and the Office of Innovation can discuss funding details, including needs and potential sources, on a case-by-case basis.",
  },
  {
    title: "What kind of data is available?",
    text: "Data availability depends on the specific project. Projects may involve qualitative and quantitative data, and collecting or analyzing data. In many cases, academic collaborators will need to sign a Data Use Agreement in order to access and use existing government data.",
  },
  {
    title: "Can I propose a project idea?",
    text: "The Office of Innovation is always interested in exploring opportunities for improving city services. If you have a research idea, please email us with a description of your idea, and we’ll get in touch to see if it’s a good fit for the portal.",
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
            <Disclosure.Button className="flex items-center justify-between w-full px-4 py-3 text-left bg-gray-100">
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
        title="About - San Antonio Research Partnership Portal "
        description="About San Antonio Research Partnership Portal"
      />

      <Navbar activePage="About" />

      <HeaderWithImage
        title="About"
        lede=""
        imageSrc={data.bgImage.childImageSharp.resize.src}
      />

      <article className="w-full px-8 lg:px-16 xl:px-24 lg:w-2/3">
        <section>
          <h1 className="my-8 font-bold text-black">What we’re here to do</h1>
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
