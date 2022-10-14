// General metadata for the site
module.exports = {
  siteMetadata: {
    title: "Project Portal Example (Site with Queries)",
  },
  plugins: [
    {
      resolve: `@thepolicylab-projectportals/gatsby-theme-project-portal`,
      options: {
        staticText: {
          bottom_banner: {
            text: "This is the Project Portal site footer text.",
          },
        },
      },
    },
  ],
}
