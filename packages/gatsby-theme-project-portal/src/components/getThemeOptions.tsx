import { useStaticQuery, graphql } from "gatsby"

type ContrastTypes = "AA" | "AAA"

type specimensOptionsType = {
  specimensConfig: {
    contrastGuidelines: ContrastTypes
    CMYK: boolean
    codeExample: boolean
    rootFontSize: number
  }
}

// export const getThemeOptions = () => {
//   const data = useStaticQuery<specimensOptionsType>(graphql`
//     query {
//       specimensConfig(id: { eq: "@lekoarts/gatsby-theme-specimens-config" }) {
//         contrastGuidelines
//         CMYK
//         codeExample
//         rootFontSize
//       }
//     }
//   `)
//
//   return data.specimensConfig
// }
//
// export getThemeOptions

export const getThemeOptions = 1
