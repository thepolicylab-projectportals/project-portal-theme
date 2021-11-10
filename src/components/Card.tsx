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
    <div className="px-2 py-4 overflow-hidden bg-white border border-gray-200 rounded-md shadow-sm">
      <Link to={`/project/${slug}`} state={{ navigation }}>
        <div className="flex flex-col h-full">
          <div className="mt-4 ml-4">
            <ProjectStatus status={status} />
          </div>
          <div className="p-5 pb-5">
            <h1 className="pb-4 text-2xl font-bold leading-snug text-black">
              {question}
            </h1>
            <div>
              <div className="mt-4 text-md">
                <span className="font-bold">Opportunity closes: </span>
                {endDate}
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
              <div className="mt-4">
                <Feature
                  label="Support Needed"
                  color="purple-200"
                  value={supportNeeded}
                />
              </div>
            </div>
          </div>
          <div className="p-5 pb-1 mt-auto border-t-2 border-solid">
            <button className="w-full px-4 py-3 text-sm font-bold text-white rounded bg-rust-500 hover:bg-rust-800">
              View Opportunity
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
