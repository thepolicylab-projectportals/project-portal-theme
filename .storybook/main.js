/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ["../packages/*/src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: {
        postCss: {
          implementation: require.resolve("postcss"),
        },
      },
    },
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: ["../packages/example/content"],
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
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[2].exclude = [
      /node_modules\/(?!(gatsby|gatsby-script)\/)/,
    ]

    // Remove core-js to prevent issues with Storybook
    config.module.rules[2].exclude = [/core-js/]
    // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
    config.module.rules[2].use[0].options.plugins.push(
      require.resolve("babel-plugin-remove-graphql-queries")
    )

    config.resolve.mainFields = ["browser", "module", "main"]
    return config
  },
}
export default config
