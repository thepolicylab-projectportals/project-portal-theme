import { graphql, Link, withPrefix } from "gatsby"
import React, { FunctionComponent } from "react"
import moment from "moment"
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
import { isNA } from "../utils"

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
        deliverable: string
        purpose: string
        expertise: string
        requirement: string
        keyDates: string
        priorResearch: string
        statusOfData: string
        fundingInfo: string
        emailContent: string
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
    deliverable,
    purpose,
    expertise,
    requirement,
    keyDates,
    priorResearch,
    statusOfData,
    fundingInfo,
    contacts,
    emailContent,
  } = data.item.data

  const mainContact = contacts[0].data

  return (
    <Layout>
      <SiteMetadata title={question} description={summary} />

      <Navbar activePage={null} />

      <article>
        <header className="py-16 p-responsive bg-primary-500">
          <div className="flex flex-col justify-between m-responsive lg:flex-row">
            <div className="w-auto">
              <h1 className="text-h2 w-full font-bold leading-[3rem] text-white lg:w-4/5">
                {question}
              </h1>
              <div className="mt-4 text-white text-body">
                <span className="font-bold">
                  {statusOutput(
                    status,
                    "Opportunity closes: ",
                    "Project started: ",
                    "Project ended: "
                  )}
                </span>
                {statusOutput(
                  status,
                  moment(opportunityCloses).format("MMMM D, YYYY"),
                  moment(startDate).format("MMMM D, YYYY"),
                  moment(endDate).format("MMMM D, YYYY")
                )}
              </div>
              <div className="text-white text-body">
                <span className="font-bold">Agency: </span>
                {agency}
              </div>
            </div>
            <ShareProject />
          </div>
        </header>

        <main className="p-responsive">
          <section className="flex flex-wrap items-start py-6 m-responsive gap-x-10 gap-y-4">
            <div className="text-tag mt-2">
              <Feature
                label="Policy Areas"
                color="policyareas-200"
                value={policyAreas}
              />
            </div>
          </section>

          <section className="mt-8">
            <div className="m-responsive">
              <h2 className="text-h3">Project overview</h2>
            </div>
            <div className="flex flex-col justify-between w-full py-4 lg:flex-row">
              <div className="m-responsive lg:w-3/5 xl:2/3">
                <div className="w-full lg:w-11/12">
                  <SectionOfItem label="Summary" value={summary} />
                </div>
                <div className="w-full mt-4 lg:w-11/12">
                  <SectionOfItem
                    label={
                      status === "completed"
                        ? "Deliverables"
                        : "Anticipated deliverables"
                    }
                    value={deliverable}
                  />
                </div>
                <div className="w-full mt-4 lg:w-11/12">
                  <SectionOfItem
                    label="How results will be used"
                    value={purpose}
                  />
                </div>
                {isNA(statusOfData) ? (
                  ""
                ) : (
                  <div className="w-full mt-4 lg:w-11/12">
                    <SectionOfItem
                      label="Funding"
                      value={fundingInfo}
                      value={statusOfData}
                    />
                  </div>
                )}
                {isNA(priorResearch) ? (
                  ""
                ) : (
                  <div className="w-full mt-4 lg:w-11/12">
                    <SectionOfItem label="Data" value={statusOfData} />
                  </div>
                )}
                {isNA(fundingInfo) ? (
                  ""
                ) : (
                  <div className="w-full mt-4 lg:w-11/12">
                    <SectionOfItem
                      label="Helpful links"
                      value={priorResearch}
                    />
                  </div>
                )}
              </div>
              <MainContact
                {...mainContact}
                status={status}
                date={status === "open" ? opportunityCloses : endDate}
                emailContent={emailContent}
              />
            </div>
          </section>

          <hr className="my-8 border-gray-300 m-responsive" />

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

          <section className="my-12">
            <Link to={withPrefix(`/${status === "open" ? "" : status}`)}>
              <button className="btn m-responsive"> &lt; Back</button>
            </Link>
          </section>
        </main>
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
        deliverable
        purpose
        expertise
        requirement
        keyDates
        priorResearch
        statusOfData
        fundingInfo
        emailContent
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
