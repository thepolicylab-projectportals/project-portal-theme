import React, { FunctionComponent } from "react"

interface ProjectContactProps {
  name: string
  title: string
  email: string
}

export const ProjectContact: FunctionComponent<ProjectContactProps> = ({
  name,
  title,
  email,
}) => {
  return (
    <>
      <h2 className="text-lg font-bold pb-2">Project contact</h2>
      <div className="flex flex-wrap">
        <div className="w-1/4">IMAGE</div>
        <div className="w-3/4">
          <h4 className="font-bold text-md">{name}</h4>
          <p className="text-sm">{title}</p>
          <p className="text-sm">{email}</p>
        </div>
      </div>
    </>
  )
}
