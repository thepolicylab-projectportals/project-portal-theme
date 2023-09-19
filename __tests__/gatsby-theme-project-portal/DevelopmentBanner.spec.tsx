import React from "react"
import "@testing-library/jest-dom"

import { render, screen } from "@testing-library/react"
import { DevelopmentBanner } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

describe("test DevelopmentBanner Component", () => {
  test("Should render development banner component", () => {
    const component = render(<DevelopmentBanner />)
    expect(component.container).toMatchSnapshot()
  })

  it("renders with the correct text and link", () => {
    const { getByText } = render(<DevelopmentBanner />)
    //checks that correct text is rendered
    const textElement = getByText(/This is a beta site\./)
    expect(textElement).toBeInTheDocument()
    const linkElement = getByText("We welcome feedback!")
    expect(linkElement).toHaveAttribute("href", "/contact")
  })

  it("renders a link to the contact page", () => {
    const { getByText } = render(<DevelopmentBanner />)
    const link = getByText("We welcome feedback!")
    expect(link).toBeInTheDocument()
    //checks that link text is rendered and that it is a link to "/contact"
    expect(link.getAttribute("href")).toEqual("/contact")
  })

  it("applies the correct styles to the banner", () => {
    const { getByText } = render(<DevelopmentBanner />)
    const banner = getByText(/This is a beta site\./).parentElement
    //tailwind styling
    expect(banner).toHaveClass("py-6 overflow-hidden bg-warning text-center")
  })
})
