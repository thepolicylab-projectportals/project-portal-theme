import React from "react"
import "@testing-library/jest-dom/extend-expect"

import { render, screen } from "@testing-library/react"
import {
  ProjectStatus,
  HeaderWithImage,
  DevelopmentBanner,
} from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

describe("test DevelopmentBanner Component", () => {
  test("Should render development banner component", () => {
    const component = render(<DevelopmentBanner />)
    expect(component.container).toMatchSnapshot()
  })
})
