// Get environment variables including secrets
require("dotenv").config({
  path: `./.env`,
})

module.exports = {
  plugins: [
    `@hollandjg/project-portal-content-netlify`,
    {
      resolve: `@hollandjg/gatsby-theme-project-portal`,
      options: {
        pages: [
          { name: "Home", link: "/", show: true },
          { name: "Add Projects", link: "/admin/", show: true },
        ],
      },
    },
  ],
}
