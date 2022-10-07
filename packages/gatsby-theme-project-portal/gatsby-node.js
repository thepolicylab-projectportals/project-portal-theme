exports.onPreInit = () => console.log("Loaded gatsby-theme-project-portal")

// constants for your GraphQL Post and Author types
const POST_NODE_TYPE = `Post`

exports.sourceNodes = async ({
                               actions,
                               createContentDigest,
                               createNodeId,
                               getNodesByType,
                             }, themeOptions) => {
  console.log(themeOptions)
  const { createNode } = actions

  const data = {
    posts: [
      { id: 1, description: `Hello world!` },
      { id: 2, description: `Second post!` },
    ],
  }

  // loop through data and create Gatsby nodes
  data.posts.forEach(post =>
    createNode({
      ...post,
      id: createNodeId(`${POST_NODE_TYPE}-${post.id}`),
      parent: null,
      children: [],
      internal: {
        type: POST_NODE_TYPE,
        contentDigest: createContentDigest(post),
      },
    })
  )

  return
}
