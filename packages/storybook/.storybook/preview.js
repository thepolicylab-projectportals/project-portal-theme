import { withThemeByClassName } from "@storybook/addon-styling"
import { action } from "@storybook/addon-actions"
import { MINIMAL_VIEWPORTS, INITIAL_VIEWPORTS } from "@storybook/addon-viewport"

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// This global variable prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = "/"

// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook, it makes more sense to log an action than doing an actual navigate. Check out the actions addon docs for more info: https://storybook.js.org/docs/react/essentials/actions

window.___navigate = (pathname) => {
  action("NavigateTo:")(pathname)
}

const customViewports = {
  tailwindXS: {
    name: "Tailwind XS",
    styles: {
      width: "480px",
      height: "600px",
    },
  },
  tailwindSM: {
    name: "Tailwind SM",
    styles: {
      width: "640px",
      height: "768px",
    },
  },
  tailwindMD: {
    name: "Tailwind MD",
    styles: {
      width: "768px",
      height: "768px",
    },
  },

  tailwindLG: {
    name: "Tailwind LG",
    styles: {
      width: "1024px",
      height: "768px",
    },
  },
  tailwindXL: {
    name: "Tailwind XL",
    styles: {
      width: "1280px",
      height: "800px",
    },
  },
  tailwind2XL: {
    name: "Tailwind 2XL",
    styles: {
      width: "1536px",
      height: "1200px",
    },
  },
}

import "@thepolicylab-projectportals/gatsby-theme-project-portal/src/styles/global.css"
/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /(Date|opportunityCloses|created|lastModified)$/,
      },
    },
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        ...customViewports,
        ...INITIAL_VIEWPORTS,
      },
    },
  },

  decorators: [
    // Adds theme switching support.
    // NOTE: requires setting "darkMode" to "class" in your tailwind config
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
}

export default preview
