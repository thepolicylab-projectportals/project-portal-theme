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
        pages: [
          {
            name: "Landing Page",
            link: "/",
            show: true,
          },
        ],
        tailwindConfig: tailwindConfig,
        staticText: {
          bottom_banner: {
            text: "This project portal example content was developed by the The Policy Lab and the Center for Computation and Visualization at Brown University. If you have ideas for how to improve it, please let us know!",
          },
        },
      },
    },
    `@thepolicylab-projectportals/project-portal-content-netlify`,
  ],
}
