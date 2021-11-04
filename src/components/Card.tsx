import { Link } from "gatsby"
import React, { FunctionComponent } from "react"
import { Feature } from "."
import { ProjectStatus } from "./ProjectStatus"

export interface CardProps {
  question: string
  partnerName: string
  slug: string
  summary: string
  status: string
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
  supportNeeded,
  agency,
  endDate,
  navigation,
}) => {
  return (
    <div className="bg-white shadow-sm rounded-md overflow-hidden border border-gray-200 py-4 px-2">
      <Link to={`/project/${slug}`} state={{ navigation }}>
        <div className="mt-4 ml-4">
          <ProjectStatus status={status} />
        </div>
        <div className="p-5 pb-5">
          <h1 className="text-2xl text-black font-bold leading-snug pb-4">
            {question}
          </h1>
          <div className="text-md mt-4">
            <span className="font-bold">Opportunity closes: </span>
            {endDate}
          </div>
          <div className="text-md mb-4">
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
          <div className="mt-4">
            <Feature
              label="Support Needed"
              color="purple-200"
              value={supportNeeded}
            />
          </div>
        </div>
        <div className="p-5 pb-1 border-solid border-t-2">
          <button className="bg-rust-500 hover:bg-rust-200 text-white font-bold py-2 px-4 w-full rounded text-sm py-3">
            View Opportunity
          </button>
        </div>
      </Link>
    </div>
  )
}
