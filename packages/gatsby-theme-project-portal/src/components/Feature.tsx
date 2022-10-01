import React, { FunctionComponent } from "react"

interface FeatureProps {
  label: string
  value: string | string[]
  className: string
}

export const Feature: FunctionComponent<FeatureProps> = ({
  label,
  value,
  className,
}) => {
  let out = null
  if (Array.isArray(value)) {
    out = value.map((item, i) => (
      <Tag key={`${label}_${i}`} className={className}>
        {item}
      </Tag>
    ))
  } else {
    out = <Tag className={className}>{value}</Tag>
  }

  return (
    <>
      <h5 className="font-sans text-black text-tag mb-1 font-extrabold uppercase">
        {label}
      </h5>
      <div className="text-tag flex flex-wrap">{out}</div>
    </>
  )
}

interface TagProps {
  className: string
  children: string
}

const Tag: FunctionComponent<TagProps> = ({ className, children }) => (
  <span
    className={`px-3 py-1 mt-1 uppercase text-tag whitespace-nowrap font-semibold mr-2 ${className}`}
  >
    {children}
  </span>
)
