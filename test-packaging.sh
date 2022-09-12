#!/usr/bin/env zsh

die() {
  local message="$*"
  >&2 echo "${message}"
  exit 1
}

testDir=$(mktemp -d)
siteDir="packages/example/"

# Add the basic site content
rsync -av --progress "$siteDir/." "$testDir" --exclude node_modules --exclude .cache --exclude public

# Add files we need to ensure the installer looks in the right place for the package
cp ./packages/gatsby-theme-minimal/{.npmrc,.yarnrc.yml} "$testDir"

(
  cd "$testDir" || die "changing to testDir $testDir failed. Exiting."
  yarn install
  yarn build
)
