import { graphql, Link, withPrefix } from "gatsby"
import React, { FunctionComponent } from "react"
import moment from "moment"
import { BackIcon } from "./BackIcon"

import {
  Feature,
  //MainContact,
  SectionOfItem,
  ShareProject,
} from "./index"

import { CollaboratorDetails, ProjectTeam } from "./index"
import { statusOutput, isNA, isEmpty } from "../utils"

interface ProjectDetailLayoutProps {
  question: string
  partnerName: string
  slug: string
  summary: string
  status: string
  opportunityCloses: Date
  startDate: Date
  endDate: Date
  lastModified: Date
  agency: string
  topics: string[]
  deliverable: string
  purpose: string
  expertise: string
  requirement: string
  keyDates: string
  priorResearch: string
  statusOfData: string
  fundingInfo: string
  emailContent: string
  collaborationType: string
  contacts: {
    frontmatter: {
      name: string
      title: string
      employer: string
      email: string
      contactImage: any
    }
  }[]
  location: any
}

export const ProjectDetailLayout: FunctionComponent<
  ProjectDetailLayoutProps
> = ({
  question,
  partnerName,
  slug,
  summary,
  status,
  opportunityCloses,
  startDate,
  endDate,
  lastModified,
  agency,
  topics,
  deliverable,
  purpose,
  expertise,
  requirement,
  keyDates,
  priorResearch,
  statusOfData,
  fundingInfo,
  emailContent,
  collaborationType,
  contacts,
  location,
}) => {
  let mainContact = null
  let projectTeam = null

  if (contacts) {
    //mainContact = contacts[0].frontmatter
    projectTeam = contacts
    console.log(projectTeam)
    // if (!showMainContactOnProjectTeam) {
    //   projectTeam = contacts.slice(1, contacts.length)
    //}
  }
  return (
    <article>
      <header className="py-16 p-responsive bg-primary">
        <div className="flex flex-col justify-between m-responsive lg:flex-row">
          <div className="w-auto">
            <h1 className="text-h3 sm:text-h2 w-full font-bold leading-h2 text-white lg:w-4/5">
              {question}
            </h1>
            {
              // This code allows you to set the defaults for key dates
              // For instance, change the second `true` here to `startDate` if you
              // do _not_ want any date to appear when the project `startDate` is
              // null. Note that you may also need to edit the `statusOutput` call
              // below and also the one in `Card.tsx`
              statusOutput(status, true, true, true) !== null && (
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
                    opportunityCloses
                      ? moment(opportunityCloses).format("MMMM D, YYYY")
                      : "Until filled",
                    startDate
                      ? moment(startDate).format("MMMM D, YYYY")
                      : moment(lastModified).format("MMMM D, YYYY"),
                    endDate
                      ? moment(endDate).format("MMMM D, YYYY")
                      : moment(lastModified).format("MMMM D, YYYY")
                  )}
                </div>
              )
            }
            <div className="text-white text-body">
              <span className="font-bold">Department or Agency: </span>
              {agency}
            </div>
          </div>
          <ShareProject />
        </div>
      </header>

      <main className="p-responsive pb-4">
        <section className="flex flex-wrap items-start py-6 m-responsive gap-x-10 gap-y-4">
          {!isEmpty(topics) && (
            <div className="text-tag mt-2">
              <Feature label="Topics" className="bg-topics" value={topics} />
            </div>
          )}
        </section>

        <section className="mt-8">
          <div className="m-responsive">
            <h2 className="text-h3">Project overview</h2>
          </div>
          <div className="flex flex-col justify-between w-full py-4 lg:flex-row">
            <div className="m-responsive lg:w-3/5 xl:2/3">
              {!isNA(summary) && (
                <div className="w-full lg:w-11/12">
                  <SectionOfItem label="Summary" value={summary} />
                </div>
              )}
              {!isNA(deliverable) && (
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
              )}
              {!isNA(purpose) && (
                <div className="w-full mt-4 lg:w-11/12">
                  <SectionOfItem
                    label="Planned use of results"
                    value={purpose}
                  />
                </div>
              )}
              {!isNA(fundingInfo) && (
                <div className="w-full mt-4 lg:w-11/12">
                  <SectionOfItem label="Funding" value={fundingInfo} />
                </div>
              )}
              {!isNA(statusOfData) && (
                <div className="w-full mt-4 lg:w-11/12">
                  <SectionOfItem label="Data" value={statusOfData} />
                </div>
              )}
              {!isNA(priorResearch) && (
                <div className="w-full mt-4 lg:w-11/12">
                  <SectionOfItem label="Helpful links" value={priorResearch} />
                </div>
              )}
            </div>
            {/*<MainContact*/}
            {/*  {...mainContact}*/}
            {/*  status={status}*/}
            {/*  date={status === "open" ? opportunityCloses : endDate}*/}
            {/*  emailContent={emailContent}*/}
            {/*/>*/}
          </div>
        </section>

        <hr className="my-8 border-gray-300 m-responsive" />

        {status === "open" ? (
          <CollaboratorDetails
            {...{
              expertise,
              requirement,
              keyDates,
            }}
          />
        ) : (
          <ProjectTeam
            title="Project Team"
            contacts={projectTeam.map((contact) => contact)}
          />
        )}
        <section className="my-12">
          <Link to={withPrefix(`/${status === "open" ? "" : status}`)}>
            <button className="btn m-responsive">
              <BackIcon />
              <span className="pl-2">Back</span>
            </button>
          </Link>
        </section>
      </main>
    </article>
  )
}
