import React, { FunctionComponent } from "react"
import { graphql } from "gatsby"
import { ImageDataLike } from "gatsby-plugin-image"
import { HeaderWithImage, MarkdownText, Accordion } from "../components"
import { isNA } from "../utils"

export { Head } from "../hooks"

interface AboutProps {
  data: {
    generalPage: {
      pageName: string
      title: string
      header: string
      aims: {
        title: string
        text: string
      }[]
      faq: {
        title: string
        text: string
      }[]
      accessibility: string
      image?: ImageDataLike
    }
  }
}

const AboutList = ({ aboutTitle, aboutText }) => {
  return (
    <div className="mb-8">
      {aboutTitle && <h3 className="text-h3 mb-4">{aboutTitle}</h3>}
      <MarkdownText text={aboutText} />
    </div>
  )
}

export const AboutPageLayout: FunctionComponent<AboutProps> = ({
  data: {
    generalPage: { header, aims, faq, accessibility, image },
  },
}: AboutProps) => {
  return (
    <>
      <main>
        <article>
          <header>
            <HeaderWithImage title="About" lede="" image={image} />
          </header>

          <div className="w-full pt-5 px-8 lg:px-16 xl:px-24 lg:w-2/3">
            <section className="mb-20">
              {header && (
                <h2 className="text-h3 sm:text-h2 my-8 font-bold text-black">
                  {header}
                </h2>
              )}
              {aims.map(({ title, text }, i) => (
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
              {faq.map(({ title, text }, i) => (
                <Accordion
                  key={"collapsibleList_" + i}
                  title={title}
                  text={text}
                />
              ))}
            </section>

            {!isNA(accessibility) && (
              <section id="accessibility">
                <h2 className="text-h3 sm:text-h2 my-6">
                  Accessibility Statement
                </h2>
                <MarkdownText
                  className="mb-10 leading-normal text-body lg:text-body"
                  text={accessibility}
                />
              </section>
            )}
          </div>
        </article>
      </main>
    </>
  )
}

export default AboutPageLayout

export const query = graphql`
  query AboutQuery($slug: String!) {
    ...HeadData
    ...LayoutData
    page: generalPage(slug: { eq: $slug }) {
      title
      description: lede
    }
    generalPage(slug: { eq: $slug }) {
      pageName
      title
      header
      aims {
        title
        text
      }
      faq {
        title
        text
      }
      accessibility
      image {
        ...HeaderWithImageBackground
      }
    }
  }
`
