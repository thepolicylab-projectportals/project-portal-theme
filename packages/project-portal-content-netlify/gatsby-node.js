const fs = require("fs")

const {
  PROJECT_NODE_TYPE,
  CONTACT_NODE_TYPE,
} = require("@thepolicylab-projectportals/gatsby-theme-project-portal/utils/types")
const { withDefaults } = require("./utils/default-options")

// These parameters must match the types which gatsby-transformer-json _implicitly_
// creates for the "Project" and "Contact" types.
// If in doubt, check the GraphQL and look at the internal.type field of the
// nodes created by the gatsby-transformer-json. Modify these parameters
// to match.
const PROJECT_JSON_TYPE = `ProjectJson`
const CONTACT_JSON_TYPE = `ContactJson`

exports.onPreInit = () => {
  console.log("starting project-portal-content-netlify plugin")
}

exports.onPreBootstrap = ({ reporter }, pluginOptions) => {
  console.log(withDefaults(pluginOptions))

  const { projectPath, contactPath } = withDefaults(pluginOptions)
  const paths = [projectPath, contactPath]

  paths.forEach((path) => {
    if (!fs.existsSync(path)) {
      reporter.info(`creating the ${path} directory`)
      fs.mkdirSync(path, { recursive: true })
    }
  })
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const typeDefs = [
    schema.buildObjectType({
      name: PROJECT_JSON_TYPE,
      interfaces: ["Node", PROJECT_NODE_TYPE],
      fields: {
        slug: "String!",
        question: "String",
        status: "String",
        opportunityCloses: {
          type: "Date",
          extensions: {
            dateformat: {},
          },
        },
        startDate: {
          type: "Date",
          extensions: {
            dateformat: {},
          },
        },
        endDate: {
          type: "Date",
          extensions: {
            dateformat: {},
          },
        },

        agency: "String",
        topics: "[String]",

        summary: "String",
        deliverable: "String",
        purpose: "String",
        expertise: "String",
        requirement: "String",
        keyDates: "String",
        statusOfData: "String",
        priorResearch: "String",
        fundingInfo: "String",
        emailContent: "String",

        lastModified: {
          type: "Date",
          extensions: {
            dateformat: { formatString: "YYYY-MM-DDTHH:mm:ss.SSSZ" },
          },
        },

        mainContact: {
          type: CONTACT_NODE_TYPE,
          resolve: async (source, args, context) => {
            return await context.nodeModel.findOne({
              type: CONTACT_JSON_TYPE,
              query: {
                filter: { key: { eq: source.mainContact } },
              },
            })
          },
        },
        projectTeam: {
          type: [CONTACT_JSON_TYPE],
          resolve: async (source, args, context) => {
            const { entries } = await context.nodeModel.findAll({
              type: CONTACT_JSON_TYPE,
              query: {
                filter: { key: { in: source.projectTeam ?? [] } },
              },
            })
            return entries
          },
        },
      },
    }),
    schema.buildObjectType({
      name: CONTACT_JSON_TYPE,
      interfaces: ["Node", CONTACT_NODE_TYPE],
      fields: {
        key: "String!",
        email: "String",
        name: "String",
        employer: "String",
        title: "String",
        image: {
          type: "File",
          resolve: async (source, args, context) => {
            return await context.nodeModel.findOne({
              type: "File",
              query: {
                filter: {
                  relativePath: { eq: source.image },
                  sourceInstanceName: { eq: "contact" },
                },
              },
            })
          },
        },
      },
    }),
  ]
  createTypes(typeDefs)
}
