# project-portal-content-airtable

A plugin for the `gatsby-theme-project-portal` to import Airtable data and structure them as `Project` and `Contact` as required by the theme.

## Options

The plugin has the following options:
- `partnerName`: the name in the `Partner Name` field on Airtable, used to filter the projects. Default: `Example Content`
- `projectsTable`: should match the name of the table containing the projects on Airtable. Default: `Project Page Content`
- `contactsTable`: should match the name of the table containg the contacts on Airtable. default: `Project Contacts`

These should be set in the `gatsby-config.js` in the site which uses them.

## Required environment variables

The following environment variables are required:
- `AIRTABLE_BASE_ID`
- `AIRTABLE_API_KEY`

These should be set on the command line or in the environment before running the develop command, e.g.
```zsh
AIRTABLE_API_KEY=key1234567890abc AIRTABLE_BASE_ID=app3QJ302C1oHE7uw yarn workspace example-content-airtable develop
```

(Replace the key value with your own.)
