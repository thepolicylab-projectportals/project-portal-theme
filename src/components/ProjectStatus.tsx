import React, { FunctionComponent } from "react"
import { FaCircle } from "react-icons/fa"

interface ProjectStatusProps {
  status: string
}

export const ProjectStatus: FunctionComponent<ProjectStatusProps> = ({
  status,
}) => {
  let Icon = status == "open" ? FaCircle : FaCircle
  let text: string = null
  if (status == "open") {
    text = "Open"
  } else if (status == "inProgress") {
    text = "In progress"
  } else if (status == "complete") {
    text = "Complete"
  }

  return (
    <>
      <div className="flex w-full">
        <span className="text-blue-800 align-inherit pt-1 text-sm">
          <Icon />
        </span>
        <span className="pl-2 uppercase">{text}</span>
      </div>
    </>
  )
}
