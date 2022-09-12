#!/usr/bin/env zsh

die() {
  local message="$*"
  >&2 echo "${message}"
  exit 1
}

artifactDir="$(pwd)/artifacts"
testDir=$(mktemp -d)
siteDir="packages/example/"
themeName="@hollandjg/gatsby-theme-minimal"
packPath="$artifactDir/theme-$(git rev-parse --short HEAD)-$(date '+%s').tgz"

yarn workspace "$themeName" pack --out "$packPath"

# Add the basic site content
rsync -av --progress "$siteDir/." "$testDir" --exclude node_modules --exclude .cache --exclude public

# Add files we need to ensure the installer looks in the right place for the package
cp ./packages/gatsby-theme-minimal/{.npmrc,.yarnrc.yml} "$testDir"

(
  cd "$testDir" || die "changing to testDir $testDir failed."
  yarn add $packPath || die "failed to install dependency $packPath."
  yarn install || die "failed to install all dependencies"
  yarn build
)
