#!/usr/bin/env zsh

# Load some utilities
die() {
  local message="$*"
  >&2 echo "${message}"
  exit 1
}

read -r -d '' USAGE << EOM
NAME
  package-and-install – package a gatsby theme and build a new site using the package

SYNOPSIS
  package-and-install [-t templateDir] [-r registryPackage1,2,...] [-w workspacePackage1,2,...] \
    [-a artifactDir] [-i {yarn,npm}] [-h]

DESCRIPTION
  The package-and-install tool:
  0) initializes a Gatsby site from empty or based on a template,
  1) creates new packages based on a Gatsby theme and plugins in the current workspace,
  2) adds them as a dependency to a Gatsby site,
  3) builds the site.

  The options are as follows:

  -t templateDir
    A template directory to duplicate for the Gatsby site. If unset, an empty site is created.

  -r registryPackages
      The names of packages to install from the registry, separated by commas.
      They should be identical to the "name" parameter in the plugins' package.json files,
      plus optionally a version number.
      If unset, no additional packages are added from the registry.

      Examples:
        -r "gatsby,react,react-dom"
        -r "gatsby@^4.24.0,react@16.13.0,react-dom@16.13.0"
        -r "gatsby@^4.24.0,react@16.13.0,react-dom@16.13.0,@thepolicylab-projectportals/gatsby-theme-project-portal,@thepolicylab-projectportals/project-portal-content-netlify"

  -w workspacePackages
    The names of packages to create and install from workspaces, separated by commas.
    They should be identical to the "name" parameter in the plugins' package.json files.
    If unset, no additional packages are added from the workspaces.
    Examples:
      -w "@thepolicylab-projectportals/gatsby-theme-project-portal,@thepolicylab-projectportals/project-portal-content-netlify"
      -w "@thepolicylab-projectportals/project-portal-content-airtable"
      -w ""

  -a artifactDir
    The location where the packed theme is stored.
    Default: ./artifacts

  -i {yarn,npm}
    The package manager to use for the installation in the target directory.
    Default: yarn

  -h
    Show this help message and exit

EXAMPLES

  Create an empty site using the current local version (minimum example):
    % package-and-install -r react@^16.14.0,react-dom@^16.14.0,gatsby@^4.24.0 -w @thepolicylab-projectportals/gatsby-theme-project-portal -g @thepolicylab-projectportals/gatsby-theme-project-portal

  Create a new duplicate of the "defaults" site:
    % package-and-install -t "packages/defaults/" -w @thepolicylab-projectportals/gatsby-theme-project-portal

  Create a new duplicate of the "defaults" site, using npm to install the node_modules:
    % package-and-install -i npm -t "packages/defaults/" -w @thepolicylab-projectportals/gatsby-theme-project-portal

  Create a new duplicate of the "example" site:
    % package-and-install -t "packages/example/" -w @thepolicylab-projectportals/gatsby-theme-project-portal

  Create a new duplicate of the "example-content" site:
    % package-and-install -t "packages/example-content/" -w @thepolicylab-projectportals/gatsby-theme-project-portal,@thepolicylab-projectportals/project-portal-content-netlify

EOM

