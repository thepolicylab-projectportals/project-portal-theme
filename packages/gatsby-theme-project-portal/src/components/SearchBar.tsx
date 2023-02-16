import React, {ChangeEventHandler, FunctionComponent} from "react"

interface SearchBarProps {
  label: string
  handleInputChange: ChangeEventHandler<HTMLInputElement>
}

export const SearchBar: FunctionComponent<SearchBarProps> = ({
  label,
  handleInputChange,
}) => {
  return (
    <>
      <label id="search-label" className="font-bold" htmlFor="filter">
        {label}
      </label>
      <input
        className="rounded border-neutral-300"
        style={{height: "62%"}}
        type="text"
        aria-label="Search"
        placeholder="Type to filter posts..."
        onChange={handleInputChange}
      />
    </>
  )
}
