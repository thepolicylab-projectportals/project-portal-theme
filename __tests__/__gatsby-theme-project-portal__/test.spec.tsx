import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { getPageQueryData } from "gatsby-plugin-testing"

import { render, screen } from "@testing-library/react"
import {
  ProjectStatus,
  HeaderWithImage,
  DevelopmentBanner,
} from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

// You have to write data-testid

// const Title = () => <h1 data-testid="hero-title">Gatsby is awesome!</h1>
// const ProjectStatusTest = () => (
//   <ProjectStatus data-testid="test-title" status={"open"} />
// )
// test("Displays the correct title", () => {
//   const { getByTestId } = render(<ProjectStatusTest />)

// Assertion

//expect(getByTestId("test-title")).toHaveTextContent("Gatsby is awesome!")
describe("Test if the ProjectStatus component is working as expected", () => {
  it("<ProjectStatus /> matches snapshot", () => {
    const component = render(
      <ProjectStatus data-testid="footer-copyright" status="open" />
    )
    expect(component.container).toMatchSnapshot()
  })
  // --> Test will pass
})

describe("test HeaderWithImage Component", () => {
  test("should render year if post is from 2019", () => {
    render(
      <HeaderWithImage
        lede="test lede"
        title="test title"
        imageSrc={"./__tests__/__testImages__/default-icon.png"}
      />
    )
    // const testImage = document.querySelector("img") as HTMLImageElement
    // expect(testImage.alt).toContain(
    //   "./__tests__/__testImages__/default-icon.png"
    // )
    expect(screen.getByText("test lede")).toBeTruthy()
    expect(screen.getByText("test title")).toBeTruthy()
  })
})

describe("test DevelopmentBanner Component", () => {
  test("should render year if post is from 2019", () => {
    const component = render(<DevelopmentBanner />)
    expect(component.container).toMatchSnapshot()
  })
})
