#!/usr/bin/env zsh

source "./shell-utils.sh"

templateDir="packages/example/"
themeName="@thepolicylab-projectportals/gatsby-theme-project-portal"

testDir=$(mktemp -d || die "Failed to create new temporary directory.")
echo "new temporary directory: $testDir"

publishTheme "$themeName"

# Add files we need to ensure the installer looks in the right place for the package
cp ./packages/gatsby-theme-project-portal/{.npmrc,.yarnrc.yml} "$testDir"

# Add minimal files for setting up the Gatsby site
echo "module.exports = { plugins: [\`@thepolicylab-projectportals/gatsby-theme-project-portal\`] }" > "$testDir/gatsby-config.js"
mkdir -p "$testDir/src/pages" || die "Failed to add src/pages directory"
cp "$templateDir/src/pages/index.js" "$testDir/src/pages/." || die "Failed to add homepage"

cd "$testDir" || die "changing to testDir $testDir failed."
yarn init -y || die "Failed to init new site"
yarn add react react-dom gatsby "$themeName" || die "Failed to add dependencies"
yarn install || die "Failed to install dependencies"
yarn run gatsby build || die "Failed to build site"
yarn run gatsby serve
