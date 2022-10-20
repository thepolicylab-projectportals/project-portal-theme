require("dotenv").config({
  path: `${__dirname}/.env`,
})

module.exports = {
  plugins: [
    `@thepolicylab-projectportals/gatsby-theme-project-portal`,
    `@thepolicylab-projectportals/project-portal-content-airtable`,
  ],
}
