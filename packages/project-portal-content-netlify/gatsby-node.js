const fs = require("fs")

const {
  PROJECT_NODE_TYPE,
  CONTACT_NODE_TYPE,
  TOPIC_NODE_TYPE,
  STATIC_TEXT_NODE_TYPE,
  PAGE_NODE_TYPE,
  CARD_FILTER_TYPE,
  TITLE_AND_TEXT_TYPE,
} = require("@thepolicylab-projectportals/gatsby-theme-project-portal/utils/types")
const { withDefaults } = require("./utils/default-options")
const { createFilePath } = require("gatsby-source-filesystem")
const lodash = require("lodash")
const defaultStaticText = require("@thepolicylab-projectportals/gatsby-theme-project-portal/utils/default-static-text.json")
const path = require("path")

// These parameters must match the types which gatsby-transformer-json _implicitly_
// creates for the "Project" and "Contact" types.
// If in doubt, check the GraphQL and look at the internal.type field of the
// nodes created by the gatsby-transformer-json. Modify these parameters
// to match.
const PROJECT_JSON_TYPE = `ProjectJson`
const CONTACT_JSON_TYPE = `ContactJson`
const TOPIC_JSON_TYPE = `TopicJson`
const PAGE_JSON_TYPE = `PageJson`

exports.onPreBootstrap = ({ reporter }, pluginOptions) => {
  const { projectPath, contactPath, topicPath } = withDefaults(pluginOptions)
  const paths = [projectPath, contactPath, topicPath]

  paths.forEach((path) => {
    if (!fs.existsSync(path)) {
      reporter.info(`creating the ${path} directory`)
      fs.mkdirSync(path, { recursive: true })
    }
  })
}

exports.createSchemaCustomization = ({ actions, schema, getNode }) => {
  const { createTypes } = actions

  const typeDefs = [
    schema.buildObjectType({
      name: PROJECT_JSON_TYPE,
      interfaces: ["Node", PROJECT_NODE_TYPE],
      fields: {
        slug: {
          type: "String!",
          resolve: (node) => createFilePath({ node, getNode }).slice(1, -1),
        },
        title: "String!",
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
        topics: {
          type: [TOPIC_NODE_TYPE],
          resolve: async (source, args, context) => {
            const { entries } = await context.nodeModel.findAll({
              type: TOPIC_JSON_TYPE,
              query: {
                filter: { slug: { in: source.topics ?? [] } },
              },
            })
            return entries
          },
        },

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

        created: {
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
                filter: { slug: { eq: source.mainContact } },
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
                filter: { slug: { in: source.projectTeam ?? [] } },
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
        slug: {
          type: "String!",
          resolve: (node) => {
            return createFilePath({ node, getNode }).slice(1, -1)
          },
        },
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
    schema.buildObjectType({
      name: TOPIC_JSON_TYPE,
      interfaces: ["Node", TOPIC_NODE_TYPE],
      fields: {
        slug: {
          type: "String!",
          resolve: (node) => {
            return createFilePath({ node, getNode }).slice(1, -1)
          },
        },
        title: "String",
      },
    }),
    schema.buildObjectType({
      name: PAGE_JSON_TYPE,
      interfaces: ["Node", PAGE_NODE_TYPE],
      fields: {
        slug: {
          type: "String!",
          resolve: (node) => {
            return createFilePath({ node, getNode }).slice(1, -1)
          },
        },
        filter: {
          type: CARD_FILTER_TYPE,
        },
        faq: {
          type: [TITLE_AND_TEXT_TYPE],
        },
        aims: {
          type: [TITLE_AND_TEXT_TYPE],
        },
      },
    }),
  ]
  createTypes(typeDefs)
}

exports.sourceNodes = ({ actions, createContentDigest }, pluginOptions) => {
  const { createNode } = actions

  const { pagePath, sitePath } = withDefaults(pluginOptions)

  const importedStaticText = {
    open: require(path.resolve(`${pagePath}/open.json`)),
    ongoing: require(path.resolve(`${pagePath}/ongoing.json`)),
    completed: require(path.resolve(`${pagePath}/completed.json`)),
    contact: require(path.resolve(`${pagePath}/contact.json`)),
    about: require(path.resolve(`${pagePath}/about.json`)),
    bottom_banner: require(path.resolve(`${sitePath}/bottom-banner.json`)),
    footer: require(path.resolve(`${sitePath}/footer.json`)),
    main_contact_text: require(path.resolve(
      `${sitePath}/main-contact-text.json`
    )),
  }

  const staticText = lodash.merge(defaultStaticText, importedStaticText)

  createNode({
    ...staticText,
    id: `@thepolicylab-projectportals/project-portal-content-netlify`,
    parent: null,
    children: [],
    internal: {
      type: `${STATIC_TEXT_NODE_TYPE}`,
      contentDigest: createContentDigest(staticText),
      content: JSON.stringify(staticText),
      description: `Static Text for @thepolicylab-projectportals/gatsby-theme-project-portal`,
    },
  })
}
