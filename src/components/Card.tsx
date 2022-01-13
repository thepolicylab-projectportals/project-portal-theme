import { Link } from "gatsby"
import React, { FunctionComponent } from "react"
import { Feature } from "."
import { ProjectStatus } from "./ProjectStatus"
import { statusOutput } from "../utils"
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
  policyAreas: string[]
  deliverable: string
  purpose: string
  expertise: string
  requirement: string
  keyDates: string
  priorResearch: string
  statusOfData: string
  fundingInfo: string
  commitment: string
  navigation: {
    current: number
    items: string[]
  }
}

export const Card: FunctionComponent<CardProps> = ({
  question,
  slug,
  status,
  policyAreas,
  agency,
  opportunityCloses,
  startDate,
  endDate,
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
            <div className="pb-4 text-2xl font-bold leading-snug text-black">
              {question}
            </div>
            <div>
              <div className="mt-4 text-md">
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
              <div className="mb-4 text-md">
                <span className="font-bold">Agency: </span>
                {agency}
              </div>
              <div className="mt-4">
                <Feature
                  label="Policy Areas"
                  color="blue-200"
                  value={policyAreas}
                />
              </div>
            </div>
          </div>
          <div className="p-5 pb-1 mt-auto border-t-2 border-solid">
            <button className="btn-wide">View opportunity</button>
          </div>
        </div>
      </Link>
    </div>
  )
}
