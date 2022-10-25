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
const RAW_PROJECT_AIRTABLE_TYPE = `AirtableRawProject`
const RAW_CONTACT_AIRTABLE_TYPE = `AirtableRawContact`
// These are wanted output types
const PROJECT_AIRTABLE_TYPE = `AirtableProject`
const CONTACT_AIRTABLE_TYPE = `AirtableContact`

exports.onCreateNode = async (
  {
    node, // the node that was just created
    actions: { createNode },
    createNodeId,
    createContentDigest,
  },
  pluginOptions
) => {
  const { partnerName, showMainContactOnProjectTeamDefault } =
    withDefaults(pluginOptions)

  if (
    node.internal.type === RAW_PROJECT_AIRTABLE_TYPE &&
    node.data.partnerName === partnerName
  ) {
    const project = node

    let projectTeam, mainContact, contactsData, showMainContactOnProjectTeam

    contactsData = project.data.contacts

    showMainContactOnProjectTeam =
      project.data.showMainContactOnProjectTeam ??
      showMainContactOnProjectTeamDefault

    mainContact = contactsData.slice(0, 1)[0]

    if (showMainContactOnProjectTeam) {
      projectTeam = contactsData
    } else {
      projectTeam = contactsData.slice(1)
    }

    let projectRestructured = {
      slug: project.data.slug,

      question: project.data.question,
      partnerName: project.data.partnerName,
      status: project.data.status,

      opportunityCloses: project.data.opportunityCloses,
      startDate: project.data.startDate,
      endDate: project.data.endDate,

      agency: project.data.agency,
      topics: project.data.topics,
      supportNeeded: project.data.supportNeeded,
      summary: project.data.summary,
      deliverable: project.data.deliverable,
      purpose: project.data.purpose,
      expertise: project.data.expertise,
      requirement: project.data.requirement,
      keyDates: project.data.keyDates,
      statusOfData: project.data.statusOfData,
      priorResearch: project.data.priorResearch,
      fundingInfo: project.data.fundingInfo,
      emailContent: project.data.emailContent,
      lastModified: project.data.lastModified,

      mainContact: mainContact,
      projectTeam: projectTeam,
    }
    createNode({
      ...projectRestructured,
      id: createNodeId(`${PROJECT_AIRTABLE_TYPE}-${projectRestructured.slug}`),
      parent: null,
      children: [],
      internal: {
        type: `${PROJECT_AIRTABLE_TYPE}`,
        contentDigest: createContentDigest(projectRestructured),
      },
    })
  }
  if (node.internal.type === RAW_CONTACT_AIRTABLE_TYPE) {
    const contact = node
    const contactRestructured = {
      key: contact.recordId,
      name: contact.data.name,
      title: contact.data.title,
      employer: contact.data.employer,
      email: contact.data.email,
      projectPageContent: contact.data.Project_Page_Content,
      lastModified: contact.data.Last_Modified,
    }

    createNode({
      ...contactRestructured,
      id: createNodeId(`${CONTACT_AIRTABLE_TYPE}-${contactRestructured.key}`),
      parent: null,
      children: [],
      internal: {
        type: `${CONTACT_AIRTABLE_TYPE}`,
        contentDigest: createContentDigest(contactRestructured),
      },
    })
  }
}

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  // const typeDefs = [
  //   schema.buildObjectType({
  //     name: PROJECT_AIRTABLE_TYPE,
  //     interfaces: ["Node", PROJECT_NODE_TYPE],
  //     fields: {
  //       slug: "String!",
  //       question: "String",
  //       status: "String",
  //       opportunityCloses: {
  //         type: "Date",
  //         extensions: {
  //           dateformat: {},
  //         },
  //       },
  //       startDate: {
  //         type: "Date",
  //         extensions: {
  //           dateformat: {},
  //         },
  //       },
  //       endDate: {
  //         type: "Date",
  //         extensions: {
  //           dateformat: {},
  //         },
  //       },
  //
  //       agency: "String",
  //       topics: "[String]",
  //
  //       summary: "String",
  //       deliverable: "String",
  //       purpose: "String",
  //       expertise: "String",
  //       requirement: "String",
  //       keyDates: "String",
  //       statusOfData: "String",
  //       priorResearch: "String",
  //       fundingInfo: "String",
  //       emailContent: "String",
  //
  //       lastModified: {
  //         type: "Date",
  //         extensions: {
  //           dateformat: { formatString: "YYYY-MM-DDTHH:mm:ss.SSSZ" },
  //         },
  //       },
  //
  //       mainContact: {
  //         type: CONTACT_NODE_TYPE,
  //         resolve: async (source, args, context) => {
  //           return await context.nodeModel.findOne({
  //             type: CONTACT_AIRTABLE_TYPE,
  //             query: {
  //               filter: { key: { eq: source.mainContact } },
  //             },
  //           })
  //         },
  //       },
  //       projectTeam: {
  //         type: [CONTACT_AIRTABLE_TYPE],
  //         resolve: async (source, args, context) => {
  //           const { entries } = await context.nodeModel.findAll({
  //             type: CONTACT_AIRTABLE_TYPE,
  //             query: {
  //               filter: { key: { in: source.projectTeam ?? [] } },
  //             },
  //           })
  //           return entries
  //         },
  //       },
  //     },
  //   }),
  //   schema.buildObjectType({
  //     name: CONTACT_AIRTABLE_TYPE,
  //     interfaces: ["Node", CONTACT_NODE_TYPE],
  //     fields: {
  //       key: "String!",
  //       email: "String",
  //       name: "String",
  //       employer: "String",
  //       title: "String",
  //       image: {
  //         type: "File",
  //       },
  //       // image: {
  //       //   type: "File",
  //       //   resolve: async (source, args, context) => {
  //       //     return await context.nodeModel.findOne({
  //       //       type: "File",
  //       //       query: {
  //       //         filter: {
  //       //           relativePath: { eq: source.image },
  //       //           sourceInstanceName: { eq: "contact" },
  //       //         },
  //       //       },
  //       //     })
  //       //   },
  //       // },
  //     },
  //   }),
  // ]
  // createTypes(typeDefs)
}
//
//
// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   // We specify the date-types for the ProjectJson
//   // to ensure we load the correct format for the
//   // Project nodes
//   const allAirtableTypeDefs = `
//     type ${PROJECT_AIRTABLE_TYPE} implements Node {
//       data: ProjectAirtableData
//     }
//     type ProjectAirtableData {
//       slug: String
//       showMainContactOnProjectTeam: Boolean
//       opportunityCloses: Date @dateformat(formatString: "YYYY-MM-DD")
//       startDate: Date @dateformat(formatString: "YYYY-MM-DD")
//       endDate: Date @dateformat(formatString: "YYYY-MM-DD")
//       lastModified: Date @dateformat(formatString: "YYYY-MM-DDTHH:mm:ss.SSSZ")
//       contacts: [String]
//       }
//   `
//   createTypes(allAirtableTypeDefs)
// }
//
