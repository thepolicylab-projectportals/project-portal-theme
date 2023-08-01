import React from "react"
import "@testing-library/jest-dom/extend-expect"

import { screen, render, cleanup } from "@testing-library/react"
import { Card } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

describe("Card renders dates correctly", () => {
  afterEach(cleanup)

  const testProps = {
    slug: "the-title",
    title: "theTitle",
    question: "question?",
    agency: "ccv",
    topics: [],
  }

  it("renders correctly for open projects without a date", () => {
    render(<Card {...testProps} status="open" />)
    expect(screen.getByText("Opportunity closes:")).toBeInTheDocument()
    expect(screen.getByText("Open until filled")).toBeInTheDocument()
  })

  it("renders correctly for 'ongoing' projects without a date", () => {
    render(<Card {...testProps} status="ongoing" />)
    expect(screen.queryByText("Project started:")).not.toBeInTheDocument()
  })

  it("renders correctly for 'completed' projects without a date", () => {
    render(<Card {...testProps} status="completed" />)
    expect(screen.queryByText("Project ended:")).not.toBeInTheDocument()
  })

  it("renders correctly for 'open' projects with a date", () => {
    render(<Card {...testProps} status="open" opportunityCloses="2020-10-10" />)
    expect(screen.getByText("Opportunity closes:")).toBeInTheDocument()
    expect(screen.getByText("October 10, 2020")).toBeInTheDocument()
    expect(screen.queryByText("Open until filled")).not.toBeInTheDocument()
  })

  it("renders correctly for 'ongoing' projects with a date", () => {
    render(<Card {...testProps} status="ongoing" startDate="2020-11-11" />)
    expect(screen.getByText("Project started:")).toBeInTheDocument()
    expect(screen.getByText("November 11, 2020")).toBeInTheDocument()
  })

  it("renders correctly for 'completed' projects with a date", () => {
    render(<Card {...testProps} status="completed" endDate="2020-12-12" />)
    expect(screen.getByText("Project ended:")).toBeInTheDocument()
    expect(screen.getByText("December 12, 2020")).toBeInTheDocument()
  })

  const multipleDates = {
    opportunityCloses: "2020-01-01",
    startDate: "2021-02-02",
    endDate: "2022-03-03",
  }

  it("renders correctly for 'open' projects with multiple dates", () => {
    render(<Card status="open" {...testProps} {...multipleDates} />)
    expect(screen.getByText("Opportunity closes:")).toBeInTheDocument()
    expect(screen.getByText("January 1, 2020")).toBeInTheDocument()
    expect(screen.queryByText("February 2, 2021")).not.toBeInTheDocument()
    expect(screen.queryByText("March 3, 2022")).not.toBeInTheDocument()
  })

  it("renders correctly for 'ongoing' projects with multiple dates", () => {
    render(<Card status="ongoing" {...testProps} {...multipleDates} />)
    expect(screen.getByText("Project started:")).toBeInTheDocument()
    expect(screen.queryByText("January 1, 2020")).not.toBeInTheDocument()
    expect(screen.queryByText("February 2, 2021")).toBeInTheDocument()
    expect(screen.queryByText("March 3, 2022")).not.toBeInTheDocument()
  })

  it("renders correctly for 'completed' projects with multiple dates", () => {
    render(<Card status="completed" {...testProps} {...multipleDates} />)
    expect(screen.getByText("Project ended:")).toBeInTheDocument()
    expect(screen.queryByText("January 1, 2020")).not.toBeInTheDocument()
    expect(screen.queryByText("February 2, 2021")).not.toBeInTheDocument()
    expect(screen.queryByText("March 3, 2022")).toBeInTheDocument()
  })
})
