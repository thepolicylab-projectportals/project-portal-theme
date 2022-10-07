var crypto = require("crypto");

exports.createSchemaCustomization = (
  { actions },
) => {
  const { createTypes } = actions
  createTypes(`type NotesConfig implements Node {
basePath: String!
homeText: String
breadcrumbSeparator: String
}`
  )
}



exports.sourceNodes = (
  { actions: { createNode }, schema },
  {
    basePath = `/`,
    homeText = `~`,
    breadcrumbSeparator = `/`
  }
) => {
  // create garden data from plugin config
  const notesConfig = {
    breadcrumbSeparator,
    basePath,
    homeText
  };

  createNode({
    ...notesConfig,
    id: `gatsby-theme-notes-config`,
    parent: null,
    children: [],
    internal: {
      type: `NotesConfig`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(notesConfig))
        .digest(`hex`),
      content: JSON.stringify(notesConfig),
      description: `Notes Config`
    }
  });
};
