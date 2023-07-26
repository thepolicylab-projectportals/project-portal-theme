import { IGatsbyImageData } from "gatsby-plugin-image"

export const emptyGatsbyImageData: IGatsbyImageData = {
  // placeholder object for image whilst gatsby image
  layout: "fixed",
  width: 0,
  height: 0,
  images: { sources: [] },
}
export const statusArgType = {
  status: {
    options: ["open", "ongoing", "completed"],
    control: { type: "radio" },
  },
}
