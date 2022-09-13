#!/usr/bin/env zsh

# Load some utilities
die() {
  local message="$*"
  >&2 echo "${message}"
  return 1
}

# Specify the template site
package-and-install () {
  # Specify how the package will be created
  # Options are
  # pack (default) – create and install a new pack-file,
  # newest – use the newest released version
  # publish – create and install a new release
  packageMethod="pack"

  # Specify how the site will be created
  # Options are
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

  # Specify if we serve the site at the end. Default: no.
  serve=0

  while getopts st:n:a:m: flag
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
          *) echo "flag ${flag} not recognized" ; return 1
      esac
  done

  echo "Running package-and-install with ${templateDir} ${themeName} ${artifactDir} ${packageMethod} ${initMethod} ${serve}"

  case "${packageMethod}" in
    pack) {
      # Get the path where the pack-file will be created
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
      yarn workspace "$themeName" npm publish || die "If this fails, install 'yarn workspace $themeName npm login --publish' and rerun."
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
        cd $testDir || die "Failed to cd to testDir '$testDir'"
        yarn init -y || die "Failed to init new site"
        case "${packageMethod}" in
          pack) yarn add "$packPath" react react-dom gatsby || die "failed to install dependencies including $packPath.";;
          *) yarn add react react-dom gatsby "$themeName" || die "Failed to add dependencies";
        esac
        echo "module.exports = { plugins: [\`@thepolicylab-projectportals/gatsby-theme-project-portal\`] }" > "$testDir/gatsby-config.js"
      )
    };;
    template) {
      # Sync content from the template site to the testDir
      rsync -av --progress "$templateDir/." "$testDir" --exclude node_modules --exclude .cache --exclude public
    };;
  esac


  # Navigate to the test directory
  (
    cd $testDir || die "couldn't cd to testDir '$testDir'"

    # Install the rest of the dependencies
    yarn install || die "failed to install all dependencies"

    # Build the site
    yarn gatsby build || die "failed to build site"

    # Serve the site
    if [[ ${serve} -eq 1 ]]
    then
      yarn gatsby serve
    fi
  )
  echo ""
  echo "Site built successfully. To serve run"
  echo "(cd $testDir && yarn gatsby serve)"
}

alias test-pack-empty="package-and-install -m pack"
alias test-pack-template-defaults="package-and-install -m pack -t packages/defaults/"
alias test-pack-template-example="package-and-install -m pack -t packages/example/"
alias test-newest-empty="package-and-install -m newest"
alias test-newest-template-defaults="package-and-install -m newest -t packages/defaults/"
alias test-newest-template-example="package-and-install -m newest -t packages/example/"
alias test-publish-template-example="package-and-install -m publish -t packages/example/"

run-all-packaging-tests () {
  test-pack-empty  || die "packaging failed: 'test-pack-empty'"
  test-pack-template-defaults  || die "packaging failed: 'test-pack-template-defaults'"
  test-pack-template-example  || die "packaging failed: 'test-pack-template-example'"
  test-publish-template-example  || die "packaging failed: 'test-publish-template-example'"
  test-newest-empty  || die "packaging failed: 'test-newest-empty'"
  test-newest-template-defaults  || die "packaging failed: 'test-newest-template-defaults'"
  test-newest-template-example  || die "packaging failed: 'test-newest-template-example'"
}
