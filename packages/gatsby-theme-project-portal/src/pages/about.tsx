import React from "react"
import { graphql } from "gatsby"
import { Disclosure } from "@headlessui/react"
import { Layout } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/layouts"
import {
  HeaderWithImage,
  MarkdownText,
} from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"
import { FaPlus, FaMinus } from "react-icons/fa"
import { useStaticText, useSiteMetadata } from "../hooks"
import { isNA } from "../utils"

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

const AboutList = ({ aboutTitle, aboutText }) => {
  return (
    <div className="mb-8">
      {aboutTitle && <h3 className="text-h3 mb-4">{aboutTitle}</h3>}
      <MarkdownText text={aboutText} />
    </div>
  )
}

export default ({ data }: AboutProps) => {
  const { title } = useSiteMetadata()
  const language = useStaticText()
  console.log("test")
  console.log(data)
  return (
    <Layout activePage="About" title="About" description={`About the ${title}`}>
      <main>
        <header>
          <HeaderWithImage
            title="About"
            lede=""
            imageSrc={data?.bgImage?.childImageSharp.resize.src}
          />
        </header>

        <article className="w-full pt-5 px-8 lg:px-16 xl:px-24 lg:w-2/3">
          <section className="mb-20">
            {language.about.header && (
              <h2 className="text-h3 sm:text-h2 my-8 font-bold text-black">
                {language.about.header}
              </h2>
            )}
            {language.about.aims.map(({ title, text }, i) => (
              <AboutList
                key={"list_" + i}
                aboutTitle={title}
                aboutText={text}
              />
            ))}
          </section>

          <section className="mb-20">
            <h2 className="text-h3 sm:text-h2 my-6">
              Frequently Asked Questions
            </h2>
            {language.about.faq.map(({ title, text }, i) => (
              <Accordion
                key={"collapsibleList_" + i}
                title={title}
                text={text}
              />
            ))}
          </section>

          {!isNA(language.about.accessibility) && (
            <section id="accessibility">
              <h2 className="text-h3 sm:text-h2 my-6">
                Accessibility Statement
              </h2>
              <MarkdownText
                className="mb-10 leading-normal text-body lg:text-body"
                text={language.about.accessibility}
              />
            </section>
          )}
        </article>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query AboutQuery {
    bgImage: file(
      name: { eq: "about" }
      extension: { in: ["png", "jpg", "jpeg"] }
      sourceInstanceName: { eq: "themeImages" }
    ) {
      childImageSharp {
        resize(width: 1536) {
          src
        }
      }
    }
  }
`
