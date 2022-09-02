"use strict"

require("source-map-support").install()

const createPagesModule = require("./src/hooks/createPages")

exports.createPages = createPagesModule.createPages
exports.onCreatePage = createPagesModule.onCreatePage

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes, createFieldExtension } = actions

  createFieldExtension({
    name: "shout",
    extend: () => ({
      resolve(source, args, context, info) {
        return String(source[info.fieldName]).toUpperCase()
      },
    }),
  })

  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      question: String
      partnerName: String
      slug: String
      status: String
      agency: String
      topics: [String]
      supportNeeded: [String]
      summary: String
      deliverable: String
      purpose: String
      expertise: String
      requirement: String
      keyDates: String
      statusOfData: String
      priorResearch: String
      fundingInfo: String
      emailContent: String
      email: String
      lastModified: Date @dateformat
      opportunityCloses: Date @dateformat
      startDate: Date @dateformat
      endDate: Date @dateformat
      applicationProcess: String
      collaborationType: [String]
      commitment: String
    }
  `
  createTypes(typeDefs)
}
