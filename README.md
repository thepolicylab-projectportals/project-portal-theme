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
- [📄`Brewfile`](Brewfile) can be used by the macOS homebrew package manager to install project dependencies. For more info, run `brew bundle --help` or visit [https://brew.sh](https://brew.sh).
- [📁`node_modules`](./node_modules) When you run `yarn install`, the packages from `./.yarn/cache` are unpacked here.
- [📁`artifacts`](./artifacts) is not checked in to the repository, but is where the `yarn pack` command in the test scripts outputs the `.tgz` file containing the theme.

## Getting Started with Development

**Important:**
- Run all the commands from the top level directory.
- Use `yarn`, not `npm`.
- Use `zsh`, not `bash`

### Install Dependencies

You can install the dependencies (including `node 18` and `yarn classic`) by running:
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
package-and-install -t "packages/example/" -w @thepolicylab-projectportals/gatsby-theme-project-portal
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
- Duplicating `packages/defaults`,
- Duplicating `packages/example`,

using the theme from 
- a local pack file (created new each time)

... and then building the site.

For more control over which tests are run, you can use the `package-and-install` command directly. To see the options, run:
```zsh
source test-packaging.sh
package-and-install -h
```

#### ⚠️ Danger Zone: Publishing

> **Warning**:
>
> These commands automatically create a published package on the GitHub NPM Repository.

To update the package version to a new pre-release patch version, then run the full publish cycle on GitHub and build the example site using that package, execute: 
```zsh
package-and-install -m publish -p testPackage -t packages/example/ -s
```

To test all the example sites (defaults, example and the empty site) with the full publishing workflow, you can run:
```zsh
source test-packaging.sh
run-all-publish-packaging-tests
```

### Create a New Package Version (GitHub)

Process:
- Update the version number (patch, minor or major version).
- Publish the package

#### Update Version Number

The process for updating the theme version number is as follows:
1. Update the theme version number.
2. Update the example sites' version numbers to match.
3. Commit the code.

You can manually update the theme version to the next pre-release version `#.#.#-ɑ`:
```zsh
yarn workspace "@thepolicylab-projectportals/gatsby-theme-project-portal" version --prerelease --no-git-tag-version
```

You can manually update the theme version to the next patch version `#.#.z`:
```zsh
yarn workspace "@thepolicylab-projectportals/gatsby-theme-project-portal" version --patch --no-git-tag-version
```

Manually update the theme version to the next minor version `#.y.0`:
```zsh
yarn workspace "@thepolicylab-projectportals/gatsby-theme-project-portal" version --minor --no-git-tag-version 
```

Manually update the theme version to the next major version `x.0.0`:
```zsh
yarn workspace "@thepolicylab-projectportals/gatsby-theme-project-portal" version --major --no-git-tag-version 
```

**Important:** if you update the theme version number, you may also need to update the referenced version number in the sites. Do that by modifying the sites' `package.json` files. 

Check that this is done by ensuring that all the version numbers listed by the following command are consistent:

```zsh
{
  theme_package_json="packages/gatsby-theme-project-portal/package.json"
  echo "file line tag version_number"
  echo "$theme_package_json " $(sed -n '/.*"version": "\([^"]*\)",.*$/{=;p;}' "$theme_package_json");
  for package_json in packages/{example,defaults}/package.json
  do
    echo "$package_json " $(sed -n '/gatsby-theme-project-portal/{=;p;}' "$package_json");
  done
} | column -t
```

Once you have done this, commit the updated version of all the `package.json` files.

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
