import React, { FunctionComponent } from "react"

interface FeatureProps {
  label: string
  value: string | string[]
  color: string
}

export const Feature: FunctionComponent<FeatureProps> = ({
  label,
  value,
  color,
}) => {
  let out = null
  if (Array.isArray(value)) {
    out = value.map((item, i) => (
      <Tag key={`${label}_${i}`} color={color}>
        {item}
      </Tag>
    ))
  } else {
    out = <Tag color={color}>{value}</Tag>
  }

  return (
    <>
      <h5 className="font-sans text-black text-sm mb-1 font-extrabold uppercase">
        {label}
      </h5>
      <div className="flex flex-wrap">{out}</div>
    </>
  )
}

const Tag = (props) => (
  <span
    className={`px-3 py-1 mt-1 uppercase text-sm whitespace-nowrap font-semibold bg-${props.color} mr-2`}
  >
    {props.children}
  </span>
)
