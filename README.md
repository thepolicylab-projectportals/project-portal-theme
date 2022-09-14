# Project Portal Theme

## Repository Contents

- [📁`packages`](./packages) has the example sites and theme itself:
  - [📁`defaults`](./packages/defaults) is a completely empty Gatsby site which imports the theme and builds successfully, but does nothing else. It shows the Gatsby 404 page when you load the site. (This is intentional.)
  - [📁`example`](./packages/example) is a site which uses the components and queries from the theme, and should grow to reflect a minimum working site.
  - [📁`gatsby-theme-project-portal`](./packages/gatsby-theme-project-portal) is the theme and incorporates all the shared components, layouts, templates, reused queries, and styling. It should be imported into the site as a `theme`.
- [📄`.pnp.cjs`](.pnp.cjs) and [📄`.pnp.loader.mjs`](.pnp.loader.mjs) are files created by `yarn` and should be modified only by `yarn`.
- [📄`.prettierrc`](.prettierrc) is a configuration file for the `prettier` JavaScript formatter.
- [📄`package.json`](package.json) is the config file for the `yarn` workspaces we use when developing the theme.
- [📄`test-packaging.sh`](test-packaging.sh) contains `zsh` functions used for testing the packaging, publishing, and building of the sites without using `yarn` workspaces (which was the main problem with the first implementation of the theme).
- [📄`yarn.lock`](yarn.lock) lists all the current package version used when setting up the workspaces.
- [📁`.yarn`](./.yarn) has the settings and node modules for the yarn workspaces.
  - [📁`cache`](./.yarn/cache) contains current versions of the node modules being used in the workspaces. When you run `yarn install`, these are unpacked *à la* `node modules` into the `unplugged` directory.
  - [📁`unplugged`](./.yarn/unplugged) contains unpacked node packages, and replaces the `node_modules` directory of `npm`.
  - [📁`plugins`](./.yarn/plugins) contains current versions of the yarn plugins being used in the workspaces.
- [📁`artifacts`](./artifacts) is not checked in to the repository, but is where the `yarn pack` command in the test scripts outputs the `.tgz` file containing the theme.

## Getting Started with Development

**Important:**
- Run all the commands from the top level directory.
- Use `yarn`, not `npm`.
- Use `zsh`, not `bash`

### Install Dependencies

You can install the dependencies (including `node` 18 and `yarn` 3) by running:
```zsh
brew bundle
```

Install the `node`-dependencies and the workspaces:
```zsh
yarn install
```

### Build Site in Workspace

Run the example site in develop mode:
```zsh
yarn workspace example develop
```

### Build Site in Separate Directory (Locally)

Load the shell scripts:
```zsh
source test-packaging.sh
```

Run the packaging, build the example site, and serve it locally:
```zsh
package-and-install -m pack -t packages/example/ -s
```

### Testing

#### Local

Load the shell scripts:
```zsh
source test-packaging.sh
```

Run a series of local packaging tests:
```zsh
run-all-local-packaging-tests
```
The tests include the following site setups: 
- Setting up an empty Gatsby site,
- Duplicating the `packages/defaults` site,
- Duplicating the `packages/example`,

... using the theme from:
- a local pack file (created new each time)
- the newest version of the theme available on the GitHub registry,

... and then building the site.

#### Danger Zone: Publishing

There is an additional script, 
```zsh
package-and-install -m publish -t packages/example/ -s
```
... which runs the full publish cycle on GitHub and builds a new site using that package. 

**Beware**: This will genuinely create a new version of the package on the NPM Repository and use this to build the example site.

### Create a New Package Version (GitHub)

Process:
- First update the version number (patch, minor or major version).
- Then, publish the package

#### Update Version Number

Manually update the theme version to the next patch version `#.#.z`:
```zsh
yarn workspace "@thepolicylab-projectportals/gatsby-theme-project-portal" version patch
```

Manually update the theme version to the next minor version `#.y.0`:
```zsh
yarn workspace "@thepolicylab-projectportals/gatsby-theme-project-portal" version minor
```

Manually update the theme version to the next major version `x.0.0`:
```zsh
yarn workspace "@thepolicylab-projectportals/gatsby-theme-project-portal" version major
```

**Note**: 
- If these commands fail, run
  ```zsh
  yarn plugin import version
  ```
  and then rerun.
- These commands also update the version numbers in the site workspaces.

#### Login to GitHub NPM Repository

Before you publish the theme, you'll need to log in to the GitHub Package Repository:
```zsh
yarn workspace "@thepolicylab-projectportals/gatsby-theme-project-portal" npm login --publish
``` 

- Use the username `__token__`.
- The scopes required are shown on screen. Paste in a valid token from your GitHub account.

#### Publish the theme
To publish a new version of the theme:
```zsh
yarn workspace "@thepolicylab-projectportals/gatsby-theme-project-portal" npm publish
```

## Testing
There are two scripts included to test the packaging and build steps. 
- `test-packaging-local.sh` creates a pack of the theme locally (in the `artifacts/` directory) and uses `yarn` to install this into a new site outside the workspace tree.
- `test-packaging-remote.sh` publishes the theme to the GitHub repository and uses `yarn` to install this new version into a new site outside the working tree. 
