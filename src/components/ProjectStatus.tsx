import React, { FunctionComponent } from "react"

interface ProjectStatusProps {
  status: string
}

export const ProjectStatus: FunctionComponent<ProjectStatusProps> = ({
  status,
}) => {
  let color: string = null
  let text: string = null
  if (status == "open") {
    color = "green-200"
    text = "Open"
  } else if (status == "in progress") {
    color = "blue-200"
    text = "In progress"
  }

  let className = `py-1 px-2 shadow-md no-underline rounded-full bg-${color} text-black font-sans font-semibold text-sm border-blue btn-primary hover:text-white focus:outline-none active:shadow-none mr-2`

  return (
    <>
      <button className={className}>{text}</button>
    </>
  )
}
