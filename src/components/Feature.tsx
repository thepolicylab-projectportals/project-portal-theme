import React, { FunctionComponent } from "react"

interface FeatureProps {
  label: string
  value: string | string[]
}

export const Feature: FunctionComponent<FeatureProps> = ({ label, value }) => {
  let out = null
  if (Array.isArray(value)) {
    out = value.map((item, i) => (
      <span
        key={`${label}_${i}`}
        className="bg-blue-200 px-2 inline-block mr-4 uppercase text-sm"
      >
        {item}
      </span>
    ))
  } else {
    out = value
  }

  return (
    <>
      <h4 className="text-black uppercase text-xs font-bold pb-px">{label}</h4>
      <div className="text-black text-sm leading-loose mb-4">{out}</div>
    </>
  )
}
