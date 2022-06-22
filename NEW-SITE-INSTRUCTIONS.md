# Site Configurations

Each variant (site) of the project portal is a full Gatsby site which imports the project-portal-theme as a [Gatsby "Theme"](https://www.gatsbyjs.com/docs/themes/). 

## Creating a new site

Each new site will require some infrastructure setup and configuration files.

### Create a workspace for the site based on the example template

- Duplicate the [`example`](./example) directory and rename to something like `project-portal-<site id>` where `<site id>` is a unique identifier for the government which wants the site. This directory is a yarn workspace.
- Update the `./project-portal-<site id>/package.json` so that the "name" field exactly matches the directory name `project-portal-<site id>`.

### Update `gatsby-config.js` file

The `./project-portal-<site id>/gatsby-config.js` file defines how to build the site and includes or loads all relevant metadata, configuration and static text. Update the `gatsby-config.js` as needed.

### Add scripts to `package.json`

- Add the new workspace name to the base `./package.json` alongside the other similarly named workspaces.
- In the base `./package.json`, add scripts to conveniently build/develop/serve this site:

```
"clean:<site id>": yarn workspace project-portal-<site id> clean",
"develop:<site id>": yarn workspace project-portal-<site id> develop",
"build:<site id>": "yarn workspace project-portal-<site id> build",
"serve:<site id>": "yarn workspace project-portal-<site id> serve",
```

### Add a `.env`

Create a `./project-portal-<site id>/.env` file with the environment variables for this site. See the base README for instructions on getting the API Key.

```
AIRTABLE_API_KEY
AIRTABLE_BASE_ID
```

### Add a README

Add a `README.md` file with some basic information on the configuration of that site including important contacts/decisions as well as a link to the production app.


### Update language file

To customize the language used in the app, we create a `./project-portal-<site id>/language.json` file which provides all text blurbs in the app. Update the `language.json` file as needed.



### Add images

The site-specific images used throughout the app should be contained in the `./project-portal-<site id>/images/` directory within the site's directory. For images, we use convention over configuration, so it is the names of the files that must match the expected thing. The following files must be provided:

- `[about/completed/contact/ongoing/open].jpg`: Splash images used as the background of the header for the respective page
- `icon.png`: A small icon used as the favicon for the page (the little icon in the broswer tab)
- `logo.png`: A small icon used in the navbar and footer for the page.
- `rd_logo.png`: A small icon used in the bottom banner for the page.

### Add tailwind theme

To customize tailwind colors/fonts for a site, we create a `tailwind.config.js` file which extends our base config. For an example, see `./example/tailwind.config.js`. See [the tailwind documentation](https://tailwindcss.com/docs/presets#how-configurations-are-merged) for more information on how these values are merged with the base values.

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
NETLIFY_SKIP_GATSBY_FUNCTIONS=true
```

#### Set up content check

Create a build hook on the site following [Netlify's docs](https://docs.netlify.com/configure-builds/build-hooks/). Copy the url provided and add it to the GitHub repo's secrets with a name such as `<SITE>_WEBHOOK_URL`. Then add the name of this key to the build matrix in the `.github/workflows/content-deploy.yml` file.
