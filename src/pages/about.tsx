import React, { useState } from "react"
import { graphql } from "gatsby"
import { Navbar, SiteMetadata } from "../components"
import { Layout } from "../layouts/Layout"
import { HeaderWithImage } from "../components/HeaderWithImage"
import { Disclosure } from "@headlessui/react"
import { FaPlus, FaMinus } from "react-icons/fa"
import language from "site/language.json"
import meta from "site/meta.json"

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
        title={`About - ${meta.title}`}
        description={`About ${meta.title}`}
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
          {language.about.aims.map(({ title, text }, i) => (
            <AboutList key={"list_" + i} aboutTitle={title} aboutText={text} />
          ))}
        </section>

        <section>
          <h2 className="my-6">Frequently Asked Questions</h2>
          {language.about.faq.map(({ title, text }, i) => (
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
