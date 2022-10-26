module.exports = {
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
      },
    },
  ],
}
