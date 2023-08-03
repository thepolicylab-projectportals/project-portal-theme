import { IGatsbyImageData, Layout } from "gatsby-plugin-image"

export const emptyGatsbyImageData: IGatsbyImageData = {
  // placeholder object for image whilst gatsby image
  layout: "fixed",
  width: 0,
  height: 0,
  images: { sources: [] },
}

export function loadImage(
  source: string,
  width?: number,
  height?: number,
  layout?: Layout
): IGatsbyImageData {
  return {
    layout: layout,
    images: {
      fallback: {
        src: source,
      },
      sources: [],
    },
    width: width,
    height: height,
  }
}
