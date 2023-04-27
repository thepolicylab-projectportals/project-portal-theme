import React from "react"
import "@testing-library/jest-dom/extend-expect"

import { render } from "@testing-library/react"
import { ProjectStatus } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

describe("Test if the ProjectStatus component is working as expected", () => {
  it("<ProjectStatus /> matches snapshot", () => {
    const component = render(
      <ProjectStatus data-testid="footer-copyright" status="open" />
    )
    expect(component.container).toMatchSnapshot()
  })
  // --> Test will pass
})
