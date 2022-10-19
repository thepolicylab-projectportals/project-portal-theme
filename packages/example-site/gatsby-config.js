// General metadata for the site
const tailwindConfig = require("./tailwind.config")
const siteMetadata = {
  title: "Project Portal Example (Site with Queries)",
}

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    {
      resolve: `@thepolicylab-projectportals/gatsby-theme-project-portal`,
      options: {
        tailwindConfig: tailwindConfig,
        themeImageDirectory: `${__dirname}/src/images`,
        pages: [
          {
            name: "Landing Page",
            link: "/",
            show: true,
          },
        ],
        staticText: {
          bottom_banner: {
            text: "This is the Project Portal site footer text.",
          },
        },
      },
    },
  ],
}
