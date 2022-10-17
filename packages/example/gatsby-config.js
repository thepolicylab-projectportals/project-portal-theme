const tailwindConfig = require("./tailwind.config")
const siteMetadata = {
  title: "Project Portal Example (Test Data)",
  short_name: "Project Portal",
}

// General metadata for the site
module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `@thepolicylab-projectportals/gatsby-theme-project-portal`,
      // options: {
      //   tailwindConfig: tailwindConfig,
      // },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   // Add metadata for creating a phone-homepage link
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: siteMetadata.title,
    //     short_name: siteMetadata.short_name,
    //     start_url: `/`,
    //     background_color: tailwindConfig.theme.extend.colors.background,
    //     theme_color: tailwindConfig.theme.extend.colors.primary[500],
    //     display: `standalone`,
    //     icon: "./src/images/icon.png",
    //   },
    // },
  ],
}
