import React, {
  ChangeEventHandler,
  Dispatch,
  FunctionComponent,
  SetStateAction,
} from "react"

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
        className="rounded border-grayTPL-300 hover:border-grayTPL-400"
        style={{ height: "62%" }}
        type="text"
        aria-label="Search"
        placeholder="Type to filter posts..."
        onChange={onChange}
      />
    </>
  )
}
