import React from "react"
import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"
import { HeaderWithImage } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

describe("test HeaderWithImage Component", () => {
  const testProps = {
    title: "Test Title",
    lede: "Test Lede",
    imageSrc: "./__tests__/__testImages__/default-icon.png",
  }

  it("renders with correct props", () => {
    const { getByText } = render(<HeaderWithImage {...testProps} />)
    expect(getByText(testProps.title)).toBeInTheDocument()
    expect(getByText(testProps.lede)).toBeInTheDocument()
  })

  it("does not render image element", () => {
    const { queryByAltText } = render(<HeaderWithImage {...testProps} />)
    expect(queryByAltText("header image")).toBeNull()
  })
})
