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
    A tag to be used on the GitHub package. Used if "-m publish" or "-m latest" is selected.Default: "latest"

  -t templateDir
    A template directory to duplicate for the Gatsby site. If unset, an empty site is created.

  -s
    Serve the site once it has been built.

  -h
    Show this help message and exit

EXAMPLES

  Create an empty site using the current local version (minimum example):
    % package-and-install -m pack

  Create a new duplicate of the "defaults" site:
    % package-and-install -t "packages/defaults/"

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

  while getopts sht:n:a:m:p: flag
  do
      case "${flag}" in
          t) {
            templateDir=${OPTARG}
            initMethod="template"
            };;
          n) themeName=${OPTARG};;
          a) artifactDir=${OPTARG};;
          m) packageMethod=${OPTARG};;
          s) serve=1;;
          p) publishTag=${OPTARG};;
          h) echo "$USAGE" | more; return 1;;

          *) echo "flag ${flag} not recognized" ; return 1
      esac
  done

  echo "Running package-and-install with ${templateDir} ${themeName} ${artifactDir} ${packageMethod} ${initMethod} ${serve}"

  # Spawn a new subshell to carry out the rest of the commands.
  # This way, if anything "dies", it only kills the subshell, and not the whole shell session.
  (
    case "${packageMethod}" in
      pack) {
        # Get the path where the pack-file will be created
        mkdir -p "$artifactDir"
        packPath="$artifactDir/theme-$(date '+%s')-$(git rev-parse --short HEAD).tgz"
        export packPath

        # Create the pack file itself
        yarn workspace "$themeName" pack --out "$packPath" || die "couldn't create pack-file directory"
      };;
      newest) {
        # this doesn't do anything special – we just install as usual
        echo "installing from remote"
      };;
      publish) {
        # Publish the theme as a new version which will automatically be installed
         yarn workspace "$themeName" version patch || die "If this fails, install 'yarn plugin import version' and rerun."

        # Publish the theme
        yarn workspace "$themeName" npm publish --tag "$publishTag" || die "If this fails, install 'yarn workspace $themeName npm login --publish' and rerun."
      };;

    esac

    # Create an empty directory testDir where we can test the installation
    testDir=$(mktemp -d || die "Failed to create new temporary directory.")
    echo "new temporary directory: $testDir"

    # Add files we need to ensure the installer looks in the right place for the package
    cp ./packages/gatsby-theme-project-portal/{.npmrc,.yarnrc.yml} "$testDir" || die "couldn't copy rc-files"

    case "${initMethod}" in
      empty) {
        (
          cd "$testDir" || die "Failed to cd to testDir '$testDir'"
          yarn init -y || die "Failed to init new site"
          case "${packageMethod}" in
            pack) yarn add "$packPath" react react-dom gatsby || die "failed to install dependencies including $packPath.";;
            *) yarn add react react-dom gatsby "$themeName@$publishTag" || die "Failed to add dependencies";;
          esac
          echo "module.exports = { plugins: [\`@thepolicylab-projectportals/gatsby-theme-project-portal\`] }" > "$testDir/gatsby-config.js"
        )
      };;
      template) {
        # Sync content from the template site to the testDir
        rsync -av --progress "$templateDir/." "$testDir" --exclude node_modules --exclude .cache --exclude public
        ( cd "$testDir" || die "Failed to cd to testDir '$testDir'"
          case "${packageMethod}" in
            pack) {
            echo $(which yarn); yarn add "$packPath" || die "failed to add dependency $packPath."
            };;
            *) yarn add "$themeName@$publishTag" || die "failed to specify theme version $themeName@$publishTag" ;;
          esac
        )
      };;
    esac


    # Navigate to the test directory
    (
      cd $testDir || die "couldn't cd to testDir '$testDir'"

      # Install the rest of the dependencies
      yarn install || die "failed to install all dependencies"

      # Build the site
      yarn gatsby build || die "failed to build site"

      echo ""
      echo "Site built successfully. To serve run:"
      echo "(cd $testDir && yarn gatsby serve)"

      # Serve the site
      if [[ ${serve} -eq 1 ]]
      then
        yarn gatsby serve
      fi
    )
  )
}

# Define some standard test sets
run-all-local-packaging-tests () {
  (
    package-and-install -m pack || die "packaging failed: package-and-install -m pack"
    package-and-install -m pack -t packages/defaults/ || die "packaging failed: package-and-install -m pack -t packages/defaults/"
    package-and-install -m pack -t packages/example/  || die "packaging failed: package-and-install -m pack -t packages/example/"
  )
}

run-all-publish-packaging-tests () {
  (
    package-and-install -m publish -p testPackage -t packages/example/  || die "packaging failed: package-and-install -m publish -p testPackage -t packages/example/"
    package-and-install -m newest -p testPackage  || die "packaging failed: package-and-install -m newest -p testPackage"
    package-and-install -m newest -p testPackage -t packages/defaults/  || die "packaging failed: package-and-install -m newest -p testPackage -t packages/defaults/"
    package-and-install -m newest -p testPackage -t packages/example/  || die "packaging failed: package-and-install -m newest -p testPackage -t packages/example/"
  )
}
