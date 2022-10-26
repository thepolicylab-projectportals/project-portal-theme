# project-portal-content-netlify

A source plugin for the Gatsby theme `@thepolicylab-projectportals/gatsby-theme-project-portal`, to load data from Netlify-formatted json files. 

## Functionality

This plugin has the overarching function of: 
- loading projects and contacts from JSON files, 
- into `Project` and `Contact` nodes in Gatsby. 

## Quick Start Guide

Load the theme and then the plugin into a site's `gatsby-config.js`:
```js
module.exports = {
  plugins: [
    `@thepolicylab-projectportals/gatsby-theme-project-portal`,
    `@thepolicylab-projectportals/project-portal-content-netlify`,
  ],
}
```

By default, the plugin supports look for content files in the site's directory as follows:
```
.
├── gatsby-config.js
├── content
│   ├── contact
│   │   ├── first-contact.json
│   │   └── second-contact.json
│   └── project
│       ├── first-project.json
│       ├── second-project.json
│       ├── third-project.json
│       └── fourth-project.json
└── package.json
```

> 💡 The default paths are stored in [`utils/default-options.js`](utils/default-options.js)

The projects should be formatted as follows:
```json
{
  "question": "Hello world?",
  "mainContact": "first-contact",
  "projectTeam": ["first-contact", "second-contact"]
}
```

The contacts should be formatted as follows:
```json
{
  "key": "first-contact",
  "name": "Joe Bloggs"
}
```

> 💡 See the [theme's `types.js` file](../gatsby-theme-project-portal/utils/types.js) for the full list of allowed and required fields for the `Project` and `Contact` for use in the theme.

To modify the paths searched for the `Projects` and `Contacts`, pass the theme options in the site's `gatsby-config.js`. For instance, if you want to have all the content in the directory `info/projects` and `info/contacts`, you can modify the `projectPath` and `contactPath` as follows:
```js
module.exports = {
  plugins: [
    `@thepolicylab-projectportals/gatsby-theme-project-portal`,
      { 
          resolve: `@thepolicylab-projectportals/project-portal-content-netlify`,
          options: { 
              projectPath: `{__dirname}/info/projects`,
              contactPath: `{__dirname}/info/contacts`
          }
      },
  ],
}
```

> ⚠️ The projects and contacts **must** be in different directories, since the directory allows the plugin to distinguish between the two different types.

## Order of operations

The order of operations to achieve this functionality is as follows:

### Load dependencies: [package.json](./package.json)

The `package.json` file loads the dependencies when `npm install` is run.

### Source the files: [gatsby-config.js](./gatsby-config.js)
 
The plugin's `gatsby-config.js` runs the `gatsby-source-filesystem` plugin twice:
- once with the `projects` directory (either the default path or the `projectPath` specified in the theme options), and 
- once with the `contacts` (either the default path or the `contactPath` specified in the theme options).

The `gatsby-transformer-json` converts each file found into a node in GraphQL, of type `ProjectJson` or `ContactJson` depending on whether it was found in `projectPath` or `contactPath` respectively.

### Create the final nodes: [gatsby-node.js](./gatsby-node.js)

The plugin's `gatsby-node.js` converts the `ProjectJson` and `ContactJson` nodes into `Project` and `Contact` nodes, which follow the type specification defined in the [theme's `types.js` file](../gatsby-theme-project-portal/utils/types.js).

- Using explicit type declarations, it ensures that the `ProjectJson` and `ContactJson` nodes have the fields required to run the plugin successfully.
- Then using the `onCreateNode` API:
  - When a `ProjectJson` node is created, a new `Project` node is created,
  - When a `ContactJson` node is created, a new `Contact` node is created.

> 💡 The linking between the `Project` and `Contact` nodes is handled by the `@thepolicylab-projectportals/gatsby-theme-project-portal`. This replaces the `project.mainContact` value (a string) with the `Contact` node which has a matching `contact.key`.
