# Project Portal Theme

## Repository Contents

- [📁`packages`](./packages) has the example sites and theme itself:
  - [📁`defaults`](./packages/defaults) is a completely empty Gatsby site which imports the theme and builds successfully, but does nothing else. It shows the Gatsby 404 page when you load the site. (This is intentional.)
  - [📁`example`](./packages/example) is a site which uses the components and queries from the theme, and should grow to reflect a minimum working site.
  - [📁`gatsby-theme-project-portal`](./packages/gatsby-theme-project-portal) is the theme and incorporates all the shared components, layouts, templates, reused queries, and styling. It should be imported into the site as a `theme`.
- [📄`.prettierrc`](.prettierrc) is a configuration file for the `prettier` JavaScript formatter.
- [📄`package.json`](package.json) is the config file for the `yarn` workspaces we use when developing the theme.
- [📄`test-packaging.sh`](test-packaging.sh) contains `zsh` functions used for testing the packaging, publishing, and building of the sites without using `yarn` workspaces (which was the main problem with the first implementation of the theme).
- [📄`yarn.lock`](yarn.lock) lists all the current package version used when setting up the workspaces.
- [📁`.yarn`](./.yarn) has the settings and node packages for the yarn workspaces.
  - [📁`releases`](./.yarn/releases) contains the current version of `yarn` used in the project.
  - [📁`plugins`](./.yarn/plugins) contains current versions of the yarn plugins being used in the workspaces.
  - [📁`cache`](./.yarn/cache) contains current versions of the node modules being used in the workspaces.
- [📁`node_modules`](./node_modules) When you run `yarn install`, the packages from `./.yarn/cache` are unpacked here.
- [📁`artifacts`](./artifacts) is not checked in to the repository, but is where the `yarn pack` command in the test scripts outputs the `.tgz` file containing the theme.

## Getting Started with Development

**Important:**
- Run all the commands from the top level directory.
- Use `yarn`, not `npm`.
- Use `zsh`, not `bash`

### Install Dependencies

You can install the dependencies (including `node` 18 and `yarn` 1) by running:
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

Please note `yarn` version should be `v1.22.19`. Check it using: 

```
yarn -v
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

For more control over which tests are run, you can use the `package-and-install` command directly. To see the options, run:
```zsh
source test-packaging.sh
package-and-install -h
```

#### Danger Zone: Publishing

> **⚠️ Danger**: This will genuinely create a new version of the package on the NPM Repository and use this to build the example site.


There is an additional script, 
```zsh
package-and-install -m publish -p testPackage -t packages/example/ -s
```
... which runs the full publish cycle on GitHub and builds a new site using that package. 
It will be tagged as a pre-release version.

### Create a New Package Version (GitHub)

Process:
- Update the version number (patch, minor or major version).
- Publish the package

#### Update Version Number

> **⚠️ Danger**: these commands automatically create a new commit with the new version number.

You can manually update the theme version to the next patch version `#.#.z`:
```zsh
yarn workspace "@thepolicylab-projectportals/gatsby-theme-project-portal" version --patch
```

Manually update the theme version to the next minor version `#.y.0`:
```zsh
yarn workspace "@thepolicylab-projectportals/gatsby-theme-project-portal" version --minor
```

Manually update the theme version to the next major version `x.0.0`:
```zsh
yarn workspace "@thepolicylab-projectportals/gatsby-theme-project-portal" version --major
```

#### Login to GitHub NPM Repository

Before you publish the theme, you'll need to store a token for the GitHub package repository.
Do this by adding a file in your home directory called `.npmrc`, and which should look like this:
```zsh
//npm.pkg.github.com/:_authToken=ghp_abcdef123456abcdef123456bcdef123456a
``` 
... where the authentication token after the `=` comes from your [GitHub > Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens). The token should have the following scopes:
- repo (all)
- write:packages, 
- read:packages, 
- delete:packages

#### Publish the theme

> **⚠️ Danger**: this command automatically creates a new published version of the theme.

To publish a new version of the theme, execute:
```zsh
yarn workspace "@thepolicylab-projectportals/gatsby-theme-project-portal" publish
```



### Use Prettier Code Formatter in WebStorm

To set up the prettier code formatter, first install the dependencies (`yarn install`) and then ensure that `prettier` is activated in the dialog box: WebStorm > Preferences > Languages and Frameworks > JavaScript > Prettier. 

The settings should be:
- Prettier package: `yarn:package.json:prettier` (only selectable if you have previously run `yarn install`)
- Run for files: the default suggested by WebStorm
- [x] On 'Reformat Code' action
- [x] On save
