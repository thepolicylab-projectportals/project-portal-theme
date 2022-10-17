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
  package-and-install [-m {pack,newest,publish}] [-a artifactDir] [-t templateDir] [-s] [-n themeName] [-p publishTag] [-h]

DESCRIPTION
  The package-and-install tool:
  1) creates a new package based on a gatsby theme in the current workspace,
  2) adds it as a dependency to a Gatsby site,
  3) builds the site,
  4) (optionally) serves the site on the localhost.

  The options are as follows:

  -n themeName
    The theme name. It should be identical to the "name" parameter in the theme's package.json file.
    Examples:
      -n "@thepolicylab-projectportals/gatsby-theme-project-portal"

  -m {pack,newest,publish}
    Packaging method:
      - pack (default) – create and install a new pack-file,
      - newest – use the newest released version
      - publish – create and install a new release

  -a artifactDir
    The location where the packed theme is stored. Default: ./artifacts

  -p publishTag
    A tag to be used on the GitHub package. Used if "-m publish" or "-m latest" is selected. Default: "latest"

  -t templateDir
    A template directory to duplicate for the Gatsby site. If unset, an empty site is created.

  -i {yarn,npm}
    The package manager to use for the installation in the target directory. Default: yarn

  -s
    Serve the site once it has been built.

  -h
    Show this help message and exit

EXAMPLES

  Create an empty site using the current local version (minimum example):
    % package-and-install -m pack

  Create a new duplicate of the "defaults" site:
    % package-and-install -t "packages/defaults/"

  Create a new duplicate of the "defaults" site, using npm to install the node_modules:
      % package-and-install -t "packages/defaults/" -i npm

  Create a new duplicate of the "example" site:
    % package-and-install -t "packages/example/"

  Install the newest productive version on the GitHub registry:
    % package-and-install -m "newest"

  Create and install a new test version of the theme,
    but mark it as a test version rather than for productive use:
    % package-and-install -m "publish" -p "packageTest"

  Install the newest test version from the GitHub registry to a minimum site:
    (usually after running "package-and-install -m publish -p packageTest"):
    % package-and-install -m "newest" -p "packageTest"

  Install the newest test version from the GitHub registry to the example site:
    (usually after running "package-and-install -m publish -p packageTest"):
    % package-and-install -m "newest" -p "packageTest" -t "packages/example/"


EOM

# Specify the template site
package-and-install () {

  # Specify how the package will be created
  packageMethod="pack"

  # Specify how the site will be created. This is implicitly set if a template is defined.
  # empty (default) – create an empty site and add the minimum code using the package manager
  # template – create a site based on an existing directory
  initMethod="empty"

  # Specify any packages we need to install from registries
  registryPackages="react@^16.14.0,react-dom@^16.14.0,gatsby@^4.24.0"

  # Specify any packages we need to install from workspaces
  workspacePackages="@thepolicylab-projectportals/gatsby-theme-project-portal,@thepolicylab-projectportals/project-portal-content-netlify"

  # Specify any packages we need to include in gatsby config
  gatsbyConfigPackages="@thepolicylab-projectportals/gatsby-theme-project-portal,@thepolicylab-projectportals/project-portal-content-netlify"

  # Specify the templateDir (must be a gatsby site)
  # Examples:
  # packages/example/
  # packages/defaults/
  templateDir=""

  # Specify the theme name (must be a workspace)
  themeName="@thepolicylab-projectportals/gatsby-theme-project-portal"

  # Specify where the pack file is stored
  artifactDir="$(pwd)/artifacts"

  publishTag="latest"

  # Specify if we serve the site at the end. Default: no.
  serve=0

  # Specify which package manager to use
  packageManager="yarn"

  while getopts sht:n:a:m:p:i:r flag
  do
      case "${flag}" in
          t) {
            templateDir=${OPTARG}
            initMethod="template"
            };;
          n) themeName=${OPTARG};;
          a) artifactDir=${OPTARG};;
          m) packageMethod=${OPTARG};;
          i) packageManager=${OPTARG};;
          s) serve=1;;
          p) publishTag=${OPTARG};;
          r) registryPackages=${OPTARG};;
          w) workspacePackage=${OPTARG};;
          h) echo "$USAGE" | more; return 1;;

          *) echo "flag ${flag} not recognized" ; return 1
      esac
  done

  echo "Running package-and-install with ${templateDir} ${themeName} ${artifactDir} ${packageMethod} ${initMethod} ${serve}"

  # Spawn a new subshell to carry out the rest of the commands.
  # This way, if anything "dies", it only kills the subshell, and not the whole shell session.
  (
    # Create an empty directory testDir where we can test the installation
    testDir=$(mktemp -d || die "Failed to create new temporary directory.")
    echo "new temporary directory: $testDir"

    # Add files we need to ensure the installer looks in the right place for the package
    cp ./packages/gatsby-theme-project-portal/.npmrc "$testDir" || die "couldn't copy rc-files"

    # Create the empty or template Gatsby site
    case "${initMethod}" in
      empty) {
        (
          cd "$testDir" || die "Failed to cd to testDir '$testDir'"
          ${packageManager} init -y || die "Failed to init new site"

          # Add anything we need to Gatsby Config
          plugins=""
          gatsbyConfigPackagesArray=(${(s/,/)gatsbyConfigPackages})
          for gatsbyConfigPackage in ${gatsbyConfigPackagesArray}
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

    declare -a packageManagerAddList

    # List any packages we need from the registries
    registryPackagesArray=(${(s/,/)registryPackages})
    echo "registry packages"
    for registryPackage in ${registryPackagesArray}
    do
      echo "including ${registryPackage}"
      packageManagerAddList+=($registryPackage)
    done

    # List any packages we need from the workspaces
    workspacePackagesArray=(${(s/,/)workspacePackages})
    for workspacePackage in ${workspacePackagesArray}
    do
      echo "packaging ${workspacePackage}"

      packagePrefix=$(basename "$workspacePackage")
      packPath="$artifactDir/$packagePrefix-$(date '+%s')-$(git rev-parse --short HEAD)-$(base64 < "/dev/urandom" | tr -dc '0-9a-zA-Z' | head -c3 ).tgz"

      mkdir -p "$artifactDir"
      yarn workspace "$workspacePackage" pack --filename "$packPath"

      echo "including $packPath"
      packageManagerAddList+=($packPath)
    done

    # Add everything we need in one go
    (
    echo "installing all of ${packageManagerAddList}"
      cd "$testDir" || die "Failed to cd to testDir '$testDir'"
      ${packageManager} add "${packageManagerAddList[@]}"
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
  )
}
