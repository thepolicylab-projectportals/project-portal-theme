module.exports = {
  plugins: [
    `@thepolicylab-projectportals/project-portal-content-netlify`,
    {
      resolve: `@thepolicylab-projectportals/gatsby-theme-project-portal`,
      options: {
        pages: [
          { name: "Home", link: "/", show: true },
          { name: "Add Projects", link: "/admin/", show: true },
        ],
      },
    },
  ],
}
