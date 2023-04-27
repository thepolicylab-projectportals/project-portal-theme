import React from "react"
import "@testing-library/jest-dom/extend-expect"

import { render, screen } from "@testing-library/react"
import { HeaderWithImage } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

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
