import { Link } from "gatsby"
import React, { FunctionComponent } from "react"
import { Feature } from "."
import { ProjectStatus } from "./ProjectStatus"
import { statusOutput, isEmpty } from "../utils"
import moment from "moment"

export interface CardProps {
  question: string
  partnerName: string
  slug: string
  summary: string
  status: string
  opportunityCloses: Date
  startDate: Date
  endDate: Date
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
  commitment: string
  lastModified: Date
  navigation: {
    current: number
    items: string[]
  }
}

export const Card: FunctionComponent<CardProps> = ({
  question,
  slug,
  status,
  topics,
  agency,
  opportunityCloses,
  startDate,
  endDate,
  lastModified,
  navigation,
}) => {
  return (
    <div className="px-2 py-4 overflow-hidden bg-white border border-gray-200 rounded-md shadow-sm">
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
              {
                // This code allows you to set the defaults for key dates
                // For instance, change the second `true` here to `startDate` if you
                // do _not_ want any date to appear when the project `startDate` is
                // null. Note that you may also need to edit the `statusOutput` call
                // below and also the one in `ProjectDetail.tsx`
                statusOutput(status, true, true, true) !== null && (
                  <div className="mt-4 text-body">
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
              <div className="mb-4 text-body">
                <span className="font-bold">Department or Agency: </span>
                {agency}
              </div>
              {!isEmpty(topics) && (
                <div className="text-tag mt-4">
                  <Feature
                    label="Topics"
                    className="bg-topics"
                    value={topics}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="p-5 pb-1 mt-auto border-t-2 border-solid">
            <button className="btn-wide">
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
  )
}
