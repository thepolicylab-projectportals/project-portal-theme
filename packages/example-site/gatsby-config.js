// General metadata for the site
const tailwindConfig = require("./tailwind.config")
const siteMetadata = {
  title: "Project Portal Example (Site with Queries)",
  short_name: "Project Portal Site",
}

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    {
      resolve: `@thepolicylab-projectportals/gatsby-theme-project-portal`,
      options: {
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
