import { graphql, Link } from "gatsby"
import React, { FunctionComponent } from "react"
import { Feature, SiteMetadata, Navbar } from "../components"
import { Layout } from "../layouts/Layout"
import Markdown from "markdown-to-jsx"
import { ProjectContact } from "../components/ProjectContact"

interface SingleItemProps {
  data: {
    item: {
      data: {
        question: string
        slug: string
        summary: string
        deliverable: string
        expertise: string
        opportunityCloses: string
        keyDates: string
        commitment: string
        contactName: string
        contactTitle: string
        contactEmail: string
        collaborationType: string
        applicationProcess: string
        statusOfData: string
        priorResearch: string
        fundingInfo: string
      }
    }
  }
  location: any
}

interface SectionOfItemProps {
  label: string
  value: string
}

const LiItem = ({ children, ...props }) => {
  props["className"] = "list-style-type-dash"
  return (
    <li {...props}>
      <span>{children}</span>
    </li>
  )
}

const SectionOfItem: FunctionComponent<SectionOfItemProps> = ({
  label,
  value,
}) => {
  return (
    <>
      <section className="pt-4">
        <h4 className="lg:text-xl text-lg font-bold pb-2">{label}</h4>
        <div className="text-sm">
          <Markdown
            options={{
              overrides: {
                ul: {
                  props: {
                    className: "list-inside list-style-type-dash",
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

export const SingleItem: FunctionComponent<SingleItemProps> = (props) => {
  const { data, location } = props
  const {
    question,
    summary,
    deliverable,
    expertise,
    keyDates,
    commitment,
    contactName,
    contactTitle,
    contactEmail,
    applicationProcess,
    statusOfData,
    priorResearch,
    fundingInfo,
    collaborationType,
  } = data.item.data
  const navigation = location.state ? location.state.navigation : null

  return (
    <Layout navigation={navigation}>
      <SiteMetadata title={question} description={summary} />

      <Navbar />

      <article className="overflow-auto">
        <div className="container pt-8">
          <div className="flex flex-wrap">
            <div className="w-full pb-4 lg:w-2/3 lg:pr-4 lg:pb-0">
              <div>IMAGE</div>
              <h1 className="text-2xl lg:text-3xl text-black font-bold leading-tight pb-4">
                {question}
              </h1>
              <Feature label="Collaboration type" value={collaborationType} />
            </div>
            <div className="w-full pb-4 lg:w-1/3 lg:pr-4 lg:pb-0">
              <ProjectContact
                name={contactName}
                title={contactTitle}
                email={contactEmail}
              />
            </div>
          </div>
        </div>

        <div className="relative bg-gray-100 mt-4">
          <div className="container py-6">
            <div className="flex flex-wrap">
              <div className="w-full text-xl lg:text-3xl font-bold">
                <h2>Overview</h2>
              </div>
              <div className="w-full pb-4 lg:w-2/3 lg:pr-4 lg:pb-0">
                <SectionOfItem label="Project description" value={summary} />
                <SectionOfItem
                  label="How will the results be used"
                  value="Somehow!"
                />
                <SectionOfItem label="Expertise needed" value={expertise} />
              </div>
              <div className="w-full lg:w-1/3 lg:pl-4">
                <SectionOfItem label="Deliverables" value={deliverable} />
                <SectionOfItem label="Key dates" value={keyDates} />
                <SectionOfItem label="Requirements" value={commitment} />
              </div>
            </div>
          </div>
        </div>

        <div className="container pt-4">
          <div className="flex flex-wrap">
            <div className="w-full text-xl lg:text-2xl font-bold pb-2">
              <h2>Project details</h2>
            </div>
            <div className="w-full lg:w-1/3">
              <SectionOfItem
                label="Status of associated data"
                value={statusOfData}
              />
            </div>
            <div className="w-full lg:w-1/3">
              <SectionOfItem
                label="Prior research and background"
                value={priorResearch}
              />
            </div>
            <div className="w-full lg:w-1/3">
              <SectionOfItem label="Funding details" value={fundingInfo} />
            </div>
          </div>

          <div className="flex flex-wrap pt-4">
            <div className="w-full text-xl lg:text-2xl font-bold pb-2">
              <h2>Next steps</h2>
            </div>
            <div className="w-full lg:w-2/3">
              <SectionOfItem
                label="Application process"
                value={applicationProcess}
              />
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default SingleItem

export const query = graphql`
  query SingleItemQuery($slug: String!) {
    item: airtable(data: { slug: { eq: $slug } }) {
      data {
        question
        slug
        summary
        deliverable
        expertise
        opportunityCloses
        keyDates
        commitment
        contactName
        contactTitle
        contactEmail
        applicationProcess
        statusOfData
        priorResearch
        fundingInfo
        collaborationType
      }
    }
  }
`
