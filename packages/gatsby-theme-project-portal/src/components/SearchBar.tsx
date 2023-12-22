import React, { FunctionComponent } from "react"
import { Label } from "./Label"

interface SearchBarProps {
  id: string
  label: string
  onChange: any
  placeholder: string
  autoFocus?: boolean
  defaultVal: string[] | null
}

export const SearchBar: FunctionComponent<SearchBarProps> = ({
  id,
  label,
  onChange,
  placeholder,
  autoFocus,
                                                               defaultVal
}) => {
  return (
    <>
      <Label id={id} label={label} />
      <input
        autoFocus={autoFocus}
        className="rounded border-gray-300 hover:border-gray-400"
        style={{ height: "62%" }}
        type="text"
        id={id}
        aria-label="Search"
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={defaultVal || undefined}
      />
    </>
  )
}
