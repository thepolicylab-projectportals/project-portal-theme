#!/usr/bin/env zsh

source "./shell-utils.sh"

siteDir="packages/example/"
themeName="@thepolicylab-projectportals/gatsby-theme-project-portal"

testDir=$(mktemp -d || die "Failed to create new temporary directory.")
echo "new temporary directory: $testDir"

publishTheme "$themeName"

# Add the basic site content
rsync -av --progress "$siteDir/." "$testDir" --exclude node_modules --exclude .cache --exclude public

# Add files we need to ensure the installer looks in the right place for the package
cp ./packages/gatsby-theme-project-portal/{.npmrc,.yarnrc.yml} "$testDir"

cd "$testDir" || die "changing to testDir $testDir failed."
yarn install || die "failed to install all dependencies."
yarn build
yarn serve
