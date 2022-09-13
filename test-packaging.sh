#!/usr/bin/env zsh

# Load some utilities
source "./shell-utils.sh"

# Specify the template site
package-and-install () {
  # Specify the templateDir (must be a gatsby site)
  templateDir="packages/example/"

  # Specify the theme name (must be a workspace)
  themeName="@thepolicylab-projectportals/gatsby-theme-project-portal"

  # Specify where the pack file is stored
  artifactDir="$(pwd)/artifacts"

  # Specify how the package will be created
  # Options are
  # pack – create and install a new pack-file,
  # newest - use the newest released version
  # publish – create and install a new release
  method="pack"

  while getopts t:n:a:m: flag
  do
      case "${flag}" in
          t) templateDir=${OPTARG};;
          n) themeName=${OPTARG};;
          a) artifactDir=${OPTARG};;
          m) method=${OPTARG};;
          *) die "flag ${flag} not recognized"
      esac
  done

  # Create an empty directory testDir where we can test the installation
  testDir=$(mktemp -d || die "Failed to create new temporary directory.")
  echo "new temporary directory: $testDir"

  # Sync content from the template site to the testDir
  rsync -av --progress "$templateDir/." "$testDir" --exclude node_modules --exclude .cache --exclude public

  # Add files we need to ensure the installer looks in the right place for the package
  cp ./packages/gatsby-theme-project-portal/{.npmrc,.yarnrc.yml} "$testDir"

  case "${method}" in
    pack) {
      # Get the path where the pack-file will be created
      packPath="$artifactDir/theme-$(date '+%s')-$(git rev-parse --short HEAD).tgz"

      # Create the pack file itself
      yarn workspace "$themeName" pack --out "$packPath" || die "couldn't create pack-file directory"

      # Add the tarball as one of the dependencies
      (
        cd "$testDir" || die "changing to testDir $testDir failed."
        yarn add $packPath || die "failed to install dependency $packPath."
      )
    };;
    newest) {
      pass # this doesn't do anything special – we just install as usual
    };;
    publish) {
      # Publish the theme as a new version which will automatically be installed
      yarn workspace "$themeName" version patch || die "If this fails, install 'yarn plugin import version' and rerun."

      # Publish the theme
      yarn workspace "$themeName" npm publish || die "If this fails, install 'yarn workspace $themeName npm login --publish' and rerun."

      # Then we need to update the $testDir with the new version number
      rsync -av --progress "$templateDir/package.json" "$testDir/package.json"
    };;

  esac
  (
    # Navigate to the test directory
    cd $testDir || die "couldn't cd to testDir '$testDir'"

    echo "installing in $(pwd)"

    # Install the rest of the dependencies
    yarn install || die "failed to install all dependencies"

    # Build and serve the site
    yarn build
    yarn serve
  )

  # Report the results
  echo "built site in $testDir"

}



