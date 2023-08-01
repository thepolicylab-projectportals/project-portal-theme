import { graphql } from "gatsby"
import React, { FunctionComponent } from "react"
import { isEmpty, statusOutput } from "../utils"
import moment from "moment"
import { Topics, TopicType, ProjectStatus, KeyDate } from "."

export interface CardProps {
  // Card Details
  slug: string
  title: string
  question: string
  status: string
  agency: string
  topics: TopicType[]

  // Dates
  opportunityCloses?: Date
  startDate?: Date
  endDate?: Date
  lastModified: Date
  created: Date
}

export const query = graphql`
  fragment CardDetails on Project {
    slug
    title
    question
    status
    agency
    topics {
      ...TopicDetails
    }
    opportunityCloses
    startDate
    endDate
    lastModified
    created
  }
`

export const Card: FunctionComponent<CardProps> = ({
  slug,
  title,
  question,
  status,
  agency,
  topics,
  opportunityCloses,
  startDate,
  endDate,
  lastModified,
}) => {
  return (
    <article>
      <div className="px-2 py-4 overflow-hidden bg-white border border-gray-200 rounded-md shadow-sm h-full">
        <div className="flex flex-col h-full">
          <div className="mt-4 ml-4">
            <ProjectStatus status={status} />
          </div>
          <div className="p-5 pb-5">
            <div className="pb-4 text-h3 font-bold leading-snug text-black">
              {question}
            </div>
            <div>
              <div className="mt-4 text-body">
                <KeyDate
                  status={status}
                  opportunityCloses={opportunityCloses}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
              <div className="mb-4 text-body">
                <span className="font-bold">Department or Agency: </span>
                {agency}
              </div>
              {!isEmpty(topics) && (
                <div className="text-tag mt-4">
                  <Topics topics={topics} />
                </div>
              )}
            </div>
          </div>
          <div className="p-5 pb-1 mt-auto border-t-2 border-solid">
            <button aria-label={title + " Details"} className="btn-wide">
              {statusOutput(
                status,
                "View opportunity",
                "View project",
                "View project"
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
