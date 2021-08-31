import { Link } from "gatsby"
import React, { FunctionComponent } from "react"
import { Feature } from "."
import { ProjectStatus } from "./ProjectStatus"

export interface CardProps {
  question: string
  slug: string
  status: string
  summary: string
  deliverable: string
  expertise: string
  timeline: string
  commitment: string
  contact: string
  collaborationType: string[]
  navigation: {
    current: number
    items: string[]
  }
}

export const Card: FunctionComponent<CardProps> = ({
  question,
  slug,
  status,
  summary,
  deliverable,
  expertise,
  timeline,
  commitment,
  contact,
  navigation,
  collaborationType,
}) => {
  return (
    <div className="bg-white h-full shadow-sm rounded-md overflow-hidden">
      <Link to={`/${slug}`} state={{ navigation }}>
        <div className="mt-4 ml-4">
          <ProjectStatus status={status} />
        </div>
        <div className="p-5 pb-5">
          <h1 className="text-2xl text-black font-bold leading-snug pb-4">
            {question}
          </h1>
          <Feature label="Collaboration type" value={collaborationType} />
          <button className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded text-sm py-3">
            View Opportunity
          </button>
        </div>
        <div className="p-5 pb-1 border-solid border-t-2">
          <div className="grid grid-cols-2">
            <div>IMAGE</div>
            <div>
              <Feature label="Opportunity closes" value={timeline} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