# Specify the template site
package-and-install () {

  # Specify any packages we need to install from registries
  registryPackages=""

  # Specify any packages we need to install from workspaces
  workspacePackages=""

  # Specify any packages we need to include in gatsby config
  gatsbyConfigPackages=""

  # Specify the templateDir (must be a gatsby site)
  # Examples:
  # packages/example/
  # packages/defaults/
  templateDir=""

  # Specify how the site will be created. This is implicitly set if a template is defined.
  # empty (default) – create an empty site and add the minimum code using the package manager
  # template – create a site based on an existing directory
  initMethod="empty"

  # Specify where the pack file is stored
  artifactDir="$(pwd)/artifacts"

  # Specify which package manager to use
  packageManager="yarn"

  while getopts t:r:w:g:a:i:h flag
  do
      case "${flag}" in
          t) {
            templateDir=${OPTARG}
            initMethod="template"
            };;
          r) registryPackages=${OPTARG};;
          w) workspacePackages=${OPTARG};;
          g) gatsbyConfigPackages=${OPTARG};;
          a) artifactDir=${OPTARG};;
          i) packageManager=${OPTARG};;
          h) echo "$USAGE" | more; return 1;;

          *) echo "flag ${flag} not recognized" ; return 1
      esac
  done

  echo "Running package-and-install with: "
  echo "init method ... template directory: ${initMethod} ... '${templateDir}'"
  echo "registryPackages: ${registryPackages}"
  echo "workspacePackages: ${workspacePackages}"
  echo "gatsbyConfigPackages: ${gatsbyConfigPackages}"
  echo "artifactDir: ${artifactDir}"

  # Create an empty directory testDir where we can test the installation
  testDir=$(mktemp -d || die "Failed to create new temporary directory.")
  echo "new temporary directory: $testDir"

  # Add files we need to ensure the installer looks in the right place for the package
  cp .npmrc "$testDir" || die "couldn't copy rc-file"

  # Create the empty or template Gatsby site
  case "${initMethod}" in
    empty) {
      (
        cd "$testDir" || die "Failed to cd to testDir '$testDir'"
        ${packageManager} init -y || die "Failed to init new site"

        # Add anything we need to Gatsby Config
        plugins=""
        gatsbyConfigPackagesArray=(${(s/,/)gatsbyConfigPackages})
        for gatsbyConfigPackage in "${gatsbyConfigPackagesArray[@]}"
        do
          plugins="${plugins} \`${gatsbyConfigPackage}\`,"
        done
        echo "module.exports = { plugins: [${plugins}] }" > "gatsby-config.js"
      )
    };;
    template) {
      # Sync content from the template site to the testDir
      rsync -av --progress "$templateDir/." "$testDir" --exclude node_modules --exclude .cache --exclude public
    };;
  esac

  # Define a variable to hold all of the packages we need to install
  declare -a packageManagerAddList

  # List any packages we need from the registries
  registryPackagesArray=(${(s/,/)registryPackages})
  echo "registry packages"
  for registryPackage in "${registryPackagesArray[@]}"
  do
    echo "including ${registryPackage}"
    packageManagerAddList+=($registryPackage)
  done

  # List any packages we need from the workspaces
  workspacePackagesArray=(${(s/,/)workspacePackages})
  for workspacePackage in "${workspacePackagesArray[@]}"
  do
    echo "packaging ${workspacePackage}"

    packagePrefix=$(basename "$workspacePackage")
    packPath="$artifactDir/$packagePrefix-$(date '+%s')-$(git rev-parse --short HEAD)-$(base64 < "/dev/urandom" | tr -dc '0-9a-zA-Z' | head -c3 ).tgz"

    mkdir -p "$artifactDir"
    yarn workspace "$workspacePackage" pack --filename "$packPath"

    echo "including $packPath"
    case "${packageManager}" in
      yarn) {
        packageManagerAddList+=("file:${packPath}")
      } ;;
      npm) {
        packageManagerAddList+=($packPath)
      } ;;
      *) die "package manager ${packageManager} unknown, can't add.";;
    esac
  done

  # Add everything we need in one go
  (
    if [ ${#packageManagerAddList[@]} -eq 0 ]; then
      echo "no packages to add."
    else
      echo "installing all of " "${packageManagerAddList[@]}"
      cd "$testDir" || die "Failed to cd to testDir '$testDir'"
      echo cd "$testDir"
      ${packageManager} add "${packageManagerAddList[@]}" || die "Failed to add dependencies'"
    fi
  )

  (
    # Navigate to the test directory
    cd "$testDir" || die "couldn't cd to testDir '$testDir'"

    # Show the current version of the package.json
    cat package.json

    case "${packageManager}" in
      yarn) {
        # Install the rest of the dependencies
        yarn install || die "failed to install all dependencies"

        # Build the site
        yarn gatsby build || die "failed to build site"
      } ;;
      npm) {
        # Install the rest of the dependencies
        npm install || die "failed to install all dependencies"

        # Build the site
        npm run env -- gatsby build || die "failed to build site"
      } ;;
      *) die "package manager ${packageManager} unknown, can't install & build.";;
    esac

    # Serve the site
    case "${packageManager}" in
      yarn) {
        echo "Site built successfully. To serve run:"
        echo "(cd $testDir && yarn gatsby serve)"
      };;
      npm) {
        echo "Site built successfully. To serve run:"
        echo "(cd $testDir && npm run env -- gatsby serve)"
      };;
      *) die "package manager ${packageManager} unknown, can't serve.";;
    esac
  )
}
