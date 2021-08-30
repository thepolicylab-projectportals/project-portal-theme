import React, { FunctionComponent } from "react"

interface FeatureProps {
  label: string
  value: string | string[]
  truncate?: boolean
}

export const Feature: FunctionComponent<FeatureProps> = ({
  label,
  value,
  truncate,
}) => {
  let out = null
  let className =
    truncate === undefined || truncate === null || truncate
      ? "truncate"
      : "leading-normal"
  if (typeof value === "string") {
    if (value.startsWith("http") || value.startsWith("mailto")) {
      out = (
        <div className={className}>
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400 hover:text-blue-700 transition-colors duration-200"
          >
            {value}
          </a>
        </div>
      )
    } else {
      out = <div className={className}>{value}</div>
    }
  } else if (Array.isArray(value)) {
    out = value.map((item, i) => (
      <span key={`${label}_${i}`} className="inline-block mr-4 break-normal">
        {item}
      </span>
    ))
  }

  return (
    <>
      <h4 className="text-blue-800 dark:text-blue-400 uppercase text-xxs tracking-wide font-medium pb-px">
        {label}
      </h4>
      <div className="font-medium text-blue-800 dark:text-blue-400 text-base leading-loose mb-4">
        {out}
      </div>
    </>
  )
}
