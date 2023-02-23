import React, { FunctionComponent } from "react"
import moment from "moment"

import {
  CollaboratorDetails,
  ContactType,
  Feature,
  MainContact,
  ProjectTeam,
  SectionOfItem,
  ShareProject,
  TopicType,
} from "."

import { statusOutput, isNA, isEmpty } from "../utils"

export interface ProjectDetailLayoutProps {
  // Core content
  question: string
  summary: string
  title: string

  // (Optional) general additional content
  deliverable?: string
  purpose?: string
  fundingInfo?: string
  statusOfData?: string
  priorResearch?: string

  // (Optional) collaborator-targeted additional content
  expertise?: string
  requirement?: string
  keyDates?: string

  // Contact
  mainContact: ContactType
  emailContent?: string // shown with MainContact for open projects

  // Project team
  projectTeam?: ContactType[]

  // Metadata
  status: string
  opportunityCloses: Date
  startDate: Date
  endDate: Date
  agency: string
  topics?: TopicType[]
  lastModified: Date
}

export const ProjectDetailLayout: FunctionComponent<
  ProjectDetailLayoutProps
> = ({
  question,
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
  mainContact,
  projectTeam,
}) => {
  return (
    <article>
      <header>
        <div className="py-16 p-responsive bg-primary">
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
                        : "Open until filled",
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
        </div>
        <div className="p-responsive pb-4">
          <section className="flex flex-wrap items-start py-6 m-responsive gap-x-10 gap-y-4">
            {!isEmpty(topics) && (
              <div className="text-tag mt-2">
                <Feature
                  label="Topics"
                  className="bg-topics"
                  value={topics.map((topic) => topic.title)}
                />
              </div>
            )}
          </section>
        </div>
      </header>
      <div className="p-responsive pb-4">
        <section className="mt-8">
          <div className="m-responsive">
            <h2 className="text-h3">Project Overview</h2>
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
            {!(mainContact === null || mainContact === undefined) && (
              <MainContact
                {...mainContact}
                status={status}
                emailContent={emailContent}
              />
            )}
          </div>
        </section>

        {status === "open" && (
          <>
            <hr className="my-8 border-gray-300 m-responsive" />
            <CollaboratorDetails
              {...{
                expertise,
                requirement,
                keyDates,
              }}
            />
          </>
        )}

        {!isEmpty(projectTeam) && (
          <>
            <hr className="my-8 border-gray-300 m-responsive" />
            <ProjectTeam title="Project Team" contacts={projectTeam} />
          </>
        )}
      </div>
    </article>
  )
}
