# Project Portal Theme

## Repository Contents

- [📁`packages`](./packages) has the example sites and theme itself:
  - [📁`defaults`](./packages/defaults) is a completely empty Gatsby site which imports the theme and builds successfully, but does nothing else. It shows the Gatsby 404 page when you load the site. (This is intentional.)
  - [📁`example`](./packages/example) is a site which uses the components and queries from the theme, and should grow to reflect a minimum working site.
  - [📁`gatsby-theme-project-portal`](./packages/gatsby-theme-project-portal) is the theme and incorporates all the shared components, layouts, templates, reused queries, and styling. It should be imported into the site as a `theme`.
  - [📁`project-portal-content-decap`](./packages/project-portal-content-decap) is a plugin for 
    the theme which provides configuration for the [Decap-CMS](https://decapcms.org) and loads data 
    from the JSON files it produces.
  - [📁`storybook`](./packages/storybook) is a component workbench based on 
    [Storybook](storybook.js.org) which displays the components and layout elements.
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

You can install the dependencies (including `node 18` and `yarn berry`) by running:
```zsh
brew bundle
```

Install the `node`-dependencies and the workspaces:
```zsh
yarn install
```

### Develop Site in Workspace

Run the example site in develop mode:
```zsh
yarn workspace example-site develop
```

If you want to run the NetlifyCMS backend, then you need to start the NetlifyCMS proxy server a separate terminal window.

In the `packages/example-site` directory run:
```shell
npx netlify-cms-proxy-server
```

In the `packages/example-site/static/config.yml` file, change the `local_backend` parameter to:
```yml
local_backend: true
```

Then load the `https://localhost:8000/admin/` to view the NetlifyCMS UI.

### Develop Storybook in Workspace

Run the Storybook in develop mode:
```zsh
yarn workspace storybook develop
```

Updated components in 
[📁`gatsby-theme-project-portal`](./packages/gatsby-theme-project-portal) will be shown in the 
Storybook.

### Release Process

 The release process is automated using GitHub Actions. 

- Navigate to the repository's code tab at https://github.com/thepolicylab-projectportals/project-portal-theme
- Click "Releases"
- Click "Draft a new release"
- In the "Choose a tag" field, type the new semantic release number using the NPM version syntax. 
  The version number should be prefixed with a "v". 
  e.g. "v1.2.3" for a standard release, "v1.2.3-a4" for an alpha release, "v1.2.3-b5" for a beta 
  release, "v1.2.3-rc6" for a release candidate, and then click "Create new tag on publish". 
- Leave "Release title" empty.
- Click on "Generate Release notes". Check that the release notes match with the version number you have chosen – 
  breaking changes require a new major version number, e.g. v2.0.0, new features a minor version number, e.g. 
  v1.3.0 and fixes a bugfix number v1.2.4. If necessary, modify the version number you've chosen to be consistent 
  with the content of the release.
- Select whether this is a pre-release or a new "latest" release. It's a "pre-release" if there's an alpha, 
  beta, or release candidate number in the tag name, otherwise it's a new "latest" release.
- Click on "Publish release"
 
GitHub actions will run to create and publish NPM packages. Check in GitHub actions whether the 
process runs without errors and fix any errors which occur.

   
#### Test the theme

Test installing and building the theme using the test-packaging scripts, where you load the 
theme and other plugins from the registry instead of the local directory:

```zsh
source test-packaging.sh
package-and-install -t "packages/example-site/" -w @thepolicylab-projectportals/gatsby-theme-project-portal,@thepolicylab-projectportals/project-portal-content-decap
```

### Use Prettier Code Formatter in WebStorm

To set up the prettier code formatter, first install the dependencies (`yarn install`) and then ensure that `prettier` is activated in the dialog box: WebStorm > Preferences > Languages and Frameworks > JavaScript > Prettier. 

The settings should be:
- Prettier package: `yarn:package.json:prettier` (only selectable if you have previously run `yarn install`)
- Run for files: the default suggested by WebStorm
- [x] On 'Reformat Code' action
- [x] On save
