import React, { FunctionComponent } from "react"

interface SearchBarProps {
  label: string
  onChange: any
}

export const SearchBar: FunctionComponent<SearchBarProps> = ({
  label,
  onChange,
}) => {
  return (
    <>
      <label id="search-label" className="font-bold" htmlFor="filter">
        {label}
      </label>
      <input
        className="rounded border-gray-300 hover:border-gray-400"
        style={{ height: "62%" }}
        type="text"
        aria-label="Search"
        placeholder="Type to filter posts..."
        onChange={onChange}
      />
    </>
  )
}
