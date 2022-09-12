#!/usr/bin/env zsh

die() {
  local message="$*"
  >&2 echo "${message}"
  exit 1
}

siteDir="packages/example/"
themeName="@hollandjg/gatsby-theme-minimal"

testDir=$(mktemp -d || die "Failed to create new temporary directory.")
echo "new temporary directory: $testDir"

# Update both the theme version number as well as any dependent workspaces
yarn workspace "$themeName" version patch || die "If this fails, install 'yarn plugin import version' and rerun."

# Publish the theme
yarn workspace "$themeName" npm publish || die "If this fails, install 'yarn workspace $themeName npm login --publish' and rerun."

# Add the basic site content
rsync -av --progress "$siteDir/." "$testDir" --exclude node_modules --exclude .cache --exclude public

# Add files we need to ensure the installer looks in the right place for the package
cp ./packages/gatsby-theme-minimal/{.npmrc,.yarnrc.yml} "$testDir"

cd "$testDir" || die "changing to testDir $testDir failed."
yarn install || die "failed to install all dependencies."
yarn build
yarn serve
