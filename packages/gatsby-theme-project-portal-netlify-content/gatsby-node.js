// constants for your GraphQL Project and Contact types
const PROJECT_NODE_TYPE = `Project`
const projectTypeDefs = `
    type ${PROJECT_NODE_TYPE} implements Node {
      slug: String!
      
      question: String
      partnerName: String
      status: String
      
      opportunityCloses: Date @dateformat
      startDate: Date @dateformat
      endDate: Date @dateformat
  
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
      
      lastModified: Date @dateformat(formatString: "YYYY-MM-DDTHH:mm:ss.SSSZ")
      
    }
  `
exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions

  const data = {
    projects: [
      { slug: "hello-world-project", description: `Hello world!` },
      { slug: "second-project", description: `Second project!` },
      { slug: "third-project" },
      {
        slug: "fourth-project",
        lastModified: "2022-10-12",
        startDate: "2022-10-13",
      },
    ],
  }

  // loop through data and create Gatsby nodes
  data.projects.forEach((project) =>
    createNode({
      ...project,
      id: createNodeId(`${PROJECT_NODE_TYPE}-${project.slug}`),
      parent: null,
      children: [],
      internal: {
        type: PROJECT_NODE_TYPE,
        contentDigest: createContentDigest(project),
      },
    })
  )
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(projectTypeDefs)
}
