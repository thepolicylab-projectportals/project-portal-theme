#!/usr/bin/env zsh

die() {
  local message="$*"
  >&2 echo "${message}"
  exit 1
}

siteDir="packages/example/"
themeName="@thepolicylab-projectportals/gatsby-theme-project-portal"

testDir=$(mktemp -d || die "Failed to create new temporary directory.")
echo "new temporary directory: $testDir"

export siteDir
export themeName
export testDir

# Update both the theme version number as well as any dependent workspaces
yarn workspace "$themeName" version patch || die "If this fails, install 'yarn plugin import version' and rerun."

# Publish the theme
yarn workspace "$themeName" npm publish || die "If this fails, install 'yarn workspace $themeName npm login --publish' and rerun."

# Add files we need to ensure the installer looks in the right place for the package
cp ./packages/gatsby-theme-project-portal/{.npmrc,.yarnrc.yml} "$testDir"

# Add minimal files for setting up the Gatsby site
cp "./packages/defaults/gatsby-config.js" "$testDir"
mkdir -p "$testDir/src/pages" || die "Failed to add src/pages directory"
cp "./packages/example/src/pages/index.js" "$testDir/src/pages/." || die "Failed to add homepage"

cd "$testDir" || die "changing to testDir $testDir failed."
yarn init -y || die "Failed to init new site"
yarn add react react-dom gatsby "$themeName" || die "Failed to add dependencies"
yarn install || die "Failed to install dependencies"
yarn run gatsby build || die "Failed to build site"
yarn run gatsby serve
