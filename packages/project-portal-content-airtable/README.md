# project-portal-content-airtable

A plugin for the `gatsby-theme-project-portal` to import Airtable data and structure them as `Project` and `Contact` as required by the theme.

## Functionality

This plugin has the overarching function of:
- loading projects and contacts from an Airtable Base,
- into `Project` and `Contact` nodes in Gatsby.

## Quick Start Guide

Load the theme and then the plugin into a site's `gatsby-config.js`:
```js
module.exports = {
  plugins: [
    `@thepolicylab-projectportals/gatsby-theme-project-portal`,
    `@thepolicylab-projectportals/project-portal-content-airtable`,
  ],
}
```

In order to run correctly, the following environment variables are required:
- `AIRTABLE_BASE_ID`
- `AIRTABLE_API_KEY`

These should be set on the command line or in the environment before running the develop command, e.g.
```zsh
AIRTABLE_API_KEY=key1234567890abc AIRTABLE_BASE_ID=app3QJ302C1oHE7uw yarn workspace example-content-airtable develop
```

> ⚠️ Replace the key value with your own, accessed from the Gatsby API page. See [Loading Environment Variables](#loading-environment-variables) for more details.


To modify which projects are selected and how they are represented on Airtable, the plugin has the following options:
- `partnerName`: the name in the `Partner Name` field on Airtable, used to filter the projects. Default (which should always be replaced in production use): `Example Content`
- `projectTable`: should match the name of the table containing the projects on Airtable. Default: `Project Page Content`
- `contactTable`: should match the name of the table containing the contacts on Airtable. default: `Project Contacts`

These should be set in the `gatsby-config.js` in the site which uses them, as follows:
```js
module.exports = {
  plugins: [
    `@thepolicylab-projectportals/gatsby-theme-project-portal`,
      { 
          resolve: `@thepolicylab-projectportals/project-portal-content-airtable`,
          options: { 
              partnerName: `North Carolina`
          }
      },
  ],
}
```

## Order of operations

The order of operations to achieve this functionality is as follows:

### Load dependencies: [package.json](./package.json)

The `package.json` file loads the dependencies when `npm install` is run.

### Source the Airtable entries: [gatsby-config.js](./gatsby-config.js)

The plugin's `gatsby-config.js` runs the `gatsby-source-airtable` plugin for two tables:
- once with the `projects` table (either the default table or the `projectTable` specified in the theme options), and
- once with the `contacts` (either the default path or the `contactTable` specified in the theme options).

For each of these, a different node type containing the data is created: `AirtableProject` and `AirtableContact` respectively.

### Create the final nodes: [gatsby-node.js](./gatsby-node.js)

The plugin's `gatsby-node.js` converts the `AirtableProject` and `AirtableContact` nodes into `Project` and `Contact` nodes, which follow the type specification defined in the [theme's `types.js` file](../gatsby-theme-project-portal/utils/types.js).

- Using explicit type declarations, it ensures that the `AirtableProject` and `AirtableContact` nodes have the fields required to run the plugin successfully.
- When an `AirtableProject` node is created, a new `Project` node is created,
- When an `AirtableContact` node is created, a new `Contact` node is created.

> 💡 The linking between the `Project` and `Contact` nodes is handled by the `@thepolicylab-projectportals/gatsby-theme-project-portal`. This replaces the `project.mainContact` value (a string) with the `Contact` node which has a matching `contact.key`.

## Loading Environment Variables

### .env file
Environment variables can be loaded by sourcing an environment file in the site's gatsby-config.

Include the following line at the top of the site's `gatsby-config.js`
```js
require("dotenv").config({
  path: `${__dirname}/.env`,
})
```
and write a file called `.env` in the same directory which includes the following lines:
```
AIRTABLE_API_KEY="key1234567890abc"
AIRTABLE_BASE_ID="app3QJ302C1oHE7uw"
```
)

### CI Tools

Environment variables can be added in CI tools. See the documentation for your CI tool (e.g. GitHub actions) for details.
