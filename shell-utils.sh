#!/usr/bin/env zsh

die() {
  local message="$*"
  >&2 echo "${message}"
  exit 1
}

publishTheme() {
  # Publish the theme found in the workspace named as the first command line option

  themeName="$1"

  # Update both the theme version number as well as any dependent workspaces
  yarn workspace "$themeName" version patch || die "If this fails, install 'yarn plugin import version' and rerun."

  # Publish the theme
  yarn workspace "$themeName" npm publish || die "If this fails, install 'yarn workspace $themeName npm login --publish' and rerun."
}
