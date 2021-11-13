import { graphql, Link, withPrefix } from "gatsby"
import React, { FunctionComponent } from "react"
import {
  Feature,
  SiteMetadata,
  Navbar,
  MainContact,
  SectionOfItem,
  ShareProject,
} from "../components"
import { Layout } from "../layouts/Layout"

import { CollaboratorDetails, ProjectTeam } from "../components"
import { statusOutput } from "../utils"

interface ProjectDetailProps {
  data: {
    item: {
      data: {
        question: string
        partnerName: string
        slug: string
        summary: string
        status: string
        opportunityCloses: Date
        startDate: Date
        endDate: Date
        agency: string
        policyAreas: string[]
        supportNeeded: string[]
        deliverable: string
        purpose: string
        expertise: string
        requirement: string
        keyDates: string
        priorResearch: string
        statusOfData: string
        fundingInfo: string
        contacts: {
          data: {
            name: string
            title: string
            employer: string
            email: string
            contactImage: any
          }
        }[]
      }
    }
  }
  location: any
}

const ProjectDetail: FunctionComponent<ProjectDetailProps> = (props) => {
  const { data } = props
  const {
    question,
    summary,
    status,
    opportunityCloses,
    startDate,
    endDate,
    agency,
    policyAreas,
    supportNeeded,
    deliverable,
    purpose,
    expertise,
    requirement,
    keyDates,
    priorResearch,
    statusOfData,
    fundingInfo,
    contacts,
  } = data.item.data

  const mainContact = contacts[0].data

  return (
    <Layout>
      <SiteMetadata title={question} description={summary} />

      <Navbar activePage={null} />

      <section className="mx-12 my-4 text-blue-500 underline hover:text-rust-500">
        <Link to={withPrefix(`/${status === "open" ? "" : status}`)}>
          Back to viewing all {status} projects
        </Link>
      </section>

      <article>
        <section className="px-6 py-16 md:px-8 lg:px-16 bg-rust-500">
          <div className="flex flex-wrap">
            <div className="w-full pb-4 lg:w-4/5 lg:pr-4 lg:pb-0">
              <h1 className="pb-4 text-4xl font-semibold leading-tight text-white">
                {question}
              </h1>
              <div className="text-white text-md">
                <span className="font-bold">
                  {statusOutput(
                    status,
                    "Opportunity closes: ",
                    "Project started: ",
                    "Project ended: "
                  )}
                </span>
                {statusOutput(status, opportunityCloses, startDate, endDate)}
              </div>
              <div className="text-white text-md">
                <span className="font-bold">Agency: </span>
                {agency}
              </div>
            </div>
            <ShareProject />
          </div>
        </section>

        <section className="flex flex-wrap px-4 py-4 md:px-6 lg:px-14">
          <div className="mt-2 mr-8">
            <Feature
              label="Policy Areas"
              color="blue-200"
              value={policyAreas}
            />
          </div>
          <div className="mt-2 mr-8">
            <Feature
              label="Support Needed"
              color="purple-200"
              value={supportNeeded}
            />
          </div>
        </section>

        <section className="px-0 pt-8 pb-4 md:px-8 lg:px-16 ">
          <h2 className="w-full px-4 text-2xl font-bold lg:px-0">
            Project overview
          </h2>
          <div className="flex flex-wrap w-full py-4">
            <div className="w-full px-8 lg:px-0 lg:w-2/3">
              <div>
                <SectionOfItem px-4 label="Summary" value={summary} />
              </div>
              <div className="mt-4">
                <SectionOfItem
                  label={
                    status === "completed"
                      ? "Deliverables"
                      : "Anticipated deliverables"
                  }
                  value={deliverable}
                />
              </div>
              <div className="mt-4">
                <SectionOfItem
                  label="How results will be used"
                  value={purpose}
                />
              </div>
            </div>
            <MainContact
              {...mainContact}
              status={status}
              date={status === "open" ? opportunityCloses : endDate}
            />
          </div>
        </section>

        <hr className="mx-4 my-8 text-center border-gray-300 lg:mx-12" />

        {status === "open" ? (
          <CollaboratorDetails
            {...{
              expertise,
              requirement,
              keyDates,
              priorResearch,
              statusOfData,
              fundingInfo,
            }}
          />
        ) : (
          <ProjectTeam
            title="Project Team"
            contacts={contacts.map((contact) => contact.data)}
          />
        )}

        <section className="mx-12 my-4">
          <Link to={withPrefix(`/${status === "open" ? "" : status}`)}>
            <button className="px-4 py-3 mt-2 mr-2 text-sm font-bold text-white rounded bg-rust-500 hover:bg-rust-800">
              Back
            </button>
          </Link>
        </section>
      </article>
    </Layout>
  )
}

export default ProjectDetail

export const query = graphql`
  query ProjectDetailQuery($slug: String!) {
    item: airtable(data: { slug: { eq: $slug } }) {
      data {
        question
        partnerName
        slug
        summary
        status
        opportunityCloses
        startDate
        endDate
        agency
        policyAreas
        supportNeeded
        deliverable
        purpose
        expertise
        requirement
        keyDates
        priorResearch
        statusOfData
        fundingInfo
        contacts {
          data {
            name
            title
            employer
            email
            contactImage {
              localFiles {
                id
                childImageSharp {
                  gatsbyImageData(
                    width: 100
                    height: 100
                    placeholder: BLURRED
                    layout: FIXED
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`
