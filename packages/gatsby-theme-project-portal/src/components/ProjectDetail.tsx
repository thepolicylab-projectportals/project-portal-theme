import React, { FunctionComponent } from "react"
import { ImageDataLike } from "gatsby-plugin-image"
import {
  Accordion,
  CollaboratorDetails,
  ContactType,
  Topics,
  KeyDate,
  MainContact,
  ProjectTeam,
  SectionOfItem,
  ShareProject,
  TopicType,
} from "."

import { statusOutput, isNA, isEmpty } from "../utils"

export interface ProjectDetailProps {
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
  openText?: string // shown with MainContact for open projects
  ongoingText?: string // shown with MainContact for ongoing projects
  completeText?: string // shown with MainContact for complete projects
  projectInterestLink?: string // shown instead of email address for open projects

  // Project team
  projectTeam?: ContactType[]

  // (Optional) FAQ
  faq: {
    title: string
    text: string
  }[]

  // Metadata
  status: string
  opportunityCloses: Date
  startDate: Date
  endDate: Date
  agency: string
  topics?: TopicType[]
  lastModified: Date

  defaultContactImage: ImageDataLike
}

export const ProjectDetail: FunctionComponent<ProjectDetailProps> = ({
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
  mainContact,
  openText,
  ongoingText,
  completeText,
  projectTeam,
  faq,
  projectInterestLink,
  defaultContactImage,
}) => {
  return (
    <article>
      <header>
        <div className="py-16 p-responsive bg-primary">
          <div className="flex flex-col justify-between m-responsive lg:flex-row">
            <div className="w-auto">
              <h1 className="text-h3 w-full font-bold leading-h2 text-white lg:w-4/5 lg:text-h2">
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
                    <KeyDate
                      status={status}
                      opportunityCloses={opportunityCloses}
                      startDate={startDate}
                      endDate={endDate}
                    />
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
                <Topics topics={topics} />
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
              {!isEmpty(faq) && (
                <>
                  <section className="w-full mt-10 lg:w-11/12">
                    <h3 className="text-h3">Frequently Asked Questions</h3>
                    {faq.map(({ title, text }, i) => (
                      <Accordion
                        key={"collapsibleList_" + i}
                        title={title}
                        text={text}
                      />
                    ))}
                  </section>
                </>
              )}
            </div>
            {!(mainContact === null || mainContact === undefined) && (
              <MainContact
                {...mainContact}
                status={status}
                openText={openText}
                ongoingText={ongoingText}
                completeText={completeText}
                projectInterestLink={projectInterestLink}
                defaultImage={defaultContactImage}
              />
            )}
          </div>
        </section>

        {(expertise || requirement || keyDates) && status === "open" && (
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
            <ProjectTeam
              title="Project Team"
              contacts={projectTeam}
              defaultImage={defaultContactImage}
            />
          </>
        )}
      </div>
    </article>
  )
}
