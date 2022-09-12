<p>
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1>
  Starter for creating a Gatsby Theme workspace
</h1>

```shell
gatsby new my-theme https://github.com/gatsbyjs/gatsby-starter-theme-workspace
cd my-theme
yarn workspace example develop
```

## Layout

```text
.
├── README.md
├── gatsby-theme-project-portal
│   ├── README.md
│   ├── gatsby-config.js
│   ├── index.js
│   └── package.json
├── example
│   ├── README.md
│   ├── gatsby-config.js
│   ├── package.json
│   └── src
├── package.json
└── yarn.lock

3 directories, 10 files
```

### `gatsby-theme-project-portal`

This directory is the theme package itself. You should rename this at
some point to be `gatsby-theme-{my-theme-name}`. Also change the
`package.json` name field and the corresponding dependency in the
example directory's `package.json`/`gatsby-config.js` to match the chosen name.

- `gatsby-theme-project-portal/`
  - `gatsby-config.js`: An empty gatsby-config that you can use as a starting point for building functionality into your theme.
  - `index.js`: Since themes also function as plugins, this is an empty file that
    gatsby needs to use this theme as a plugin.
  - `package.json`: The dependencies that your theme will pull in when people install it. `gatsby` should be a `peerDependency`.

### `example`

This is an example usage of your theme. It should look the same as the
site of someone who installed and used your theme from npm.

- `example/`
  - `gatsby-config.js`: Specifies which theme to use and any other one-off config a site might need.
  - `src/`: Source code such as one-off pages or components that might live in
    a user's site.

You can run the example with:

```shell
yarn workspace example develop
```

## 🚀 Quick start (Gatsby Cloud)

Deploy this starter with one click on [Gatsby Cloud](https://www.gatsbyjs.com/cloud/):

[<img src="https://www.gatsbyjs.com/deploynow.svg" alt="Deploy to Gatsby Cloud">](https://www.gatsbyjs.com/dashboard/deploynow?url=https://github.com/gatsbyjs/gatsby-starter-theme-workspace)

## Additional settings

Use the following tools:
- Node 18 (installed using `brew install node@18`)
- Yarn 3.2.3 (installed using `brew install corepack` after installing `node@18`)

## Publishing the theme

First login to the npm GitHub repository:

```shell
yarn workspace @thepolicylab-projectportals/gatsby-theme-project-portal npm login --publish
```

Use the username `__token__`.

The scopes required are shown on screen. Paste in a valid token from your GitHub account.

Then publish the package:
```shell
yarn workspace @thepolicylab-projectportals/gatsby-theme-project-portal npm publish
```

## Testing
There are two scripts included to test the packaging and build steps. 
- `test-packaging-local.sh` creates a pack of the theme locally (in the `artifacts/` directory) and uses `yarn` to install this into a new site outside the workspace tree.
- `test-packaging-remote.sh` publishes the theme to the GitHub repository and uses `yarn` to install this new version into a new site outside the working tree. 
