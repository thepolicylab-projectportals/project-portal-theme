import { graphql, Link } from "gatsby"
import React, { FunctionComponent } from "react"
import { Feature, TopicType } from "."
import { ProjectStatus } from "./ProjectStatus"
import { statusOutput, isEmpty } from "../utils"
import moment from "moment"

export interface CardWithoutNavigationProps {
  // Card Details
  slug: string
  title: string
  question: string
  status: string
  agency: string
  topics: TopicType[]

  // Dates
  opportunityCloses: Date
  startDate: Date
  endDate: Date
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

export interface CardProps extends CardWithoutNavigationProps {
  navigation: {
    current: number
    items: string[]
  }
}

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
  navigation,
}) => {

  const DateDisplay = () => {
  if (status === "open" && opportunityCloses) {
    return <>
      <span className="font-bold">Opportunity closes: </span>
      <span>{moment(opportunityCloses).format("MMMM D, YYYY")}</span>
    </>
  } else if (status === "open") {
    return <>
      <span className="font-bold">Opportunity closes: </span>
      <span>Open until filled</span>
    </>
  } else if (status === "ongoing" && startDate) {
    return <>
      <span className="font-bold">Project started: </span>
      <span>{moment(startDate).format("MMMM D, YYYY")}</span>
    </>
  }
  else if (status === "completed" && endDate) {
    return <>
      <span className="font-bold">Project ended: </span>
      <span>{moment(endDate).format("MMMM D, YYYY")}</span>
    </>
  }
  else {
    return <></>
  }

}

  return (
    <article>
      <div className="px-2 py-4 overflow-hidden bg-white border border-gray-200 rounded-md shadow-sm h-full">
        <Link to={`/project/${slug}`} state={{ navigation }}>
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
                <DateDisplay />
              </div>
                <div className="mb-4 text-body">
                  <span className="font-bold">Department or Agency: </span>
                  {agency}
                </div>
                {!isEmpty(topics) && (
                  <div className="text-tag mt-4">
                    <Feature
                      label="Topics"
                      className="bg-topics"
                      value={topics.map((topic) => topic.title)}
                    />
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
        </Link>
      </div>
    </article>
  )
}
