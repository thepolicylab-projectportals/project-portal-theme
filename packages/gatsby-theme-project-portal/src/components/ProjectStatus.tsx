import React, { FunctionComponent } from "react"
import { FaCircle, FaPlayCircle, FaCheckCircle } from "react-icons/fa"

interface ProjectStatusProps {
  status: string
}

export const ProjectStatus: FunctionComponent<ProjectStatusProps> = ({
  status,
}) => {
  let Icon = null
  let text: string = null
  if (status == "open") {
    Icon = FaCircle
    text = "Open"
  } else if (status == "ongoing") {
    Icon = FaPlayCircle
    text = "In progress"
  } else if (status == "completed") {
    Icon = FaCheckCircle
    text = "Completed"
  }

  return (
    <>
      <div className="flex w-full">
        <span className="pt-1 text-body text-primary align-inherit">
          <Icon />
        </span>
        <span className="pl-2 uppercase">{text}</span>
      </div>
    </>
  )
}
