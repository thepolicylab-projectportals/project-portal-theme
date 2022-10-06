const siteMetadata = {
  siteTitle: "Gatsby Theme Project Portal",
  short_name: "Project Portal",
  siteUrl: process.env.CI ? "http://localhost:9000" : "https://localhost",
  projectInterestLink: "",
  live: false,
  locale: "en",
  pages: [{ name: "Home", link: "/", show: true }],
}
module.exports = {
  siteMetadata: siteMetadata,
  plugins: [`@thepolicylab-projectportals/gatsby-theme-project-portal`],
}
