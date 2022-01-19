# Site Configurations

Each variant (site) of the project portal contains a folder in this directory. To use the configuration for that site, set the `PP_CONFIG_BASE` environment variable to the folder path including the trailing slash (e.g. `sites/satx/`).

## Creating a new site

Each new site will require some infrastructure setup and configuration files.

### Create a folder for the site

Add a folder to this directory with a short identifying name (e.g. `satx`, `nc`). All files created from here below will go in that folder.

### Add a README

Add a `README.md` file with some basic information on the configuration of that site including important contacts/decisions as well as a link to the production app.

### Add a `.env`

Create a `.env` file with the environment variables for this site. See the base README for instructions on getting the API Key.

```
AIRTABLE_API_KEY
AIRTABLE_BASE_ID
```

### Add scripts to `package.json`

In the base package.json, add scripts to conveniently build/develop this site:

```
"develop:<site id>": "cross-env PP_CONFIG_BASE=/sites/<site id> gatsby develop",
"build:<site id>": "cross-env PP_CONFIG_BASE=/sites/<site id> gatsby build",
```

### Add tailwind theme

To customize tailwind colors/fonts for a site, we create a `tailwind.config.js` file which extends our base config. Below is an example. See [the tailwind documentation](https://tailwindcss.com/docs/presets#how-configurations-are-merged) for more information on how these values are merged with the base values.

```js
// tailwind.config.js
const colors = require("tailwindcss/colors")

module.exports = {
  presets: [require("../../tailwind.config.js")],
  theme: {
    extend: {
      colors: {
        link: colors.sky,
        primary: {
          50: "#faf6f6",
          100: "#f5eded",
          200: "#e6d2d1",
          300: "#d7b7b5",
          400: "#ba827e",
          500: "#9c4c47",
          600: "#8c4440",
          700: "#753935",
          800: "#5e2e2b",
          900: "#4c2523",
        },
      },
    },
  },
}
```

### Create a netlify site

Create the site. Once created, go to `Site Settings > Build & Deploy > Continuous Deployment` and add the following setttings:

#### Branches

```
Production branch: prod
Branch deploys: main
```

We want to deploy a staging version of the site on merge to `main` and the production version on merge to `prod`.

#### Environment

Make sure the following keys are set:

```
AIRTABLE_API_KEY
AIRTABLE_BASE_ID
PP_CONFIG_BASE
```
