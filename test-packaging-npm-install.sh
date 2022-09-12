#!/usr/bin/env zsh

source "./shell-utils.sh"

siteDir="packages/example/"
themeName="@thepolicylab-projectportals/gatsby-theme-project-portal"

testDir=$(mktemp -d || die "Failed to create new temporary directory.")
echo "new temporary directory: $testDir"

export siteDir
export themeName
export testDir

publishTheme "$themeName"

# Add files we need to ensure the installer looks in the right place for the package
cp ./packages/gatsby-theme-project-portal/{.npmrc,.yarnrc.yml} "$testDir"

# Add minimal files for setting up the Gatsby site
cp "./packages/defaults/gatsby-config.js" "$testDir"
mkdir -p "$testDir/src/pages" || die "Failed to add src/pages directory"
cp "./packages/example/src/pages/index.js" "$testDir/src/pages/." || die "Failed to add homepage"

cd "$testDir" || die "changing to testDir $testDir failed."
npm init -y || die "Failed to init new site"
npm install react react-dom gatsby "$themeName" || die "Failed to add dependencies"
gatsby build || die "Failed to build site"
gatsby serve
