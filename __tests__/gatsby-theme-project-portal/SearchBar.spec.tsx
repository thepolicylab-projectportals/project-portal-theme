import React from "react"
import { render, fireEvent, getByText } from "@testing-library/react"

import { SearchBar } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

describe("SearchBar", () => {
  const onChange = jest.fn()

  it("renders label and input elements with the correct props", () => {
    const { getByLabelText, getByText } = render(
      <SearchBar
        label="Test Label"
        onChange={onChange}
        id={"search"}
        placeholder={"Type to filter posts..."}
      />
    )
    //looking for text set to "Test Label"
    expect(getByText("Test Label")).toBeInTheDocument()
    //looking for input element with an aria-label attribute set to "Search"
    expect(getByLabelText("Search")).toBeInTheDocument()
  })

  it("calls the onChange callback when the input value changes", () => {
    const { getByLabelText } = render(
      <SearchBar
        label="Test Label"
        onChange={onChange}
        id={"search"}
        placeholder={"Type to filter posts..."}
      />
    )
    //fireEvent.change to simulate the input value change
    //trigger's a change event on the input element
    //onChange = jest.fn() this creates a mock implementation of onChange
    //allows us to track whether the onChange prop is called with expected arguments.
    fireEvent.change(getByLabelText("Search"), { target: { value: "test" } })
    expect(onChange).toHaveBeenCalled()
  })

  it("renders the input placeholder correctly", () => {
    const { getByPlaceholderText } = render(
      <SearchBar
        label="Test Label"
        onChange={onChange}
        id={"search"}
        placeholder={"Type to filter posts..."}
      />
    )
    //check placeholder text
    expect(getByPlaceholderText("Type to filter posts...")).toBeInTheDocument()
  })

  it("sets the aria-label attribute to the correct value", () => {
    const { getByLabelText } = render(
      <SearchBar
        label="Test Label"
        onChange={onChange}
        id={"search"}
        placeholder={"Type to filter posts..."}
      />
    )
    //checks  that aria-label is set correctly
    expect(getByLabelText("Search")).toHaveAttribute("aria-label", "Search")
  })

  it("applies the correct CSS classes to the input element", () => {
    const { getByLabelText } = render(
      <SearchBar
        label="Test Label"
        onChange={onChange}
        id={"search"}
        placeholder={"Type to filter posts..."}
      />
    )
    //checks that tailwind styling is correct
    expect(getByLabelText("Search")).toHaveClass(
      "rounded",
      "border-gray-300",
      "hover:border-gray-400"
    )
  })

  it("sets the htmlFor attribute on the label element", () => {
    const { getByText } = render(
      <SearchBar
        label="Test Label"
        onChange={onChange}
        id={"search"}
        placeholder={"Type to filter posts..."}
      />
    )
    //check rendered component has attribute id = search-label
    expect(getByText("Test Label")).toHaveAttribute("id", "search-label")
  })

  it("applies the style prop correctly to the input element", () => {
    const { getByLabelText } = render(
      <SearchBar
        label="Test Label"
        onChange={onChange}
        id={"search"}
        placeholder={"Type to filter posts..."}
      />
    )
    expect(getByLabelText("Search")).toHaveStyle({ height: "62%" })
  })
})
