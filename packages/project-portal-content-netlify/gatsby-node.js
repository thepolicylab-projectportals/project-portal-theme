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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  // We specify the date-types for the ProjectJson
  // to ensure we load the correct format for the
  // Project nodes
  const projectJsonTypeDefs = `
    type ${PROJECT_JSON_TYPE} implements Node {
      slug: String
      opportunityCloses: Date @dateformat(formatString: "YYYY-MM-DD")
      startDate: Date @dateformat(formatString: "YYYY-MM-DD")
      endDate: Date @dateformat(formatString: "YYYY-MM-DD")
      lastModified: Date @dateformat(formatString: "YYYY-MM-DDTHH:mm:ss.SSSZ")
    }
  `
  createTypes(projectJsonTypeDefs)

  const contactJsonTypeDefs = `
    type ${CONTACT_JSON_TYPE} implements Node {
      key: String!
      name: String
    }
  `
  createTypes(contactJsonTypeDefs)
}

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions
  const projectJSONNodes = getNodesByType(`${PROJECT_JSON_TYPE}`)
  const contactJSONNodes = getNodesByType(`${CONTACT_JSON_TYPE}`)

  // loop through projectJSONNodes and create Project nodes
  projectJSONNodes.forEach((project) =>
    createNode({
      ...project,
      id: createNodeId(`${PROJECT_NODE_TYPE}-${project.slug}`),
      parent: null,
      children: [],
      internal: {
        type: `${PROJECT_NODE_TYPE}`,
        contentDigest: createContentDigest(project),
      },
    })
  )

  contactJSONNodes.forEach((contact) =>
    createNode({
      ...contact,
      id: createNodeId(`${CONTACT_NODE_TYPE}-${contact.key}`),
      parent: null,
      children: [],
      internal: {
        type: `${CONTACT_NODE_TYPE}`,
        contentDigest: createContentDigest(contact),
      },
    })
  )
}