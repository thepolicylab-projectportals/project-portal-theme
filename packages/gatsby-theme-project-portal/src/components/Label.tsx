import React, { FunctionComponent } from "react"

interface LabelProps {
  id: string
  label: string
}

export const Label: FunctionComponent<LabelProps> = ({ id, label }) => {
  return (
    <>
      <label id={`${id}-label`} className="font-bold p-1" htmlFor={id}>
        {label}
      </label>
    </>
  )
}
