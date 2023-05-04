import React from "react"
import "@testing-library/jest-dom/extend-expect"

import { render, screen } from "@testing-library/react"
import { HeaderWithImage } from "@thepolicylab-projectportals/gatsby-theme-project-portal/src/components"

describe("test HeaderWithImage Component", () => {
  const testProps = {
    title: "Test Title",
    lede: "Test Lede",
    imageSrc: "./__tests__/__testImages__/default-icon.png",
  }

  // it("Should render lede and title text", () => {
  //   render(
  //     <HeaderWithImage
  //       lede={testProps.lede}
  //       title={testProps.title}
  //       imageSrc={testProps.imageSrc}
  //     />
  //   )
  //
  //   expect(screen.getByText("test lede")).toBeTruthy()
  //   expect(screen.getByText("test title")).toBeTruthy()
  // })

  it("renders with correct props", () => {
    const { getByText } = render(<HeaderWithImage {...testProps} />)
    expect(getByText(testProps.title)).toBeInTheDocument()
    expect(getByText(testProps.lede)).toBeInTheDocument()
  })

  it("does not render image element", () => {
    const { queryByAltText } = render(<HeaderWithImage {...testProps} />)
    expect(queryByAltText("header image")).toBeNull()
  })

  it("applies the image as a background", () => {
    const { container } = render(<HeaderWithImage {...testProps} />)
    const backgroundImage = container.style._values["backgroundImage"]
    expect(backgroundImage).toEqual(`url(${testProps.imageSrc})`)
  })

  // it("matches the snapshot", () => {
  //   const { container } = render(
  //     <HeaderWithImage
  //       lede="test lede"
  //       title="test title"
  //       imageSrc={"./__tests__/__testImages__/default-icon.png"}
  //     />
  //   )
  //   expect(container).toMatchSnapshot()
  //   const testImage
  //   -l[]= document.querySelector("img") as HTMLImageElement
  //   expect(testImage.src).toContain(
  //     "./__tests__/__testImages__/default-icon.png"
  //   )
  // })
})
