// Get environment variables including secrets
require("dotenv").config({
  path: `./.env`,
})

module.exports = {
  plugins: [
    `@thepolicylab-projectportals/gatsby-theme-project-portal`,
    `@thepolicylab-projectportals/project-portal-content-netlify`,
  ],
}
