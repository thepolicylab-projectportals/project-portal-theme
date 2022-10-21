const tailwindConfig = require("example-content/tailwind.config")

module.exports = {
  siteMetadata: {
    title: "Project Portal Example (Test Data)",
  },
  plugins: [
    `@thepolicylab-projectportals/project-portal-content-netlify`,
    {
      resolve: `@thepolicylab-projectportals/gatsby-theme-project-portal`,
      options: {
        pages: [
          {
            name: "Landing Page",
            link: "/",
            show: true,
          },
          { name: "Add Projects", link: "/admin/", show: true },
        ],
        tailwindConfig: tailwindConfig,
        staticText: {
          bottom_banner: {
            text: "This is the Project Portal site footer text.",
          },
        },
      },
    },
  ],
}
