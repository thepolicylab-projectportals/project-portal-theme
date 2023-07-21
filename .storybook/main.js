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
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  babel: {
    presets: ["@babel/preset-react", "@babel/preset-typescript"],
  },
}
export default config
