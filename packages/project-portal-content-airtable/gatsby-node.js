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
const PROJECT_AIRTABLE_TYPE = `AirtableProject`
const CONTACT_AIRTABLE_TYPE = `AirtableContact`

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  // We specify the date-types for the ProjectJson
  // to ensure we load the correct format for the
  // Project nodes
  const allAirtableTypeDefs = `
    type ${PROJECT_AIRTABLE_TYPE} implements Node {
      data: ProjectAirtableData
    }
    type ProjectAirtableData {
      slug: String
      showMainContactOnProjectTeam: Boolean
      opportunityCloses: Date @dateformat(formatString: "YYYY-MM-DD")
      startDate: Date @dateformat(formatString: "YYYY-MM-DD")
      endDate: Date @dateformat(formatString: "YYYY-MM-DD")
      lastModified: Date @dateformat(formatString: "YYYY-MM-DDTHH:mm:ss.SSSZ")
      contacts: [String]
      }
  `
  createTypes(allAirtableTypeDefs)
}

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId, getNodesByType },
  pluginOptions
) => {
  const { partnerName, showMainContactOnProjectTeamDefault } =
    withDefaults(pluginOptions)
  console.log("theme options: partnerName", partnerName)

  const { createNode } = actions
  const projectAirtableNodes = getNodesByType(`${PROJECT_AIRTABLE_TYPE}`)
  const contactAirtableNodes = getNodesByType(`${CONTACT_AIRTABLE_TYPE}`)

  // loop through projectJSONNodes and create Project nodes
  projectAirtableNodes
    .filter((project) => project.data.partnerName === partnerName)
    .forEach((project) => {
      let projectTeam, mainContact, contactsData, showMainContactOnProjectTeam

      contactsData = project.data.contacts ?? []

      showMainContactOnProjectTeam =
        project.data.showMainContactOnProjectTeam ??
        showMainContactOnProjectTeamDefault

      switch (contactsData.length) {
        case 0:
          mainContact = null
          projectTeam = []
          break
        case 1:
          mainContact = contactsData.slice(0, 1)
          if (showMainContactOnProjectTeam) {
            projectTeam = contactsData
          } else {
            projectTeam = []
          }
          break
        default:
          mainContact = contactsData.slice(0, 1)
          if (showMainContactOnProjectTeam) {
            projectTeam = contactsData
          } else {
            projectTeam = contactsData.slice(1, -1)
          }
          break
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
        id: createNodeId(`${PROJECT_NODE_TYPE}-${projectRestructured.slug}`),
        parent: null,
        children: [],
        internal: {
          type: `${PROJECT_NODE_TYPE}`,
          contentDigest: createContentDigest(projectRestructured),
        },
      })
    })

  contactAirtableNodes.forEach((contact) => {
    // Restructure the airtable object to fulfil the format for the CONTACT_NODE_TYPE
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
      id: createNodeId(`${CONTACT_NODE_TYPE}-${contactRestructured.key}`),
      parent: null,
      children: [],
      internal: {
        type: `${CONTACT_NODE_TYPE}`,
        contentDigest: createContentDigest(contactRestructured),
      },
    })
  })
}
