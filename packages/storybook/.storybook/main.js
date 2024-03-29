/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../../*/src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        postCss: {
          implementation: require.resolve("postcss"),
          postcssOptions: {
            plugins: {
              tailwindcss: {
                config: require("@thepolicylab-projectportals/gatsby-theme-project-portal/src/styles/tailwind.presets.js"),
              },
              autoprefixer: {},
            },
          },
        },
      },
    },
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: ["../static"],
  docs: {
    autodocs: "tag",
  },
  babel: {
    sourceType: "unambiguous",
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            chrome: 100,
          },
        },
      ],
      "@babel/preset-react",
      "@babel/preset-typescript",
    ],
    plugins: [],
  },
  webpackFinal: async (config) => {
    // This needs to be the index of the rule which includes the mjs, ts(x) and js(x) files
    const gatsbyConfigIndex = config.module.rules.findIndex((rule) => {
      return rule.test?.toString() === "/\\.(mjs|tsx?|jsx?)$/"
    })

    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[gatsbyConfigIndex].exclude = [
      /node_modules\/(?!(gatsby|gatsby-script)\/)/,
    ]
    // Remove core-js to prevent issues with Storybook
    config.module.rules[gatsbyConfigIndex].exclude = [/core-js/]
    // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[gatsbyConfigIndex].use[0].options.plugins.push(
      require.resolve("babel-plugin-remove-graphql-queries")
    )

    config.resolve.mainFields = ["browser", "module", "main"]
    return config
  },
}
export default config
