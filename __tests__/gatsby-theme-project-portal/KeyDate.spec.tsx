import React from "react"
import "@testing-library/jest-dom/extend-expect"

import {screen, render, cleanup} from "@testing-library/react"
import {
    KeyDate
} from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components";

describe("KeyDate renders correctly for 'open' projects", () => {
  afterEach(cleanup)

  it("renders correctly for open projects without a date", () => {
    render(<KeyDate status="open"/>);
    expect(screen.getByText("Opportunity closes:")).toBeInTheDocument()
    expect(screen.getByText("Open until filled")).toBeInTheDocument()
  })

  it("renders correctly for open projects with a date", () => {
    render(<KeyDate status="open" opportunityCloses="2020-10-10"/>);
    expect(screen.getByText("Opportunity closes:")).toBeInTheDocument()
    expect(screen.getByText("October 10, 2020")).toBeInTheDocument()
    expect(screen.queryByText("Open until filled")).not.toBeInTheDocument()
  })

  it("renders correctly for open projects with multiple dates", () => {
    render(<KeyDate status="open" opportunityCloses="2020-01-01" startDate="2021-02-02"
                    endDate="2022-03-03"/>);
    expect(screen.getByText("Opportunity closes:")).toBeInTheDocument()
    expect(screen.getByText("January 1, 2020")).toBeInTheDocument()
    expect(screen.queryByText("February 2, 2021")).not.toBeInTheDocument()
    expect(screen.queryByText("March 3, 2022")).not.toBeInTheDocument()
  })
})

describe("KeyDate renders correctly for 'ongoing' projects", () => {
  afterEach(cleanup)

  it("renders correctly for 'ongoing' projects with a date", () => {
    render(<KeyDate status="ongoing" startDate="2021-02-02"/>);
    expect(screen.getByText("Project started:")).toBeInTheDocument()

    expect(screen.getByText("Project started:")).toBeInTheDocument()
    expect(screen.getByText("February 2, 2021")).toBeInTheDocument()
  })

  it("renders correctly for 'ongoing' projects with multiple dates", () => {
    render(<KeyDate status="ongoing" opportunityCloses="2020-01-01" startDate="2021-02-02"
                    endDate="2022-03-03"/>);
    expect(screen.getByText("Project started:")).toBeInTheDocument()
    expect(screen.getByText("February 2, 2021")).toBeInTheDocument()

    expect(screen.queryByText("January 1, 2020")).not.toBeInTheDocument()
    expect(screen.queryByText("March 3, 2022")).not.toBeInTheDocument()
  })

  it("renders nothing for 'ongoing' projects without a date", () => {
    render(<KeyDate status="ongoing"/>);
    expect(screen.queryByText("Project started:")).not.toBeInTheDocument()
  })
})

describe("KeyDate renders correctly for 'completed' projects", () => {
  afterEach(cleanup)

  it("renders correctly for 'completed' projects with a date", () => {
    render(<KeyDate status="completed" endDate="2022-03-03"/>);
    expect(screen.getByText("Project ended:")).toBeInTheDocument()
    expect(screen.getByText("March 3, 2022")).toBeInTheDocument()
  })

  it("renders correctly for 'completed' projects with multiple dates", () => {
    render(<KeyDate status="completed" opportunityCloses="2020-01-01" startDate="2021-02-02"
                    endDate="2022-03-03"/>);
    expect(screen.getByText("Project ended:")).toBeInTheDocument()
    expect(screen.getByText("March 3, 2022")).toBeInTheDocument()

    expect(screen.queryByText("January 1, 2020")).not.toBeInTheDocument()
    expect(screen.queryByText("February 2, 2021")).not.toBeInTheDocument()
  })

  it("renders nothing for 'completed' projects without a date", () => {
    render(<KeyDate status="completed"/>);
    expect(screen.queryByText("Project ended:")).not.toBeInTheDocument()
  })
})
