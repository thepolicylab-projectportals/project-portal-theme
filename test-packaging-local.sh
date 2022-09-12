#!/usr/bin/env zsh

# Load some utilities
source "./shell-utils.sh"

# Specify the template site
templateDir="packages/example/"
export templateDir

# Specify the theme name (must be a workspace)
themeName="@thepolicylab-projectportals/gatsby-theme-project-portal"
export themeName

# Specify where the pack file is stored
artifactDir="$(pwd)/artifacts"
packPath="$artifactDir/theme-$(date '+%s')-$(git rev-parse --short HEAD).tgz"
export packPath

# Ensure the directory for the pack file exists
mkdir -p "$artifactDir" || die "couldn't create artifacts directory"

# Create the pack file itself
yarn workspace "$themeName" pack --out "$packPath"

# Create an empty directory testDir where we can test the installation
testDir=$(mktemp -d || die "Failed to create new temporary directory.")
echo "new temporary directory: $testDir"
export testDir

# Sync content from the template site to the testDir
rsync -av --progress "$templateDir/." "$testDir" --exclude node_modules --exclude .cache --exclude public

# Add files we need to ensure the installer looks in the right place for the package
cp ./packages/gatsby-theme-project-portal/{.npmrc,.yarnrc.yml} "$testDir"

# Add the tarball as one of the dependencies
cd "$testDir" || die "changing to testDir $testDir failed."
yarn add $packPath || die "failed to install dependency $packPath."

# Install the rest of the dependencies
yarn install || die "failed to install all dependencies"

# Build and serve the site
yarn build
yarn serve

