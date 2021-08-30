import { Link } from "gatsby-plugin-modal-routing"
import React, { FunctionComponent } from "react"
import { Feature } from "."
import { ProjectStatus } from "./ProjectStatus"

export interface CardProps {
  question: string
  slug: string
  summary: string
  deliverable: string
  expertise: string
  timeline: string
  commitment: string
  contact: string
  collaborationType: string
  navigation: {
    current: number
    items: string[]
  }
}

export const Card: FunctionComponent<CardProps> = ({
  question,
  slug,
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
    <div className="bg-white dark:bg-blue-900 h-full shadow-sm rounded-md overflow-hidden hover:bg-blue-100 dark:hover:bg-blue-800">
      <Link to={`/${slug}`} state={{ navigation }} asModal>
        <div className="mt-4 ml-4">
          <ProjectStatus status="open" />
        </div>
        <div className="p-5 pb-1">
          <h1 className="text-2xl text-blue-500 dark:text-blue-300 font-bold leading-snug">
            {question}
          </h1>
          <Feature label="Timeline" value={timeline} />
          <Feature label="Collaboration type" value={collaborationType} />
        </div>
      </Link>
    </div>
  )
}
